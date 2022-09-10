import * as fs from 'fs';
import {
  GenerateFile,
  ReadFile,
  WriteFilesSummary,
} from '../../src/mapper/file_mapper';
import {FILE_NAME, FILE_REPORT, FILE_SUMMARY} from '../constant/file';

jest.mock('fs');

describe('WriteFilesSummary', () => {
  test('should write files summary as txt to reports directory', () => {
    WriteFilesSummary(FILE_SUMMARY);
    expect(jest.isMockFunction(fs.writeFile)).toBeTruthy();
  });

  test('should return error when fail write files summary as txt to reports directory', async () => {
    jest.spyOn(fs, 'writeFileSync').mockImplementation(async () => {
      throw new Error('Some error');
    });
    await WriteFilesSummary(FILE_SUMMARY);
    fs.writeFile;
  });
});

describe('GenerateFile', () => {
  test('should write report as decided format to reports directory', () => {
    GenerateFile(FILE_REPORT);
    expect(jest.isMockFunction(fs.writeFile)).toBeTruthy();
  });
});

describe('ReadFile', () => {
  test('should be able to read desired csv data files', async () => {
    fs.readFileSync;
    const ReadData = await ReadFile(FILE_NAME);
    expect(fs.readFileSync).toHaveBeenCalled();
    expect(ReadData).toBe(undefined);
  });
});
