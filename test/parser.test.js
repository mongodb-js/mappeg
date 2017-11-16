const { expect } = require('chai');
const parser = require('../');

describe('parser', () => {
  describe('#parse', () => {
    context('when the stage is empty', () => {
      context('when both open/close brackets exist', () => {
        context('when no whitespace exists', () => {
          it('returns the ast', () => {
            expect(parser.parse('{}')).to.deep.equal({ expression: {}});
          });
        });

        context('when whitespace exists', () => {
          context('when there is a single character of whitespace', () => {
            it('returns the ast', () => {
              expect(parser.parse('{ }')).to.deep.equal({ expression: {}});
            });
          });

          context('when there are multiple characters of whitespace', () => {
            it('returns the ast', () => {
              expect(parser.parse(' {   } ')).to.deep.equal({ expression: {}});
            });
          });
        });
      });

      context('when only an open bracket exists', () => {
        it('raises a syntax error', () => {
          expect(() => { parser.parse('{'); }).
            to.throw('Expected "}" but end of input found.');
        });
      });

      context('when only a closing bracket exists', () => {
        it('raises a syntax error', () => {
          expect(() => { parser.parse('}'); }).
            to.throw('Expected "{" but "}" found.');
        });
      });

      context('when no open or closing bracket exists', () => {
        it('raises a syntax error', () => {
          expect(() => { parser.parse(''); }).
            to.throw('Expected "{" but end of input found.');
        });
      });
    });
  });
});
