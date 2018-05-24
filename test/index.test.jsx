import React from 'react';
import renderer from 'react-test-renderer';
import { IntlValidId, IntlInvalidId } from './components';
import { injectIntl, IntlProvider, MultiIntlProvider } from '../src';

test('[react-intl-context]: single intl valid locale and messages en-us', () => {
  const component = renderer.create((
    <IntlProvider
      locale="en-us"
      messages={{
        test: 'test',
      }}
    >
      {injectIntl(IntlValidId)()}
    </IntlProvider>
  ));
  const tree = component.toJSON();
  expect(tree.children).toEqual(['en-us', 'test']);
});

test('[react-intl-context]: single intl valid locale and messages zh-cn', () => {
  const component = renderer.create((
    <IntlProvider
      locale="zh-cn"
      messages={{
        test: '测试',
      }}
    >
      {injectIntl(IntlValidId)()}
    </IntlProvider>
  ));
  const tree = component.toJSON();
  expect(tree.children).toEqual(['zh-cn', '测试']);
});

test('[react-intl-context]: single intl invalid message id', () => {
  const component = renderer.create((
    <IntlProvider
      locale="en-us"
      messages={{
        test: 'test',
      }}
    >
      {injectIntl(IntlInvalidId)()}
    </IntlProvider>
  ));
  const tree = component.toJSON();
  expect(tree.children).toEqual(['en-us', '']);
});

test('[react-intl-context]: multi intl valid locale and messages en-us', () => {
  const component = renderer.create((
    <MultiIntlProvider
      currentLocale="en-us"
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
  const tree = component.toJSON();
  expect(tree.children).toEqual(['en-us', 'test']);
});

test('[react-intl-context]: multi intl valid locale and messages zh-cn', () => {
  const component = renderer.create((
    <MultiIntlProvider
      currentLocale="zh-cn"
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
  const tree = component.toJSON();
  expect(tree.children).toEqual(['zh-cn', '测试']);
});

test('[react-intl-context]: multi intl invalid message id', () => {
  const component = renderer.create((
    <MultiIntlProvider
      currentLocale="en-us"
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
  const tree = component.toJSON();
  expect(tree.children).toEqual(['en-us', '']);
});
