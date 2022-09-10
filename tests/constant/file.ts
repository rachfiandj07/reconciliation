import {
  CompareFilePayload,
  FilenamePayload,
  GenerateFilePayload,
  TextSummaryPayload,
} from '../../src/dto/file';

export const FILE_SUMMARY: TextSummaryPayload = {
  difference_in_days: 32,
  max_date: new Date(
    'Sun Aug 01 2021 07:00:00 GMT+0700 (Western Indonesia Time)'
  ),
  min_date: new Date(
    'Wed Jun 30 2021 07:00:00 GMT+0700 (Western Indonesia Time)'
  ),
  number_type_discrepencies: 6,
  source_recorded: 9,
  types_discrepancies: 'Amt, Descr, Date, ID',
};

export const FILE_REPORT: GenerateFilePayload = {
  file_type: 'csv',
  summary_report: 'This is a report',
};

export const FILE_NAME: FilenamePayload = {
  name: 'proxy',
};

export const FILE_TO_COMPARE: CompareFilePayload = {
  proxy_filename: 'proxy',
  source_filename: 'source',
};
