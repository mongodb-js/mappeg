const { expect } = require('chai');
const parser = require('../');

describe('parser', () => {
  describe('#parse', () => {
    context('when the stage is empty', () => {
      context('when both open/close brackets exist', () => {
        context('when no whitespace exists', () => {
          it('returns the ast', () => {
            expect(parser.parse('{}')).to.deep.equal({ stage: null });
          });
        });

        context('when whitespace exists', () => {
          context('when there is a single character of whitespace', () => {
            it('returns the ast', () => {
              expect(parser.parse('{ }')).to.deep.equal({ stage: null });
            });
          });

          context('when there are multiple characters of whitespace', () => {
            it('returns the ast', () => {
              expect(parser.parse(' {   } ')).to.deep.equal({ stage: null });
            });
          });
        });
      });

      context('when only an open bracket exists', () => {
        it('raises a syntax error', () => {
          expect(() => { parser.parse('{'); }).
            to.throw('Expected "\'", "\\"", or "}" but end of input found.');
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

    /**
     * https://docs.mongodb.com/manual/reference/operator/aggregation/collStats/#pipe._S_collStats
     */
    context('when the stage operator is $collStats @3.4.0', () => {
      context('when no options are provided', () => {
        context('when the operator is double quoted', () => {
          it('returns the ast', () => {
            expect(parser.parse('{ "$collStats": {}}')).to.deep.equal({
              stage: {
                operator: '$collStats',
                argument: '{}'
              }
            });
          });
        });

        context('when the operator is single quoted', () => {
          it('returns the ast', () => {
            expect(parser.parse("{ '$collStats': {}}")).to.deep.equal({
              stage: {
                operator: '$collStats',
                argument: '{}'
              }
            });
          });
        });
      });

      context('when latencyStats is provided', () => {
        context('when latencyStats is empty', () => {
          it('returns the ast', () => {
            expect(parser.parse("{ '$collStats': { 'latencyStats': {}}}")).to.deep.equal({
              stage: {
                operator: '$collStats',
                argument: '{}'
              }
            });
          });
        });

        context('when histogram is a boolean', () => {

        });

        context('when histogram is not a boolean', () => {

        });
      });

      context('when storage stats is provided', () => {

      });
    });
  });
});
