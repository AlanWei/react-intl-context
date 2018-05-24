import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  intl: PropTypes.shape({
    locale: PropTypes.string,
    messages: PropTypes.object,
    formatMessage: PropTypes.func,
  }).isRequired,
};

const IntlValidId = props => (
  <div>
    {props.intl.locale}
    {props.intl.formatMessage({ id: 'test' })}
  </div>
);
IntlValidId.propTypes = propTypes;

const IntlInvalidId = props => (
  <div>
    {props.intl.locale}
    {props.intl.formatMessage({ id: 'abc' })}
  </div>
);
IntlInvalidId.propTypes = propTypes;

export {
  IntlValidId,
  IntlInvalidId,
};
