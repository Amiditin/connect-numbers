export const extractNumbers = (text: string) => {
  return (text.match(/(\d+|\d+)(,\d+)*(\.\d+)*/g) || []).join('');
};
