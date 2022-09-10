export interface FilenamePayload {
  name: String;
}

export interface CompareFilePayload {
  proxy_filename: String;
  source_filename: String;
}

export interface WriteFilePayload {
  file_type: String;
  file_to_processed: Record<string, string>[];
}

export interface WriteSummaryPayload {
  difference_in_days: Number;
  number_type_discrepencies: Number;
  max_date: Date;
  min_date: Date;
  types_discrepancies: Array<String>;
  source_recorded: Number;
}

export interface TextSummaryPayload {
  difference_in_days: Number;
  number_type_discrepencies: Number;
  max_date: Date;
  min_date: Date;
  types_discrepancies: String;
  source_recorded: Number;
}

export interface GenerateFilePayload {
  summary_report: string;
  file_type: String;
}
