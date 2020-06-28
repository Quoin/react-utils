import moduleToTest from './base-classname';

describe('src/base-classname', () => {
  it('exports a function with 2 params', () => {
    expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(2);
  });

  describe('()', () => {
    it('returns empty string when no params.', () => {
      expect(moduleToTest()).to.equal('');
    });

    describe('without prefix', () => {
      it('returns the name', () => {
        expect(moduleToTest('Foo')).to.equal('Foo');
      });

      it("converts name with '.' to '-'", () => {
        expect(moduleToTest('Foo.Bar')).to.equal('Foo-Bar');
      });

      it("converts name with multiple '.' to '-'", () => {
        expect(moduleToTest('Foo.Bar.Again')).to.equal('Foo-Bar-Again');
      });

      it("converts name with consecutive '.' or '-' to single '-'", () => {
        expect(moduleToTest('Foo.-Bar')).to.equal('Foo-Bar');
        expect(moduleToTest('Foo..Bar')).to.equal('Foo-Bar');
        expect(moduleToTest('Foo..Bar..Again')).to.equal('Foo-Bar-Again');
      });
    });

    describe('with prefix', () => {
      it('adds prefix name', () => {
        expect(moduleToTest('Foo', 'prefix')).to.equal('prefix--Foo');
      });

      it('adds cleaned prefix', () => {
        expect(moduleToTest('Foo', 'some--prefix')).to.equal('some-prefix--Foo');
      });
    });
  });
});
