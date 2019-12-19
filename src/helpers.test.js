import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
import dirtyChai from 'dirty-chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import jsdom from 'jsdom';
import React from 'react';

chai.use(chaiImmutable);
chai.use(dirtyChai);

const doc = new jsdom.JSDOM('<!doctype html><html><body></body></html>');
global.window = doc.window;
global.document = window.document;

Enzyme.configure({ adapter: new Adapter() });

global.expect = expect;
global.React = React;

global.console.log = () => {};
global.console.error = () => {};
