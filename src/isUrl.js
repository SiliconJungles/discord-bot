export const isUrl = url => {
  const typeOfUrl = typeof url;

  if (typeOfUrl !== "string") {
    throw new TypeError(`
      URL type is invalid. Expected a string, but got: ${typeOfUrl}
    `);
  }

  const isUrl = new RegExp(`^(?:(?:https?)://).*$`);

  return isUrl.test(url);
};
