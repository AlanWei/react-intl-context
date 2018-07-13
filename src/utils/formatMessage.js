const replaceVariables = (str, variables) => {
  let newStr = str;
  Object.keys(variables).forEach(((key) => {
    const value = variables[key];
    const regex = new RegExp(`{${key}}`, 'g');
    newStr = newStr.replace(regex, value);
  }));

  return newStr;
};

const formatMessage = (config, messages, variables) => {
  const { id, defaultMessage } = config;
  let message = messages[id];

  if (message === undefined) {
    if (defaultMessage !== undefined) {
      return defaultMessage;
    }
    console.warn(`[react-intl-context]: Message key ${id} is undefined. Fallback to empty string.`);
    return '';
  }

  if (variables !== undefined) {
    message = replaceVariables(message, variables);
  }

  return message;
};

export default formatMessage;
