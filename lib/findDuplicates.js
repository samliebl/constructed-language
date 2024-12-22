import { dictionary } from '../data/dictionary.js';

export function findDuplicates(dictionary, language = 'english', listLimit = 10) {
    const duplicates = new Map();

    // Iterate through the dictionary to find duplicates
    dictionary.forEach(entry => {
        const key = entry[language];
        const value = entry[language === 'english' ? 'tera' : 'english'];

        if (!duplicates.has(key)) {
            duplicates.set(key, []);
        }
        duplicates.get(key).push(value);
    });

    const duplicateEntries = Array.from(duplicates.entries()).filter(([key, values]) => values.length > 1);

    return duplicateEntries.map(([key, values]) => ({
        key,
        count: values.length,
        values: values.slice(0, listLimit), // Limit the list for display
        truncated: values.length > listLimit // Indicate truncation
    }));
}
