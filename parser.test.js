const { parseNestedJSON } = require('./parser');  // Импортируем из parser.js

describe('parseNestedJSON', () => {
    test('Преобразует вложенный объект в плоскую структуру', () => {
        const input = {
            a: {
                b: {
                    c: 42,
                },
                d: [1, 2],
            },
        };

        const output = {
            'a.b.c': 42,
            'a.d.0': 1,
            'a.d.1': 2,
        };

        expect(parseNestedJSON(input)).toEqual(output);
    });
});
