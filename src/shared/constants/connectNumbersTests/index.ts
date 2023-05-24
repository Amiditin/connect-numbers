export interface IConnectNumbersTest {
  number: number;
  completed: boolean;
  time: string | null;
  withLetters: boolean;
  isOptional: boolean;
  numberItems: number;
}

export const connectNumbersTests: IConnectNumbersTest[] = [
  {
    number: 1,
    completed: false,
    time: null,
    withLetters: false,
    isOptional: true,
    numberItems: 10,
  },
  {
    number: 2,
    completed: false,
    time: null,
    withLetters: false,
    isOptional: false,
    numberItems: 24,
  },
  {
    number: 3,
    completed: false,
    time: null,
    withLetters: true,
    isOptional: true,
    numberItems: 10,
  },
  {
    number: 4,
    completed: false,
    time: null,
    withLetters: true,
    isOptional: false,
    numberItems: 24,
  },
];
