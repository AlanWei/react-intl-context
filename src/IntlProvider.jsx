import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from './IntlContext';
import formatMessage from './utils/formatMessage';

const propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.objectOf(PropTypes.string),
  children: PropTypes.element.isRequired,
};

const defaultProps = {
  locale: '',
  messages: {},
};

class IntlProvider extends Component {
  constructor(props) {
    super(props);

    const { locale, messages } = props;

    this.state = {
      value: {
        locale,
        messages,
        formatMessage: (config, variables) => formatMessage(config, messages, variables),
      },
    };
  }

  render() {
    const { children } = this.props;
    const { value } = this.state;

    return (
      <Provider value={value}>
        {children}
      </Provider>
    );
  }
}

IntlProvider.propTypes = propTypes;
IntlProvider.defaultProps = defaultProps;
export default IntlProvider;
