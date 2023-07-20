export const checkReturnValueOfString = (valueOf: string, fallback = '-') => {
  if (valueOf && valueOf?.trim()?.length > 0) {
    return valueOf;
  }
  return fallback;
};
