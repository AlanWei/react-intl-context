import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from './IntlContext';

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
  state = {
    locale: this.props.locale,
    messages: this.props.messages,
    formatMessage: this.formatMessage,
  }

  formatMessage = (config) => {
    const { id } = config;
    const message = this.props.messages[id];

    if (message === undefined) {
      console.warn(`[react-intl-context]: Message key ${id} is undefined. Fallback to empty string.`);
      return '';
    }

    return message;
  }

  render() {
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    );
  }
}

IntlProvider.propTypes = propTypes;
IntlProvider.defaultProps = defaultProps;
export default IntlProvider;
