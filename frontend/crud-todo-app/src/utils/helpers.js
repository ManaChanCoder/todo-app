export const wordTrim = (word, limit) => {
  if (word.length <= limit) return word;
  return word.substring(0, limit) + "...";
};
