export const checkReturnValueOfString = (valueOf: string, fallback = '-') => {
  if (valueOf && valueOf?.trim()?.length > 0) {
    return valueOf;
  }
  return fallback;
};

export const generateRandomChar = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters.charAt(randomIndex);
};

export function generateUniqueString() {
  let uniqueString = '';
  while (uniqueString.length < 9) {
    uniqueString += generateRandomChar();
  }
  return uniqueString;
}
