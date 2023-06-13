import RU from 'antd/locale/ru_RU';

import type { ConfigProviderProps } from 'antd/es/config-provider';

export const configProviderProps: ConfigProviderProps = {
  locale: RU,
  theme: {
    token: {
      fontSize: 16,
      colorPrimary: '#2F54EB',
    },
  },
};
