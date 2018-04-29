import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
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
  getMessage = (config) => {
    const { id } = config;
    const message = get(this.props, `messages.${id}`);

    if (isNil(message)) {
      console.warn(`[react-intl-context]: Message key ${id} is undefined. Fallback to empty string`);
      return '';
    }
    return message;
  }

  formatValue = () => ({
    locale: this.props.locale,
    messages: this.props.messages,
    getMessage: this.getMessage,
  })

  render() {
    return (
      <Provider
        value={this.formatValue()}
      >
        {this.props.children}
      </Provider>
    );
  }
}

IntlProvider.propTypes = propTypes;
IntlProvider.defaultProps = defaultProps;
export default IntlProvider;
