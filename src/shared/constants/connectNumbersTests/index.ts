export interface IConnectNumbersTest {
  number: number;
  completed: boolean;
  time: number | null;
  withLetters: boolean;
  numberItems: number;
}

export const connectNumbersTests: IConnectNumbersTest[] = [
  {
    number: 1,
    completed: false,
    time: null,
    withLetters: false,
    numberItems: 10,
  },
  {
    number: 2,
    completed: false,
    time: null,
    withLetters: false,
    numberItems: 24,
  },
  {
    number: 3,
    completed: false,
    time: null,
    withLetters: true,
    numberItems: 10,
  },
  {
    number: 4,
    completed: false,
    time: null,
    withLetters: true,
    numberItems: 24,
  },
];
