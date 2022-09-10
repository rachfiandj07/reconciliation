import {FileServiceImpl} from '../../src/services/impl/file_service_impl';
import {FILE_TO_COMPARE} from '../constant/file';

describe('FileServiceImpl', () => {
  const fileServiceImpl = new FileServiceImpl();
  describe('compareFiles', () => {
    test('should return type of object when compareFiles called', () => {
      expect(typeof fileServiceImpl.compareFiles(FILE_TO_COMPARE)).toBe(
        'object'
      );
    });

    test('should return undefined when compareFiles called', async () => {
      expect(await fileServiceImpl.compareFiles(FILE_TO_COMPARE)).toEqual(
        undefined
      );
    });

    test('should return undefined when compareFiles called', async () => {
      expect(await fileServiceImpl.compareFiles(FILE_TO_COMPARE)).toEqual(
        undefined
      );
    });
  });
});
