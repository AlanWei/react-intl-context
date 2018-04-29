import React from 'react';

const { Provider, Consumer } = React.createContext({
  locale: '',
  messages: {},
  formatMessage: () => {},
});

export {
  Provider,
  Consumer,
};
