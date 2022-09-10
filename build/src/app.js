"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_service_impl_1 = require("./services/impl/file_service_impl");
const filename = {
    proxy_filename: 'proxy',
    source_filename: 'source',
};
const fileService = new file_service_impl_1.FileServiceImpl();
fileService.compareFiles(filename);
console.info('Successfully generated report & summary');
