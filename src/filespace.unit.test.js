import moduleToTest from './filespace';

import filespace from './_.test';

describe(filespace(__filename), () => {
  it('exposes a function with 2 params', () => {
    expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(2);
  });

  describe('()', () => {
    const ROOT_PATH = '/project/root';
    const FILENAME = 'sub/folder/file/name';
    const FILE_PATH = `${ROOT_PATH}/${FILENAME}`;

    it('returns undefined when no params', () => {
      expect(moduleToTest()).to.be.undefined();
    });

    it('returns filename if no rootPath', () => {
      expect(moduleToTest(FILENAME)).to.equal(FILENAME);
    });

    it('returns filename if not under rootPath', () => {
      expect(moduleToTest(FILENAME, ROOT_PATH)).to.equal(FILENAME);
    });

    it('returns filename when under rootPath', () => {
      expect(moduleToTest(FILE_PATH, ROOT_PATH)).to.equal(FILENAME);
    });

    it('returns undefined when filename is undefined', () => {
      expect(moduleToTest(undefined, ROOT_PATH)).to.be.undefined();
    });
  });
});
