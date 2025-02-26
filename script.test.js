// Импортируем нужные модули
import { renderTable, fetchUsers } from './script';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();  // Включаем мокирование fetch

describe('API и рендеринг таблицы', () => {
  beforeEach(() => {
    fetchMock.resetMocks();  // Сбрасываем моки перед каждым тестом
  });

  test('Загружает данные и рендерит таблицу', async () => {
    const mockUsers = [
      { id: 1, name: 'Leanne', username: 'Bret', email: 'leanne@example.com', phone: '123', address: { city: 'City', street: 'Street', suite: 'Suite 1' } },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockUsers));  // Мокаем ответ от API

    document.body.innerHTML = '<table id="usersTable"></table>';  // Добавляем HTML для теста
    await fetchUsers();  // Запускаем функцию для загрузки данных

    const table = document.getElementById('usersTable');
    expect(table.rows.length).toBe(1);  // Проверяем, что таблица заполнилась одной строкой
    expect(table.rows[0].cells[0].textContent).toBe('1');  // Проверяем ID в таблице
    expect(table.rows[0].cells[1].textContent).toBe('Leanne');  // Проверяем Name
  });

  test('Выдает ошибку, если API не доступен', async () => {
    fetchMock.mockRejectOnce(new Error('API error'));  // Мокаем ошибку запроса

    console.error = jest.fn();  // Мокаем консольный вывод ошибок

    await fetchUsers();  // Запускаем запрос

    expect(console.error).toHaveBeenCalledWith('Ошибка при загрузке данных:', new Error('API error'));  // Проверяем, что ошибка была выведена
  });
});
