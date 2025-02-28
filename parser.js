// Функция для преобразования вложенного JSON в плоскую структуру
// защита от циклических ссылок с использованием WeakSet
function parseNestedJSON(obj, prefix = '', visited = new WeakSet()) {
    console.log(`parseNestedJSON: Начало обработки объекта с префиксом "${prefix}"`, obj);
    let result = {};
    if (obj && typeof obj === 'object') {
      if (visited.has(obj)) {
        console.warn(`parseNestedJSON: Обнаружена циклическая ссылка с префиксом "${prefix}"`);
        return result; // предотвращение бесконечной рекурсии
      }
      visited.add(obj);
    }
    
    for (let key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        if (obj[key] && typeof obj[key] === 'object') {
          if (Array.isArray(obj[key])) {
            // Обработка массивов: для каждого элемента вызываем рекурсивно
            obj[key].forEach((item, index) => {
              console.log(`parseNestedJSON: Обработка массива "${prefix + key}" на индексе ${index}`);
              Object.assign(result, parseNestedJSON(item, `${prefix}${key}.${index}.`, visited));
            });
          } else {
            // Обработка вложенных объектов
            console.log(`parseNestedJSON: Рекурсивный вызов для объекта "${prefix + key}"`);
            Object.assign(result, parseNestedJSON(obj[key], `${prefix}${key}.`, visited));
          }
        } else {
          // Добавляем примитивное значение с полным путём к ключу
          result[`${prefix}${key}`] = obj[key];
          console.log(`parseNestedJSON: Установлен ключ "${prefix + key}" со значением:`, obj[key]);
        }
      }
    }
    return result;
  }
  
  export { parseNestedJSON };
  