type TLanguages = 'en' | 'ru';

type ILanguage = Record<TLanguages, Record<string, string | boolean> & { name: TLanguages }>;

export const language: ILanguage = {
  en: {
    name: 'en',
    invalidUrl: 'Invalid url',
    greeting: 'Good day!',
    mechanics: 'Mechanics',
    note: false,
    mechanicsDesc:
      ' testing consists of four tests: two trial (1, 3) and two valid (2, 4). In the first test, it is necessary to connect the numbers from 1 to 10 sequentially by clicking on them with the mouse as quickly as possible, and in the second from 1 to 24. In the third test, connect numbers with letters sequentially, for example 1-A-2-B-3-..., there will be 5 digits and 5 letters in total. In the fourth task, the same thing, only numbers and letters of 12.',
    testName: 'Test',
    testFinished: 'Testing finished',
    testDate: 'Date of testing',
    time: 'Time',
    timeSec: 'sec',
    startTest: 'Start test',
    skip: 'Skip',
    notPassed: 'Not passed',
  },
  ru: {
    name: 'ru',
    invalidUrl: 'Некорректная ссылка',
    greeting: 'Добрый день!',
    mechanics: 'Механика',
    note: true,
    mechanicsDesc:
      ' тестирование состоит из четырех тестов: двух пробных (1, 3) и двух зачетных (2, 4). В первом тесте необходимо соединить последовательно цифры от 1 до 10, кликая на них мышкой как можно быстрее, а во втором уже от 1 до 24. В третьем тесте соединить последовательно цифры с буквами, например 1-А-2-Б-3-..., всего будет 5 цифр и 5 букв. В четвертом задании то же самое, только цифр и букв по 12.',
    testName: 'Тест',
    testFinished: 'Тестирование завершено',
    testDate: 'Дата проведения тестирования',
    time: 'Время',
    timeSec: 'сек',
    startTest: 'Начать тест',
    skip: 'Пропустить',
    notPassed: 'Не пройден',
  },
};
