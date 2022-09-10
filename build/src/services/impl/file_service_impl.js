"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileServiceImpl = void 0;
const common_1 = require("../../constant/common");
const file_mapper_1 = require("../../mapper/file_mapper");
class FileServiceImpl {
    processFile(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            const filenamePayload = {
                name: filename,
            };
            const file = yield file_mapper_1.ReadFile(filenamePayload);
            const finishedCsvData = [];
            const processedCsvData = file.split('\n');
            const columnHeader = processedCsvData[0].split(',');
            for (let index = 1; index < processedCsvData.length - 1; index++) {
                const object = {};
                const currentLines = processedCsvData[index].split(',');
                for (let nextIndex = 0; nextIndex < columnHeader.length; nextIndex++) {
                    object[columnHeader[nextIndex]] = currentLines[nextIndex];
                }
                finishedCsvData.push(object);
            }
            return finishedCsvData;
        });
    }
    writeFilesSummary(summaryPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            const textSummary = {
                difference_in_days: summaryPayload.difference_in_days,
                max_date: summaryPayload.max_date,
                min_date: summaryPayload.min_date,
                number_type_discrepencies: summaryPayload.number_type_discrepencies,
                source_recorded: summaryPayload.source_recorded,
                types_discrepancies: summaryPayload.types_discrepancies.join(', '),
            };
            yield file_mapper_1.WriteFilesSummary(textSummary);
        });
    }
    writeFiles(writeFilePayload) {
        return __awaiter(this, void 0, void 0, function* () {
            const crackRowHeader = [
                Object.keys(writeFilePayload.file_to_processed[0]),
            ];
            const rowHeader = crackRowHeader[0].join(',');
            let columnData = '';
            for (let index = 0; index < writeFilePayload.file_to_processed.length; index++) {
                columnData +=
                    Object.values(writeFilePayload.file_to_processed[index]).join(',') +
                        '\r\n';
            }
            const processedCsvData = rowHeader + '\r\n' + columnData;
            const filePayload = {
                file_type: writeFilePayload.file_type,
                summary_report: processedCsvData,
            };
            yield file_mapper_1.GenerateFile(filePayload);
        });
    }
    compareFiles(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            const internalFiles = yield this.processFile(filename.proxy_filename);
            const externalFiles = yield this.processFile(filename.source_filename);
            let sourceRecorded = 0;
            let typesNumberDiscrepancies = 0;
            let typesArrayDiscrepancies = [];
            const collectionOfDates = [];
            for (let index = 0; index < externalFiles.length; index++) {
                collectionOfDates.push(new Date(internalFiles[index].Date));
                collectionOfDates.push(new Date(externalFiles[index].Date));
                if (internalFiles[index] !== undefined &&
                    externalFiles[index] !== undefined) {
                    internalFiles[index][common_1.CSV_REPORT_COLUMN_TEMPLATE.REMARKS] = '';
                    if (internalFiles[index].Amt !== externalFiles[index].Amount) {
                        internalFiles[index][common_1.CSV_REPORT_COLUMN_TEMPLATE.REMARKS] +=
                            common_1.REASON.MISSMATCHED_AMOUNT + ' ' + 'also' + ' ';
                        typesArrayDiscrepancies.push(common_1.CSV_REPORT_COLUMN_TEMPLATE.AMOUNT);
                    }
                    if (internalFiles[index].Descr !== externalFiles[index].Description) {
                        internalFiles[index][common_1.CSV_REPORT_COLUMN_TEMPLATE.REMARKS] +=
                            common_1.REASON.MISSMATCHED_DESCRIPTION + ' ' + 'also' + ' ';
                        typesArrayDiscrepancies.push(common_1.CSV_REPORT_COLUMN_TEMPLATE.DESCR);
                    }
                    if (internalFiles[index].Date !== externalFiles[index].Date) {
                        internalFiles[index][common_1.CSV_REPORT_COLUMN_TEMPLATE.REMARKS] +=
                            common_1.REASON.MISSMATCHED_DATE + ' ' + 'also' + ' ';
                        typesArrayDiscrepancies.push(common_1.CSV_REPORT_COLUMN_TEMPLATE.DATE);
                    }
                    if (internalFiles[index].ID !== externalFiles[index].ID) {
                        internalFiles[index][common_1.CSV_REPORT_COLUMN_TEMPLATE.REMARKS] +=
                            common_1.REASON.MISSMATCHED_ID + ' ' + 'also' + ' ';
                        typesArrayDiscrepancies.push(common_1.CSV_REPORT_COLUMN_TEMPLATE.ID);
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
            const mapDates = collectionOfDates.map(d => d.getTime());
            const maxDate = new Date(Math.max(...mapDates));
            const minDate = new Date(Math.min(...mapDates));
            const differenceInTime = Math.abs(maxDate.getTime() - minDate.getTime());
            const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
            typesArrayDiscrepancies = [...new Set(typesArrayDiscrepancies)];
            const summaryPayload = {
                difference_in_days: differenceInDays,
                max_date: maxDate,
                min_date: minDate,
                number_type_discrepencies: typesNumberDiscrepancies,
                types_discrepancies: typesArrayDiscrepancies,
                source_recorded: sourceRecorded,
            };
            this.writeFilesSummary(summaryPayload);
            const writeFilePayload = {
                file_type: 'csv',
                file_to_processed: internalFiles,
            };
            this.writeFiles(writeFilePayload);
        });
    }
}
exports.FileServiceImpl = FileServiceImpl;
