// Функция для преобразования вложенного JSON в плоскую структуру
function parseNestedJSON(obj, prefix = '') {
  let result = {};
  for (let key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
          if (Array.isArray(obj[key])) {
              // Обработка массивов
              obj[key].forEach((item, index) => {
                  Object.assign(result, parseNestedJSON(item, `${prefix}${key}.${index}.`));
              });
          } else {
              // Обработка вложенных объектов
              Object.assign(result, parseNestedJSON(obj[key], `${prefix}${key}.`));
          }
      } else {
          // Добавляем значение в результат
          result[`${prefix}${key}`] = obj[key];
      }
  }
  return result;
}


// Экспорт функции для использования в других модулях
export { parseNestedJSON };