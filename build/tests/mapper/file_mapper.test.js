"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const fs = __importStar(require("fs"));
const file_mapper_1 = require("../../src/mapper/file_mapper");
const file_1 = require("../constant/file");
jest.mock('fs');
describe('WriteFilesSummary', () => {
    test('should write files summary as txt to reports directory', () => {
        file_mapper_1.WriteFilesSummary(file_1.FILE_SUMMARY);
        expect(jest.isMockFunction(fs.writeFile)).toBeTruthy();
    });
    test('should return error when fail write files summary as txt to reports directory', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(fs, 'writeFileSync').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
            throw new Error('Some error');
        }));
        yield file_mapper_1.WriteFilesSummary(file_1.FILE_SUMMARY);
        fs.writeFile;
    }));
});
describe('GenerateFile', () => {
    test('should write report as decided format to reports directory', () => {
        file_mapper_1.GenerateFile(file_1.FILE_REPORT);
        expect(jest.isMockFunction(fs.writeFile)).toBeTruthy();
    });
});
describe('ReadFile', () => {
    test('should be able to read desired csv data files', () => __awaiter(void 0, void 0, void 0, function* () {
        fs.readFileSync;
        const ReadData = yield file_mapper_1.ReadFile(file_1.FILE_NAME);
        expect(fs.readFileSync).toHaveBeenCalled();
        expect(ReadData).toBe(undefined);
    }));
});
