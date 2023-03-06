import { Input, Button, Space, Typography, Form, Select, Modal } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import styles from './ModalAddPatient.module.scss';
const { Title, Text } = Typography;

const options_sport = [
  { value: 'авиамодельный спорт', label: 'Авиамодельный спорт' },
  { value: 'автомобильный спорт', label: 'Автомобильный спорт' },
  { value: 'айкидо', label: 'Айкидо' },
  { value: 'акробатический рок-н-ролл', label: 'Акробатический рок-н-ролл' },
  { value: 'альпинизм', label: 'Альпинизм' },
  { value: 'американский футбол', label: 'Американский футбол' },
  { value: 'армрестлинг', label: 'Армрестлинг' },
  { value: 'бадминтон', label: 'Бадминтон' },
  { value: 'баскетбол', label: 'Баскетбол' },
  { value: 'бейсбол', label: 'Бейсбол' },
  { value: 'биатлон', label: 'Биатлон' },
  { value: 'бильярдный спорт', label: 'Бильярдный спорт' },
  { value: 'бобслей', label: 'Бобслей' },
  { value: 'бодибилдинг', label: 'Бодибилдинг' },
  { value: 'бокс', label: 'Бокс' },
  { value: 'борьба на поясах', label: 'Борьба на поясах' },
  { value: 'боулинг', label: 'Боулинг' },
  { value: 'велосипедный спорт', label: 'Велосипедный спорт' },
  { value: 'вертолетный спорт', label: 'Вертолетный спорт' },
  { value: 'водно-моторный спорт', label: 'Водно-моторный спорт' },
  { value: 'водное поло', label: 'Водное поло' },
  { value: 'воднолыжный спорт', label: 'Воднолыжный спорт' },
  { value: 'воздухоплавательный спорт', label: 'Воздухоплавательный спорт' },
  { value: 'воздушно-силовая атлетика', label: 'Воздушно-силовая атлетика' },
  { value: 'волейбол', label: 'Волейбол' },
  { value: 'восточное боевое единоборство', label: 'Восточное боевое единоборство' },
  { value: 'всестилевое каратэ', label: 'Всестилевое каратэ' },
  { value: 'гандбол', label: 'Гандбол' },
  { value: 'гиревой спорт', label: 'Гиревой спорт' },
  { value: 'го', label: 'Го' },
  { value: 'гольф', label: 'Гольф' },
  { value: 'гонки с препятствиями', label: 'Гонки с препятствиями' },
  { value: 'горнолыжный спорт', label: 'Горнолыжный спорт' },
  { value: 'городошный спорт', label: 'Городошный спорт' },
  { value: 'гребля на байдарках и каноэ', label: 'Гребля на байдарках и каноэ' },
  { value: 'гребной слалом', label: 'Гребной слалом' },
  { value: 'гребной спорт', label: 'Гребной спорт' },
  { value: 'дартс', label: 'Дартс' },
  { value: 'джиу-джитсу', label: 'Джиу-джитсу' },
  { value: 'дзюдо', label: 'Дзюдо' },
  { value: 'ездовой спорт', label: 'Ездовой спорт' },
  { value: 'каратэ', label: 'Каратэ' },
  { value: 'кендо', label: 'Кендо' },
  { value: 'кёрлинг', label: 'Кёрлинг' },
  { value: 'кикбоксинг', label: 'Кикбоксинг' },
  { value: 'кинологический спорт', label: 'Кинологический спорт' },
  { value: 'киокусинкай', label: 'Киокусинкай' },
  { value: 'киокушин', label: 'Киокушин' },
  { value: 'компьютерный спорт', label: 'Компьютерный спорт' },
  { value: 'конный спорт', label: 'Конный спорт' },
  { value: 'конькобежный спорт', label: 'Конькобежный спорт' },
  { value: 'корэш', label: 'Корэш' },
  { value: 'кудо', label: 'Кудо' },
  { value: 'лапта', label: 'Лапта' },
  { value: 'легкая атлетика', label: 'Легкая атлетика' },
  { value: 'лыжное двоеборье', label: 'Лыжное двоеборье' },
  { value: 'лыжные гонки', label: 'Лыжные гонки' },
  { value: 'морское многоборье', label: 'Морское многоборье' },
  { value: 'мотоциклетный спорт', label: 'Мотоциклетный спорт' },
  { value: 'муайтай', label: 'Муайтай' },
  { value: 'настольный теннис', label: 'Настольный теннис' },
  { value: 'парашютный спорт', label: 'Парашютный спорт' },
  { value: 'парусный спорт', label: 'Парусный спорт' },
  { value: 'пауэрлифтинг', label: 'Пауэрлифтинг' },
  { value: 'перетягивание каната', label: 'Перетягивание каната' },
  { value: 'пилонный спорт', label: 'Пилонный спорт' },
  { value: 'плавание', label: 'Плавание' },
  { value: 'планерный спорт', label: 'Планерный спорт' },
  { value: 'подводный спорт', label: 'Подводный спорт' },
  { value: 'полиатлон', label: 'Полиатлон' },
  { value: 'практическая стрельба', label: 'Практическая стрельба' },
  { value: 'прыжки в воду', label: 'Прыжки в воду' },
  { value: 'прыжки на батуте', label: 'Прыжки на батуте' },
  { value: 'прыжки на лыжах с трамплина', label: 'Прыжки на лыжах с трамплина' },
  { value: 'пулевая стрельба', label: 'Пулевая стрельба' },
  { value: 'пэйнтбол', label: 'Пэйнтбол' },
  { value: 'радиоспорт', label: 'Радиоспорт' },
  { value: 'рафтинг', label: 'Рафтинг' },
  { value: 'регби', label: 'Регби' },
  { value: 'роллер спорт', label: 'Роллер спорт' },
  { value: 'роуп скиппинг (спортивная скакалка)', label: 'Роуп скиппинг (спортивная скакалка)' },
  { value: 'рукопашный бой', label: 'Рукопашный бой' },
  { value: 'рыболовный спорт', label: 'Рыболовный спорт' },
  { value: 'сават', label: 'Сават' },
  { value: 'самбо', label: 'Самбо' },
  { value: 'самолетный спорт', label: 'Самолетный спорт' },
  { value: 'санный спорт', label: 'Санный спорт' },
  { value: 'северное многоборье', label: 'Северное многоборье' },
  { value: 'серфинг', label: 'Серфинг' },
  { value: 'синхронное плавание', label: 'Синхронное плавание' },
  { value: 'скалолазание', label: 'Скалолазание' },
  { value: 'сквош', label: 'Сквош' },
  { value: 'скейтбординг', label: 'Скейтбординг' },
  { value: 'смешанное боевое единоборство (мма)', label: 'Смешанное боевое единоборство (ММА)' },
  { value: 'сноуборд', label: 'Сноуборд' },
  { value: 'современное пятиборье', label: 'Современное пятиборье' },
  { value: 'софтбол', label: 'Софтбол' },
  { value: 'спорт сверхлегкой авиации', label: 'Спорт сверхлегкой авиации' },
  { value: 'спортивная борьба', label: 'Спортивная борьба' },
  { value: 'спортивно-прикладное собаководство', label: 'Спортивно-прикладное собаководство' },
  { value: 'спортивное метание ножа', label: 'Спортивное метание ножа' },
  { value: 'спорт глухих', label: 'Спорт глухих' },
  {
    value: 'спорт лиц с интеллектуальными нарушениями',
    label: 'Спорт лиц с интеллектуальными нарушениями',
  },
  { value: 'спорт лиц с поражением ода', label: 'Спорт лиц с поражением ОДА' },
  { value: 'спорт слепых', label: 'Спорт слепых' },
  { value: 'спортивная акробатика', label: 'Спортивная акробатика' },
  { value: 'спортивная аэробика', label: 'Спортивная аэробика' },
  { value: 'спортивная гимнастика', label: 'Спортивная гимнастика' },
  { value: 'спортивное ориентирование', label: 'Спортивное ориентирование' },
  { value: 'спортивное программирование', label: 'Спортивное программирование' },
  { value: 'спортивный туризм', label: 'Спортивный туризм' },
  { value: 'стендовая стрельба', label: 'Стендовая стрельба' },
  { value: 'страйкбол', label: 'Страйкбол' },
  { value: 'стрельба из арбалета', label: 'Стрельба из арбалета' },
  { value: 'стрельба из лука', label: 'Стрельба из лука' },
  { value: 'судомодельный спорт', label: 'Судомодельный спорт' },
  { value: 'сумо', label: 'Сумо' },
  { value: 'танцевальный спорт', label: 'Танцевальный спорт' },
  { value: 'теннис', label: 'Теннис' },
  { value: 'триатлон', label: 'Триатлон' },
  { value: 'тхэквондо', label: 'Тхэквондо' },
  { value: 'тхэквондо гтф', label: 'Тхэквондо ГТФ' },
  { value: 'тхэквондо итф', label: 'Тхэквондо ИТФ' },
  { value: 'тхэквондо мфт', label: 'Тхэквондо МФТ' },
  { value: 'тяжелая атлетика', label: 'Тяжелая атлетика' },
  { value: 'универсальный бой', label: 'Универсальный бой' },
  { value: 'ушу', label: 'Ушу' },
  { value: 'фехтование', label: 'Фехтование' },
  { value: 'фигурное катание на коньках', label: 'Фигурное катание на коньках' },
  { value: 'фитнес-аэробика', label: 'Фитнес-аэробика' },
  { value: 'флорбол', label: 'Флорбол' },
  { value: 'фристайл', label: 'Фристайл' },
  { value: 'функциональное многоборье', label: 'Функциональное многоборье' },
  { value: 'футбол', label: 'Футбол' },
  { value: 'футбол лиц с заболеванием цп', label: 'Футбол лиц с заболеванием ЦП' },
  { value: 'хоккей', label: 'Хоккей' },
  { value: 'хоккей на траве', label: 'Хоккей на траве' },
  { value: 'хоккей с мячом', label: 'Хоккей с мячом' },
  { value: 'художественная гимнастика', label: 'Художественная гимнастика' },
  { value: 'чир спорт', label: 'Чир спорт' },
  { value: 'шахматы', label: 'Шахматы' },
  { value: 'шашки', label: 'Шашки' },
  { value: 'эстетическая гимнастика', label: 'Эстетическая гимнастика' },
];

