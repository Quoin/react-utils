import moduleToTest from './flatten-hal';

describe('src/flatten-hal', () => {
  it('exports function with 1 param', () => {
    expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(1);
  });

  describe('()', () => {
    it('throws when no params', () => {
      expect(() => moduleToTest()).to.throw(TypeError);
    });

    it('throws if links is defined in data and in _links', () => {
      const hal = {
        links: 'foo',
        _links: {
          self: {
            href: '/bar',
          },
        },
      };

      expect(() => moduleToTest(hal)).to.throw(Error, /^Duplicate key 'links'.$/);
    });

    it('throws if embedded variables defined in data', () => {
      const hal = {
        somevar: 'foo',
        _embedded: {
          somevar: [{ foo: 'bar' }],
        },
      };

      expect(() => moduleToTest(hal)).to.throw(Error, /^Duplicate key '_embedded.somevar'.$/);
    });

    it('clones deep everything', () => {
      const expected = {
        var1: 'val1',
        var2: 'val2',
        links: {
          self: {
            href: 'href1',
          },
        },
        embedded1: [{
          var3: 'val3',
          var4: 'val4',
          links: {
            self: {
              href: 'href2',
            },
          },
        }],
        embedded2: [{
          var5: 'val5',
          links: {
            self: {
              href: 'href3',
            },
          },
        }],
      };

      const hal = {
        var1: 'val1',
        var2: 'val2',
        _links: {
          self: {
            href: 'href1',
          },
        },
        _embedded: {
          embedded1: [{
            var3: 'val3',
            var4: 'val4',
            _links: {
              self: {
                href: 'href2',
              },
            },
          }],
          embedded2: [{
            var5: 'val5',
            _links: {
              self: {
                href: 'href3',
              },
            },
          }],
        },
      };

      const value = moduleToTest(hal);

      expect(value).to.deep.equal(expected);

      hal.var1 = 'new-val1';
      expect(value).to.deep.equal(expected);
    });

    it('converts attributes with _links', () => {
      const hal = {
        var1: {
          _links: {
            self: {
              href: 'href',
            },
          },
        },
      };

      const value = moduleToTest(hal);

      expect(value).to.deep.equal({
        var1: {
          links: {
            self: {
              href: 'href',
            },
          },
        },
      });
    });

    it('converts attributes with _embedded', () => {
      const hal = {
        var1: {
          _embedded: {
            self: [{
              href: 'href',
            }],
          },
        },
      };

      const value = moduleToTest(hal);

      expect(value).to.deep.equal({
        var1: {
          self: [{
            href: 'href',
          }],
        },
      });
    });
  });
});
