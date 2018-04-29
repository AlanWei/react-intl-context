import React from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import { injectIntl, IntlProvider } from '../src';

const propTypes = {
  intl: PropTypes.shape({
    locale: PropTypes.string,
    messages: PropTypes.object,
    formatMessage: PropTypes.func,
  }).isRequired,
};
const ValidIdComponent = props => (
  <div>
    {props.intl.locale}
    {props.intl.formatMessage({ id: 'test' })}
  </div>
);
const InvalidIdComponent = props => (
  <div>
    {props.intl.locale}
    {props.intl.formatMessage({ id: 'abc' })}
  </div>
);
ValidIdComponent.propTypes = propTypes;
InvalidIdComponent.propTypes = propTypes;

test('[react-intl-context]: valid locale and messages 1', () => {
  const component = renderer.create((
    <IntlProvider
      locale="en-us"
      messages={{
        test: 'test',
      }}
    >
      {injectIntl(ValidIdComponent)()}
    </IntlProvider>
  ));
  const tree = component.toJSON();
  expect(tree.children).toEqual(['en-us', 'test']);
});

test('[react-intl-context]: valid locale and messages 2', () => {
  const component = renderer.create((
    <IntlProvider
      locale="zh-cn"
      messages={{
        test: '测试',
      }}
    >
      {injectIntl(ValidIdComponent)()}
    </IntlProvider>
  ));
  const tree = component.toJSON();
  expect(tree.children).toEqual(['zh-cn', '测试']);
});

test('[react-intl-context]: invalid message id', () => {
  const component = renderer.create((
    <IntlProvider
      locale="en-us"
      messages={{
        test: 'test',
      }}
    >
      {injectIntl(InvalidIdComponent)()}
    </IntlProvider>
  ));
  const tree = component.toJSON();
  expect(tree.children).toEqual(['en-us', '']);
});