interface IModalAddPatientProps {
  isModalOpen: boolean;
  handleOk: (values: any) => void;
  handleCancel: () => void;
}
export const ModalAddPatient: React.FC<IModalAddPatientProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
}) => {
  const onFinish = (values: any) => {
    handleOk(values);
  };
  return (
    <Modal
      width="600px"
      title="Добавить пациента"
      open={isModalOpen}
      footer={null}
      onCancel={handleCancel}>
      <Form
        name="basic"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        onFinishFailed={(values) => {
          console.log({ values });
        }}>
        <Form.Item label="ФИО" name="name" rules={[{ required: true, message: 'Заполните имя' }]}>
          <Space direction="vertical">
            <Input style={{ width: 298 }} placeholder="Иван Иванов Иванович" />
          </Space>
        </Form.Item>

        <Form.Item
          name="sex"
          label="Пол"
          rules={[{ message: 'Заполните образование', required: true }]}>
          <Select
            placeholder="пол"
            style={{ width: 120 }}
            options={[
              { value: 'женский', label: 'Женский' },
              { value: 'мужской', label: 'Мужской' },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="date_day"
          label="День рождения"
          rules={[{ message: 'Заполните дату рождения', required: true }]}>
          {/* <DatePicker style={{ width: 180 }} /> */}
          <Select style={{ width: 120 }} showSearch placeholder="день" optionFilterProp="children">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
          </Select>
        </Form.Item>

        <Form.Item
          name="date_month"
          label="Месяц рождения"
          rules={[{ message: 'Заполните дату рождения', required: true }]}>
          {/* <DatePicker style={{ width: 180 }} /> */}
          <Select
            style={{ width: 120 }}
            showSearch
            placeholder="месяц"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={[
              { value: '1', label: '1' },
              { value: '2', label: '2' },
              { value: '3', label: '3' },
              { value: '4', label: '4' },
              { value: '5', label: '5' },
              { value: '6', label: '6' },
              { value: '7', label: '7' },
              { value: '8', label: '8' },
              { value: '9', label: '9' },
              { value: '10', label: '10' },
              { value: '11', label: '11' },
              { value: '12', label: '12' },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="date_year"
          label="Год рождения"
          rules={[{ message: 'Заполните дату рождения', required: true }]}>
          <Select showSearch style={{ width: 120 }} placeholder="год">
            <option value="1940">1940</option>
            <option value="1941">1941</option>
            <option value="1942">1942</option>
            <option value="1943">1943</option>
            <option value="1944">1944</option>
            <option value="1945">1945</option>
            <option value="1946">1946</option>
            <option value="1947">1947</option>
            <option value="1948">1948</option>
            <option value="1949">1949</option>
            <option value="1950">1950</option>
            <option value="1951">1951</option>
            <option value="1952">1952</option>
            <option value="1953">1953</option>
            <option value="1954">1954</option>
            <option value="1955">1955</option>
            <option value="1956">1956</option>
            <option value="1957">1957</option>
            <option value="1958">1958</option>
            <option value="1959">1959</option>
            <option value="1960">1960</option>
            <option value="1961">1961</option>
            <option value="1962">1962</option>
            <option value="1963">1963</option>
            <option value="1964">1964</option>
            <option value="1965">1965</option>
            <option value="1966">1966</option>
            <option value="1967">1967</option>
            <option value="1968">1968</option>
            <option value="1969">1969</option>
            <option value="1970">1970</option>
            <option value="1971">1971</option>
            <option value="1972">1972</option>
            <option value="1973">1973</option>
            <option value="1974">1974</option>
            <option value="1975">1975</option>
            <option value="1976">1976</option>
            <option value="1977">1977</option>
            <option value="1978">1978</option>
            <option value="1979">1979</option>
            <option value="1980">1980</option>
            <option value="1981">1981</option>
            <option value="1982">1982</option>
            <option value="1983">1983</option>
            <option value="1984">1984</option>
            <option value="1985">1985</option>
            <option value="1986">1986</option>
            <option value="1987">1987</option>
            <option value="1988">1988</option>
            <option value="1989">1989</option>
            <option value="1990">1990</option>
            <option value="1991">1991</option>
            <option value="1992">1992</option>
            <option value="1993">1993</option>
            <option value="1994">1994</option>
            <option value="1995">1995</option>
            <option value="1996">1996</option>
            <option value="1997">1997</option>
            <option value="1998">1998</option>
            <option value="1999">1999</option>
            <option value="2000">2000</option>
            <option value="2001">2001</option>
            <option value="2002">2002</option>
            <option value="2003">2003</option>
            <option value="2004">2004</option>
            <option value="2005">2005</option>
            <option value="2006">2006</option>
            <option value="2007">2007</option>
            <option value="2008">2008</option>
            <option value="2009">2009</option>
            <option value="2010">2010</option>
            <option value="2011">2011</option>
            <option value="2012">2012</option>
            <option value="2013">2013</option>
            <option value="2014">2014</option>
            <option value="2015">2015</option>
            <option value="2016">2016</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </Select>
        </Form.Item>

        <Form.Item
          name="education"
          label="Образование"
          rules={[{ message: 'Заполните образование', required: true }]}>
          <Select
            style={{ width: 298 }}
            placeholder="Заполните образование"
            options={[
              { value: 'общее', label: 'Общее' },
              { value: 'среднее профессиональное', label: 'Среднее профессиональное' },
              { value: 'высшее', label: 'Высшее' },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="sport"
          label="Вид спорта"
          rules={[{ message: 'Заполните вид спорта', required: true }]}>
          <Select
            style={{ width: 298 }}
            showSearch
            placeholder="Выберите вид спорта"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={options_sport}
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Почта"
          rules={[
            { required: true, message: 'Заполните почту' },
            { type: 'email', message: 'Некорректная почта' },
          ]}
          hasFeedback>
          <Space direction="vertical">
            <Input style={{ width: 298 }} placeholder="davidvilcao@gmail.com" />
          </Space>
        </Form.Item>

        <Form.Item
          name="phone"
          label="Телефон"
          rules={[
            { required: true, message: 'Заполните телефон' },
            { pattern: new RegExp(/^[0-9]+$/) },
          ]}>
          <Space wrap>
            <Input placeholder="79221110500" />
          </Space>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form>
    </Modal>
  );
};
