import {CompareFilePayload} from './dto/file';
import {FileServiceImpl} from './services/impl/file_service_impl';

const filename: CompareFilePayload = {
  proxy_filename: 'proxy',
  source_filename: 'source',
};

const fileService = new FileServiceImpl();
fileService.compareFiles(filename);

console.info('Successfully generated report & summary');
