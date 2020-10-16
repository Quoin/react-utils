import moduleToTest from './generate-classnames-from-prefix';

import filespace from './_.test';

describe.only(filespace(__filename), () => {
  it('exports a function with infinite params', () => {
    expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(0);
  });

  describe('()', () => {
    const generateClassnames = moduleToTest('foo');

    it('expects at least one param', () => {
      expect(() => moduleToTest()).to.throw();
    });

    it('returns a function with infinite params', () => {
      expect(generateClassnames).to.be.a('function').and.to.have.lengthOf(0);
    });

    it('defines at least MODULE as string', () => {
      const classnames = generateClassnames();
        expect(classnames).to.deep.equal({
          MODULE: 'foo',
        });
    });

    it('freezes returned object', () => {
      const classnames = generateClassnames();
      expect(classnames).to.deep.equal({
        MODULE: 'foo',
      });
      expect(() => { classnames.bar = 'not happening'; }).to.throw();
    });

    it('generates an object for classnames', () => {
      const classnames = generateClassnames('one', 'two', 'three');
      expect(classnames).to.deep.equal({
        MODULE: 'foo',
        ONE: 'foo--one',
        THREE: 'foo--three',
        TWO: 'foo--two',
      });
    });

    it('handles more complex keys', () => {
      const classnames = generateClassnames('some space', 'double--dash', 'question?');
      expect(classnames).to.deep.equal({
        MODULE: 'foo',
        SOME_SPACE: 'foo--some-space',
        DOUBLE_DASH: 'foo--double-dash',
        QUESTION: 'foo-question',
      });
    });
  });
});
