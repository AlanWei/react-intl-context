import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  IntlValidId,
  IntlValidIdWithVariables,
  IntlInvalidId,
  IntlInvalidIdWithDefaultMessage,
} from './components';
import { injectIntl, IntlProvider, MultiIntlProvider } from '../src';

beforeEach(() => {
  jest.resetModules();
});

configure({
  adapter: new Adapter(),
});

test('[react-intl-context]: single intl valid locale and messages en-us', () => {
  const component = shallow((
    <IntlProvider
      locale="en-us"
      messages={{
        test: 'test',
      }}
    >
      {injectIntl(IntlValidId)()}
    </IntlProvider>
  ));
  const html = component.html();
  expect(html).toEqual('<div><span>en-us</span><span>test</span></div>');
});

test('[react-intl-context]: single intl valid locale and messages zh-cn', () => {
  const component = shallow((
    <IntlProvider
      locale="zh-cn"
      messages={{
        test: '测试',
      }}
    >
      {injectIntl(IntlValidId)()}
    </IntlProvider>
  ));
  const html = component.html();
  expect(html).toEqual('<div><span>zh-cn</span><span>测试</span></div>');
});

test('[react-intl-context]: single intl valid message id with variables', () => {
  const component = shallow((
    <IntlProvider
      locale="en-us"
      messages={{
        test: 'I am an {role}. You are also an {role}. But he is a {role2}.',
      }}
    >
      {injectIntl(IntlValidIdWithVariables)()}
    </IntlProvider>
  ));
  const html = component.html();
  expect(html).toEqual('<div><span>en-us</span><span>I am an engineer. You are also an engineer. But he is a teacher.</span></div>');
});

test('[react-intl-context]: single intl invalid message id', () => {
  const component = shallow((
    <IntlProvider
      locale="en-us"
      messages={{
        test: 'test',
      }}
    >
      {injectIntl(IntlInvalidId)()}
    </IntlProvider>
  ));
  const html = component.html();
  expect(html).toEqual('<div><span>en-us</span><span></span></div>');
});

test('[react-intl-context]: single intl invalid message id with defaultMessage', () => {
  const component = shallow((
    <IntlProvider
      locale="en-us"
      messages={{
        test: 'test',
      }}
    >
      {injectIntl(IntlInvalidIdWithDefaultMessage)()}
    </IntlProvider>
  ));
  const html = component.html();
  expect(html).toEqual('<div><span>en-us</span><span>abc</span></div>');
});

test('[react-intl-context]: multi intl valid locale and messages en-us', () => {
  const component = shallow((
    <MultiIntlProvider
      defaultLocale="en-us"
      messageMap={{
        'en-us': {
          test: 'test',
        },
        'zh-cn': {
          test: '测试',
        },
      }}
    >
      {injectIntl(IntlValidId)()}
    </MultiIntlProvider>
  ));
  const html = component.html();
  expect(html).toEqual('<div><span>en-us</span><span>test</span></div>');
});

test('[react-intl-context]: multi intl valid locale and messages zh-cn', () => {
  const component = shallow((
    <MultiIntlProvider
      defaultLocale="zh-cn"
      messageMap={{
        'en-us': {
          test: 'test',
        },
        'zh-cn': {
          test: '测试',
        },
      }}
    >
      {injectIntl(IntlValidId)()}
    </MultiIntlProvider>
  ));
  const html = component.html();
  expect(html).toEqual('<div><span>zh-cn</span><span>测试</span></div>');
});

test('[react-intl-context]: multi intl invalid message id', () => {
  const component = shallow((
    <MultiIntlProvider
      defaultLocale="en-us"
      messageMap={{
        'en-us': {
          test: 'test',
        },
        'zh-cn': {
          test: '测试',
        },
      }}
    >
      {injectIntl(IntlInvalidId)()}
    </MultiIntlProvider>
  ));
  const html = component.html();
  expect(html).toEqual('<div><span>en-us</span><span></span></div>');
});

test('[react-intl-context]: multi intl invalid message id with defaultMessage', () => {
  const component = shallow((
    <MultiIntlProvider
      defaultLocale="en-us"
      messageMap={{
        'en-us': {
          test: 'test',
        },
        'zh-cn': {
          test: '测试',
        },
      }}
    >
      {injectIntl(IntlInvalidIdWithDefaultMessage)()}
    </MultiIntlProvider>
  ));
  const html = component.html();
  expect(html).toEqual('<div><span>en-us</span><span>abc</span></div>');
});
