import {CSV_REPORT_COLUMN_TEMPLATE, REASON} from '../../constant/common';
import {
  CompareFilePayload,
  FilenamePayload,
  GenerateFilePayload,
  TextSummaryPayload,
  WriteFilePayload,
  WriteSummaryPayload,
} from '../../dto/file';
import {
  GenerateFile,
  ReadFile,
  WriteFilesSummary,
} from '../../mapper/file_mapper';
import FileService from '../file_service';

export class FileServiceImpl implements FileService {
  private async processFile(
    filename: String
  ): Promise<Record<string, string>[]> {
    const filenamePayload: FilenamePayload = {
      name: filename,
    };
    const file: String = await ReadFile(filenamePayload);
    const finishedCsvData: Array<Record<string, string>> = [];
    const processedCsvData: Array<String> = file.split('\n');
    const columnHeader: Array<string> = processedCsvData[0].split(',');

    for (let index = 1; index < processedCsvData.length - 1; index++) {
      const object: Record<string, string> = {};

      const currentLines = processedCsvData[index].split(',');

      for (let nextIndex = 0; nextIndex < columnHeader.length; nextIndex++) {
        object[columnHeader[nextIndex]] = currentLines[nextIndex];
      }

      finishedCsvData.push(object);
    }
    return finishedCsvData;
  }

  private async writeFilesSummary(
    summaryPayload: WriteSummaryPayload
  ): Promise<void> {
    const textSummary: TextSummaryPayload = {
      difference_in_days: summaryPayload.difference_in_days,
      max_date: summaryPayload.max_date,
      min_date: summaryPayload.min_date,
      number_type_discrepencies: summaryPayload.number_type_discrepencies,
      source_recorded: summaryPayload.source_recorded,
      types_discrepancies: summaryPayload.types_discrepancies.join(', '),
    };
    await WriteFilesSummary(textSummary);
  }

  private async writeFiles(writeFilePayload: WriteFilePayload): Promise<void> {
    const crackRowHeader: Array<string[]> = [
      Object.keys(writeFilePayload.file_to_processed[0]),
    ];
    const rowHeader: String = crackRowHeader[0].join(',');
    let columnData: String = '';
    for (
      let index = 0;
      index < writeFilePayload.file_to_processed.length;
      index++
    ) {
      columnData +=
        Object.values(writeFilePayload.file_to_processed[index]).join(',') +
        '\r\n';
    }
    const processedCsvData: string = rowHeader + '\r\n' + columnData;
    const filePayload: GenerateFilePayload = {
      file_type: writeFilePayload.file_type,
      summary_report: processedCsvData,
    };
    await GenerateFile(filePayload);
  }

  public async compareFiles(filename: CompareFilePayload): Promise<void> {
    const internalFiles: Record<string, string>[] = await this.processFile(
      filename.proxy_filename
    );
    const externalFiles: Record<string, string>[] = await this.processFile(
      filename.source_filename
    );
    let sourceRecorded = 0;
    let typesNumberDiscrepancies = 0;
    let typesArrayDiscrepancies: Array<String> = [];
    const collectionOfDates: Array<Date> = [];

    for (let index = 0; index < externalFiles.length; index++) {
      collectionOfDates.push(new Date(internalFiles[index].Date));
      collectionOfDates.push(new Date(externalFiles[index].Date));
      if (
        internalFiles[index] !== undefined &&
        externalFiles[index] !== undefined
      ) {
        internalFiles[index][CSV_REPORT_COLUMN_TEMPLATE.REMARKS] = '';
        if (internalFiles[index].Amt !== externalFiles[index].Amount) {
          internalFiles[index][CSV_REPORT_COLUMN_TEMPLATE.REMARKS] +=
            REASON.MISSMATCHED_AMOUNT + ' ' + 'also' + ' ';
          typesArrayDiscrepancies.push(CSV_REPORT_COLUMN_TEMPLATE.AMOUNT);
        }
        if (internalFiles[index].Descr !== externalFiles[index].Description) {
          internalFiles[index][CSV_REPORT_COLUMN_TEMPLATE.REMARKS] +=
            REASON.MISSMATCHED_DESCRIPTION + ' ' + 'also' + ' ';
          typesArrayDiscrepancies.push(CSV_REPORT_COLUMN_TEMPLATE.DESCR);
        }
        if (internalFiles[index].Date !== externalFiles[index].Date) {
          internalFiles[index][CSV_REPORT_COLUMN_TEMPLATE.REMARKS] +=
            REASON.MISSMATCHED_DATE + ' ' + 'also' + ' ';
          typesArrayDiscrepancies.push(CSV_REPORT_COLUMN_TEMPLATE.DATE);
        }
        if (internalFiles[index].ID !== externalFiles[index].ID) {
          internalFiles[index][CSV_REPORT_COLUMN_TEMPLATE.REMARKS] +=
            REASON.MISSMATCHED_ID + ' ' + 'also' + ' ';
          typesArrayDiscrepancies.push(CSV_REPORT_COLUMN_TEMPLATE.ID);
        }
        sourceRecorded += 1;
      }
    }

    // get TypeDiscrepenacies
    for (let index = 0; index < internalFiles.length - 1; index++) {
      if (internalFiles[index].Remarks !== '') {
        typesNumberDiscrepancies += 1;
      }
    }

    // get DateRange
    const mapDates: number[] = collectionOfDates.map(d => d.getTime());
    const maxDate: Date = new Date(Math.max(...mapDates));
    const minDate: Date = new Date(Math.min(...mapDates));
    const differenceInTime: number = Math.abs(
      maxDate.getTime() - minDate.getTime()
    );
    const differenceInDays: Number = Math.ceil(
      differenceInTime / (1000 * 60 * 60 * 24)
    );
    typesArrayDiscrepancies = [...new Set(typesArrayDiscrepancies)];

    const summaryPayload: WriteSummaryPayload = {
      difference_in_days: differenceInDays,
      max_date: maxDate,
      min_date: minDate,
      number_type_discrepencies: typesNumberDiscrepancies,
      types_discrepancies: typesArrayDiscrepancies,
      source_recorded: sourceRecorded,
    };

    this.writeFilesSummary(summaryPayload);

    const writeFilePayload: WriteFilePayload = {
      file_type: 'csv',
      file_to_processed: internalFiles,
    };
    this.writeFiles(writeFilePayload);
  }
}
