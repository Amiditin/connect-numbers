export type TParsePhone = (phone: string) => string;

export const parsePhone: TParsePhone = (phone) => {
  if (phone.length < 2) {
    return '+7';
  }

  if (phone.length === 12) {
    const regAutoComplete = /^\+\d{11}/g;

    if (regAutoComplete.test(phone)) {
      return (
        `${phone.substring(0, 2)}(${phone.substring(2, 5)})` +
        `${phone.substring(5, 8)}-${phone.substring(8, 10)}-${phone.substring(10)}`
      );
    }

    return phone;
  }

  if (isNaN(Number(phone.slice(-1)))) {
    return phone.slice(0, -1);
  }

  if (phone.length === 3) {
    return `${phone.slice(0, 2)}(${phone.slice(-1)}`;
  }

  if (phone.length === 7) {
    return `${phone.slice(0, 6)})${phone.slice(-1)}`;
  }

  if (phone.length === 11) {
    return `${phone.slice(0, 10)}-${phone.slice(-1)}`;
  }

  if (phone.length === 14) {
    return `${phone.slice(0, 13)}-${phone.slice(-1)}`;
  }

  return phone;
};
