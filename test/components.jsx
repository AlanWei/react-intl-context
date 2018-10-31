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

const IntlValidId = ({ intl }) => (
  <div>
    <span>{intl.locale}</span>
    <span>{intl.formatMessage({ id: 'test' })}</span>
  </div>
);
IntlValidId.propTypes = propTypes;

const IntlValidIdWithVariables = ({ intl }) => (
  <div>
    <span>{intl.locale}</span>
    <span>
      {intl.formatMessage(
        { id: 'test' },
        { role: 'engineer', role2: 'teacher' },
      )}
    </span>
  </div>
);
IntlValidIdWithVariables.propTypes = propTypes;

const IntlInvalidId = ({ intl }) => (
  <div>
    <span>{intl.locale}</span>
    <span>{intl.formatMessage({ id: 'abc' })}</span>
  </div>
);
IntlInvalidId.propTypes = propTypes;

const IntlInvalidIdWithDefaultMessage = ({ intl }) => (
  <div>
    <span>{intl.locale}</span>
    <span>{intl.formatMessage({ id: 'abc', defaultMessage: 'abc' })}</span>
  </div>
);
IntlInvalidIdWithDefaultMessage.propTypes = propTypes;

export {
  IntlValidId,
  IntlValidIdWithVariables,
  IntlInvalidId,
  IntlInvalidIdWithDefaultMessage,
};
