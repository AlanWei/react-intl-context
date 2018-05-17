import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from './IntlContext';

const propTypes = {
  messageMap: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
  currentLocale: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

const defaultProps = {
  messageMap: {},
};

class MultiIntlProvider extends Component {
  static getDerivedStateFromProps(nextProps) {
    return {
      currentLocale: nextProps.currentLocale,
      messages: nextProps.messageMap[nextProps.currentLocale],
    };
  }

  state = {
    currentLocale: this.props.currentLocale,
    messages: this.props.messageMap[this.props.currentLocale],
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.currentLocale !== prevProps.currentLocale) {
      this.setState({
        currentLocale: this.props.currentLocale,
        messages: this.props.messageMap[this.props.currentLocale],
      });
    }
  }

  getDerivedValue = () => ({
    locale: this.state.currentLocale,
    messages: this.state.messages,
    formatMessage: this.formatMessage,
  })

  formatMessage = (config) => {
    const { id } = config;
    const message = this.state.messages[id];

    if (message === undefined) {
      console.warn(`[react-intl-context]: Locale ${this.state.currentLocale} message key ${id} is undefined. Fallback to empty string.`);
      return '';
    }

    return message;
  }

  render() {
    return (
      <Provider value={this.getDerivedValue()}>
        {this.props.children}
      </Provider>
    );
  }
}

MultiIntlProvider.propTypes = propTypes;
MultiIntlProvider.defaultProps = defaultProps;
export default MultiIntlProvider;
