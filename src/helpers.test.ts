import * as chai from 'chai';
import chaiImmutable = require('chai-immutable');
import dirtyChai = require('dirty-chai');
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
// import jsdom from 'jsdom';
import 'mocha';
// import React from 'react';

chai.use(chaiImmutable);
chai.use(dirtyChai);

declare global {
  namespace NodeJS {
    interface Global {
      expect: Chai.ExpectStatic;
    }
  }

  const expect: Chai.ExpectStatic;
}

// const doc = new jsdom.JSDOM('<!doctype html><html><body></body></html>');
// global.window = doc.window;
// global.document = window.document;

Enzyme.configure({ adapter: new Adapter() });

global.expect = chai.expect;
// global.React = React;

// global.console.log = () => {};
// global.console.error = () => {};
