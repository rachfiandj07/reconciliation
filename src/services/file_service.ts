import {CompareFilePayload} from '../dto/file';

export interface FileService {
  compareFiles(filename: CompareFilePayload): Promise<void>;
}

export default FileService;
