export type TParsePhone = (phone: string) => string;

// * +79999999999 -> +7(999)999-99-99

const ruPhoneFormat = '+7(___)___-__-__';

export const parsePhone: TParsePhone = (phone) => {
  if (
    phone === '+' ||
    (phone.length === 3 && phone.slice(0, 2) === '+7' && isNaN(+phone.slice(2, 3)))
  ) {
    return '+7';
  }

  const phoneNumbers = phone.match(/\d/g)?.join('').split('');

  if (!phoneNumbers || phoneNumbers.length === 0) {
    return '';
  }

  if (phoneNumbers.length === 1) {
    return '+7(' + phoneNumbers[0];
  }

  let newPhone = '';
  phoneNumbers.shift();

  for (let i = 0; i < ruPhoneFormat.length; i++) {
    if (phoneNumbers.length === 0) {
      break;
    }

    newPhone += ruPhoneFormat[i] === '_' ? phoneNumbers.shift() : ruPhoneFormat[i];
  }

  return newPhone;
};
