import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
import dirtyChai from 'dirty-chai';

chai.use(chaiImmutable);
chai.use(dirtyChai);

global.expect = expect;
