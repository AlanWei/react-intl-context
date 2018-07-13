# react-intl-context
[![npm v](https://img.shields.io/npm/v/react-intl-context.svg)](https://www.npmjs.com/package/react-intl-context)
[![npm dm](https://img.shields.io/npm/dm/react-intl-context.svg)](https://www.npmjs.com/package/react-intl-context)

Tiny React Component binds language files with React Context.

## Installation
```bash
yarn add react-intl-context react
```

## Usage
### Single Intl
#### Add `IntlProvider` at the top of your app
> Recommend to include your language file during the building process

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { IntlProvider } from 'react-intl-context';
import App from './app';

/**
 * locale value in String
 * e.g. "en-us"
 */
const LOCALE = process.env.BUILD_LOCALE;
/**
 * locale messages in JSON or Object
 * e.g. {
 *   "test": "test",
 *   "roleInfo": "I am a {role}.",
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
      <App />
    </IntlProvider>
  </ConnectedRouter>
);

Router.propTypes = propTypes;
export default Router;
```

#### Inject `IntlConsumer` to component that need translations with `injectIntl` HOC
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
 *     id: PropTypes.string,             // message key
 *     defaultMessage: PropTypes.string, // message defaultValue if message key is missing in locale files
 *   }, {
 *     [variableKey]: [variableValue],   // custom variables
 *     ...
 *   }) => PropTypes.string              // message value
 * }
 */
class View extends Component {
  render() {
    const roleMap = {
      'en-us': 'student',
      'zh-cn': '学生',
    };

    const { formatMessage, locale } = this.props.intl;

    return (
      <p>{formatMessage({ id: 'test' })}</p>
      <p>{formatMessage({ id: 'roleInfo' }, { role: roleMap[locale] })}</p>
    );
  }
}

View.propTypes = propTypes;
export default injectIntl(View);
```

### Multi Intl
#### Add `MultiIntlProvider` at the top of your app
> Recommend to include your language file during the building process

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { MultiIntlProvider } from 'react-intl-context';
import App from './app';

/**
 * default locale value in String
 * e.g. "en-us"
 */
const DEFAULT_LOCALE = process.env.BUILD_DEFAULT_LOCALE;
/**
 * locale message map in JSON or Object
 * e.g. {
 *   "en-us": {
 *     "test": "test",
 *     "roleInfo": "I am a {role}.",
 *   },
 *   "zh-cn": {
 *     "test": "测试",
 *     "roleInfo": "我是一个{role}。",
 *   }
 * }
 */
const MESSAGE_MAP = process.env.BUILD_LOCALE_MESSAGE_MAP;

const propTypes = {
  history: PropTypes.object.isRequired,
};

const Router = props => (
  <ConnectedRouter history={props.history}>
    <MultiIntlProvider
      defaultLocale={DEFAULT_LOCALE}
      messageMap={MESSAGE_MAP}
    >
      <App />
    </MultiIntlProvider>
  </ConnectedRouter>
);

Router.propTypes = propTypes;
export default Router;
```

#### Inject `IntlConsumer` to component that need translations with `injectIntl` HOC
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
 *     id: PropTypes.string,             // message key
 *     defaultMessage: PropTypes.string, // message defaultValue if message key is missing in locale files
 *   }, {
 *     [variableKey]: [variableValue],   // custom variables
 *     ...
 *   }) => PropTypes.string              // message value
 * }
 */
class View extends Component {
  render() {
    const roleMap = {
      'en-us': 'student',
      'zh-cn': '学生',
    };

    const { formatMessage, locale } = this.props.intl;

    return (
      <p>{formatMessage({ id: 'test' })}</p>
      <p>{formatMessage({ id: 'roleInfo' }, { role: roleMap[locale] })}</p>
    );
  }
}

View.propTypes = propTypes;
export default injectIntl(View);
```