import { parseNestedJSON } from './parser.js';

// Асинхронная функция для загрузки данных с API
async function fetchUsers() {
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error');
  
  console.log('fetchUsers: Начало загрузки данных с API');
  // Показываем индикатор загрузки
  loadingEl.style.display = 'block';
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    console.log('fetchUsers: Получен ответ от сервера', response);
    
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: статус ${response.status}`);
    }
    
    const users = await response.json();
    console.log('fetchUsers: Данные успешно получены', users);
    
    // функция с parseNestedJSON преобразует каждого пользователя в плоский объект
    const flattenedUsers = users.map(user => {
      const flatUser = parseNestedJSON(user);
      console.log(`fetchUsers: Плоский объект для пользователя ID ${user.id}:`, flatUser);
      return flatUser;
    });
    
    // Вывод плоских данных в консоль для отладки
    console.log('fetchUsers: Плоские данные пользователей:', flattenedUsers);
    
    renderTable(users);
    console.log('fetchUsers: Таблица успешно отрендерена');
  } catch (error) {
    console.error('fetchUsers: Ошибка при загрузке данных:', error);
    errorEl.textContent = `Ошибка при загрузке данных: ${error.message}`;
    errorEl.style.display = 'block';
  } finally {
    // Скрываем индикатор загрузки
    loadingEl.style.display = 'none';
    console.log('fetchUsers: Загрузка завершена');
  }
}

// Функция для создания строки таблицы для одного пользователя
function createTableRow(user) {
  return `
      <tr>
          <td data-label="ID">${user.id}</td>
          <td data-label="Name">${user.name}</td>
          <td data-label="Username">${user.username}</td>
          <td data-label="Email">${user.email}</td>
          <td data-label="Phone">${user.phone}</td>
          <td data-label="Address">${user.address.city}, ${user.address.street}, ${user.address.suite}</td>
      </tr>
  `;
}

// Функция для вставки данных пользователей в HTML-таблицу
function renderTable(users) {
  const tableBody = document.getElementById('usersTable');
  tableBody.innerHTML = users.map(createTableRow).join('');
  console.log('renderTable: Таблица обновлена с данными пользователей');
}

// Загружаем данные после полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded: Документ загружен, запускаем fetchUsers');
  fetchUsers();
});
