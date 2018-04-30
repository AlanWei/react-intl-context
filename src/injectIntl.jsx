import React from 'react';
import { Consumer } from './IntlContext';

const injectIntl = (WrappedComponent) => {
  const InjectIntl = props => (
    <Consumer>
      {value => <WrappedComponent {...props} intl={value} />}
    </Consumer>
  );

  return InjectIntl;
};

export default injectIntl;
