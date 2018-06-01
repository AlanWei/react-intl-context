import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  intl: PropTypes.shape({
    locale: PropTypes.string,
    messages: PropTypes.object,
    formatMessage: PropTypes.func,
    updateIntl: PropTypes.func,
  }).isRequired,
};

const IntlValidId = props => (
  <div>
    <span>{props.intl.locale}</span>
    <span>{props.intl.formatMessage({ id: 'test' })}</span>
  </div>
);
IntlValidId.propTypes = propTypes;

const IntlInvalidId = props => (
  <div>
    <span>{props.intl.locale}</span>
    <span>{props.intl.formatMessage({ id: 'abc' })}</span>
  </div>
);
IntlInvalidId.propTypes = propTypes;

export {
  IntlValidId,
  IntlInvalidId,
};
