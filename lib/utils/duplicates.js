export function findDuplicates(dictionary, language = 'english', listLimit = 10) {
    const duplicates = new Map();

    dictionary.forEach(entry => {
        const key = entry[language];
        const value = entry[language === 'english' ? 'tera' : 'english'];

        if (!duplicates.has(key)) {
            duplicates.set(key, []);
        }
        duplicates.get(key).push(value);
    });

    return Array.from(duplicates.entries())
        .filter(([key, values]) => values.length > 1)
        .map(([key, values]) => ({
            key,
            count: values.length,
            values: values.slice(0, listLimit),
            truncated: values.length > listLimit
        }));
}
