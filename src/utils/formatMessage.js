const formatMessage = (config, messages) => {
  const { id, defaultMessage } = config;
  const message = messages[id];

  if (message === undefined) {
    if (defaultMessage !== undefined) {
      return defaultMessage;
    }
    console.warn(`[react-intl-context]: Message key ${id} is undefined. Fallback to empty string.`);
    return '';
  }

  return message;
};

export default formatMessage;
