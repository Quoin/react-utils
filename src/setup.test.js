import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import dirtyChai from 'dirty-chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import jsdom from 'jsdom';
import React from 'react';
import sinonChai from 'sinon-chai';

chai.use(chaiImmutable);
chai.use(dirtyChai);
chai.use(sinonChai);

const doc = new jsdom.JSDOM('<!doctype html><html><body></body></html>');
global.window = doc.window;
global.document = global.window.document;

Enzyme.configure({ adapter: new Adapter() });

global.expect = chai.expect;
global.React = React;

// global.console.log = () => {};
// global.console.error = () => {};
