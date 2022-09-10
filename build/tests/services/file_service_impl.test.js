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
const file_service_impl_1 = require("../../src/services/impl/file_service_impl");
const file_1 = require("../constant/file");
describe('FileServiceImpl', () => {
    const fileServiceImpl = new file_service_impl_1.FileServiceImpl();
    describe('compareFiles', () => {
        test('should return type of object when compareFiles called', () => {
            expect(typeof fileServiceImpl.compareFiles(file_1.FILE_TO_COMPARE)).toBe('object');
        });
        test('should return undefined when compareFiles called', () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield fileServiceImpl.compareFiles(file_1.FILE_TO_COMPARE)).toEqual(undefined);
        }));
        test('should return undefined when compareFiles called', () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield fileServiceImpl.compareFiles(file_1.FILE_TO_COMPARE)).toEqual(undefined);
        }));
    });
});
