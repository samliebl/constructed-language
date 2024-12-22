import fs from 'fs';

export function saveDictionary(dictionary) {
    const updatedDictionary = `export const dictionary = ${JSON.stringify(dictionary, null, 4)};`;
    fs.writeFileSync('./data/dictionary.js', updatedDictionary, 'utf-8');
}
