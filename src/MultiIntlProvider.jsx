import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from './IntlContext';

const propTypes = {
  defaultLocale: PropTypes.string.isRequired,
  messageMap: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
  children: PropTypes.element.isRequired,
};

const defaultProps = {
  messageMap: {},
};

class MultiIntlProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {
        locale: props.defaultLocale,
        messages: props.messageMap[props.defaultLocale],
        formatMessage: this.formatMessage,
        updateLocale: this.updateLocale,
      },
    };
  }

  updateLocale = (locale) => {
    this.setState({
      value: {
        ...this.state.value,
        locale,
        messages: this.props.messageMap[locale],
      },
    });
  }

  formatMessage = (config) => {
    const { messages, currentLocale } = this.state.value;
    const { id } = config;
    const message = messages[id];

    if (message === undefined) {
      console.warn(`[react-intl-context]: Locale ${currentLocale} message key ${id} is undefined. Fallback to empty string.`);
      return '';
    }

    return message;
  }

  render() {
    return (
      <Provider value={this.state.value}>
        {this.props.children}
      </Provider>
    );
  }
}

MultiIntlProvider.propTypes = propTypes;
MultiIntlProvider.defaultProps = defaultProps;
export default MultiIntlProvider;
