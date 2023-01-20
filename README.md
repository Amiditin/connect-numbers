# 👑 Шаблон для проекта на Vite 4 👑

# Контуры

- dev-контур
  - [connect-numbers.vercel.app](connect-numbers.vercel.app)

# Окружение

В проекте используются:

- Node.js v18.12.1
- npm v8.6.0
- yarn v1.22.18

# Стек:

- **[React JS 18](https://reactjs.org)**
- **[TypeScript](https://www.typescriptlang.org)**
- **[Redux Toolkit](https://redux-toolkit.js.org)**
- **[React Router v6.4](https://reactrouter.com)**
- **[Axios](https://axios-http.com)**
- **[Ant Design 5.0](https://ant.design)**
- [CSS-Modules / SCSS](https://sass-lang.com)
- [Generate React CLI](https://github.com/arminbro/generate-react-cli) (шаблоны)
- [Prettier](https://prettier.io) (форматирование кода)
- [CLSX](https://github.com/lukeed/clsx) (замена Classnames)

# Работа с пакетами

1. Следует использовать `yarn` вместо `npm install`, чтобы установить зависимости из `package-lock.json` и не обновлять их.
   - Для установки новых зависимостей используйте `yar add --D <package-name>`
2. Запустить проект в режиме разработки `yarn dev` или `npm run dev`

# Генерация из шаблонов

С помощью консоли вы можете создать в текущей директории

- Компонент по готовому шаблону `yarn component NAME`
- Шаблон redux slice-a по команде `yarn component NAME --type=redux`

# Git workflow

- Для того чтобы вносить изменения в проект, необходимо создать отдельную ветку из `master`.
- Имя ветки должно соответствовать формату `feat-name` или `fix-name`, где name - это краткое описание задачи.
- Перед созданием Pull Request необходимо разрешить конфликты с `master`.
  1. переходим на ветку `master`
  2. выполняем команду `git pull`
  3. возвращаемся на свою рабочую ветку с таской
  4. выполняем команду `git merge develop`
  5. если есть конфликты, решаем их
- Далее необходимо создать pull request в ветку `develop`.
  - В pull request необходимо добавить описание задачи.
  - В pull request можно добавить дополнительную информацию, которая будет полезна при ревью.
- Для мержа pull request необходимо получить аппрув.

# Кодстайл

## Импорты

(можно описать это в правилах линтера и преттиера, пока оставлю это текстом здесь)

Очередность импортов:

1. Сначала импортируются внешние зависимости, например, `import { useState } from 'react'`
2. Затем импортируются внутренние зависимости, например, `import { Button } from '@/components'`
3. Затем импортируются типы, например, `import type { IFormFields } from '@/components/Form/types'`, допускается запись `import { type IFormFields } from '@/components/Form/types'`
4. Затем импортируются стили, например, `import styles from './Button.module.scss'`

Каждую группу импортов разделяем пустой строкой.
Также желательно разделять импорты компонентов и прочих внутренних зависимостей пустой строкой.

## Реимпорты

Собирать все импорты в одном месте и экспортировать их из одного файла. Например, в `src/components/index.ts`:

```typescript
export * from './Button';
export * from './Input';
export * from './Modal';
```

Это позволяет избежать дублирования импортов и упрощает рефакторинг.

## Нейминг

### Файлы

- Имена файлов компонентов должны быть в `PascalCase`, например, `Button.tsx`.
- Исключение - когда компонент единственный в папке, например, `Button/index.tsx`.

### Стили

- Имена файлов стилей должны соответствовать имени файла компонента, например, `Button.module.scss`.
- Импортировать стили следует как `styles`. Например, `import styles from './Button.module.scss'`.
- Имена импортируемых стилей через `styles` должны быть написаны в `snake_case`. Например, `styles.button_default`.
- Имена переменных и функций в .scss файлах должны быть написаны в `kebab-case`. Например, `$color-default`.

### Переменные, функции

- Имена переменных и функций должны быть написаны в `camelCase`. Например, `const myVariable = 42`.

### Префиксы

- Имена интерфейсов должны начинаться с `I`, например, `interface IMyInterface`.
- Имена типов должны начинаться с `T`, например, `type TMyType`.
- Имена перечислений должны начинаться с `E`, например, `enum EMyEnum`.
- Имена булевых переменных должны начинаться с `is`, `has`, `should`, например, `const isModalOpen = true`.
