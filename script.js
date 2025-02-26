async function fetchUsers() {
  try {
      // Показываем индикатор загрузки
      document.getElementById('loading').style.display = 'block';

      // Делаем GET-запрос к API
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
      // Преобразуем полученные данные в JSON
      const users = await response.json();
      
      // Отправляем данные в функцию для рендеринга таблицы
      renderTable(users);
  } catch (error) {
      // Выводим ошибку в консоль, если что-то пошло не так
      console.error('Ошибка при загрузке данных:', error);
  } finally {
      // Скрываем индикатор загрузки
      document.getElementById('loading').style.display = 'none';
  }
}

// Функция для создания строки таблицы
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
  const tableBody = document.getElementById('usersTable'); // Получаем элемент таблицы

  // Создаём строки таблицы с данными
  tableBody.innerHTML = users.map(createTableRow).join(''); // Метод join('') убирает запятые между строками
}

// Вызываем функцию для загрузки данных при загрузке страницы
fetchUsers();