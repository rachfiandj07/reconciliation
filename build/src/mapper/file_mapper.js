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
exports.WriteFilesSummary = exports.GenerateFile = exports.ReadFile = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const ReadFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    // const finishedCsvData: Array<Record<string, string>> = [];
    const data = yield fs.readFileSync(path.join(__dirname, `../../files/${file.name}.csv`), 'utf8');
    return data;
});
exports.ReadFile = ReadFile;
const GenerateFile = (generateFilePayload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fs.promises.writeFile(path.join(__dirname, `../../reports/report.${generateFilePayload.file_type}`), generateFilePayload.summary_report, 'utf-8');
    }
    catch (error) {
        return error;
    }
});
exports.GenerateFile = GenerateFile;
const WriteFilesSummary = (writeFilePayload) => __awaiter(void 0, void 0, void 0, function* () {
    const textSummary = 'Difference In Days : ' +
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
        yield fs.promises.writeFile(path.join(__dirname, '../../reports/summary.txt'), textSummary, 'utf-8');
    }
    catch (error) {
        return error;
    }
});
exports.WriteFilesSummary = WriteFilesSummary;
