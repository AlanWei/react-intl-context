# react-intl-context
[![npm v](https://img.shields.io/npm/v/react-intl-context.svg)](https://www.npmjs.com/package/react-intl-context)
[![npm dm](https://img.shields.io/npm/dm/react-intl-context.svg)](https://www.npmjs.com/package/react-intl-context)

Tiny React Component binds translations with React Context.
## Installation
```bash
yarn add react-intl-context
```
## Usage
### Add `IntlProvider` at top of the App
```javascript
import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { IntlProvider } from 'react-intl-context';
import App from './app';

/**
 * locale value in String
 * e.g. en-us
 */
const LOCALE = process.env.BUILD_LOCALE;
/**
 * locale messages in JSON or Object
 * e.g. {
 *   test: "test",
 * }
 */
const MESSAGES = process.env.BUILD_LOCALE_MESSAGES;

const propTypes = {
  history: PropTypes.object.isRequired,
};

const Router = props => (
  <ConnectedRouter history={props.history}>
    <IntlProvider
      locale={LOCALE}
      messages={MESSAGES}
    >
      <App>
    </IntlProvider>
  </ConnectedRouter>
);

Router.propTypes = propTypes;
export default Router;
```
### Inject `IntlConsumer` to components which need translations by `injectIntl` HOC
```javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl-context';

const propTypes = {
  intl: PropTypes.object.isRequired,
};

/**
 * this.props.intl = {
 *   locale: PropTypes.string.
 *   messages: PropTypes.objectOf(PropTypes.string),
 *   formatMessage: ({
 *     id: PropTypes.string,     // message key
 *   }) => PropTypes.string      // message value
 * }
 */
class View extends Component {
  render() {
    return (
      <p>{this.props.intl.formatMessage({ id: 'test' })}</p>
    );
  }
}

View.propTypes = propTypes;
export default injectIntl(View);
```
## To-Do
* Support custom variable in `formatMessage`
#### Message
```javascript
{
  home_promo: "I love ${appName}.",
}
```
#### Variable
```javascript
this.props.intl.formatMessage({
  id: 'home_promo',
  appName: 'React',
});

// return
"I love React."
```