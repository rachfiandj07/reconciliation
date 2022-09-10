import * as fs from 'fs';
import * as path from 'path';
import {
  FilenamePayload,
  GenerateFilePayload,
  TextSummaryPayload,
} from '../dto/file';

export const ReadFile = async (file: FilenamePayload): Promise<String> => {
  // const finishedCsvData: Array<Record<string, string>> = [];
  const data: String = await fs.readFileSync(
    path.join(__dirname, `../../files/${file.name}.csv`),
    'utf8'
  );
  return data;
};

export const GenerateFile = async (
  generateFilePayload: GenerateFilePayload
): Promise<any> => {
  try {
    await fs.promises.writeFile(
      path.join(
        __dirname,
        `../../reports/report.${generateFilePayload.file_type}`
      ),
      generateFilePayload.summary_report,
      'utf-8'
    );
  } catch (error) {
    return error;
  }
};

export const WriteFilesSummary = async (
  writeFilePayload: TextSummaryPayload
): Promise<any> => {
  const textSummary: string =
    'Difference In Days : ' +
    writeFilePayload.difference_in_days +
    '\r\n' +
    'Max Date : ' +
    writeFilePayload.max_date +
    '\r\n' +
    'Min Date : ' +
    writeFilePayload.min_date +
    '\r\n' +
    'Number Type of Discrepencies : ' +
    writeFilePayload.number_type_discrepencies +
    '\r\n' +
    'Source Recorded : ' +
    writeFilePayload.source_recorded +
    '\r\n' +
    'Types of Discrepencies : ' +
    writeFilePayload.types_discrepancies;
  try {
    await fs.promises.writeFile(
      path.join(__dirname, '../../reports/summary.txt'),
      textSummary,
      'utf-8'
    );
  } catch (error) {
    return error;
  }
};
