import {dictionary} from './../data/dictionary.js';

export function translate(words) {
    const missingWords = [];
    const translatedWords = words.map(word => {
        const translation = dictionary.find(obj => obj.english === word);
        if (translation && translation.tera) {
            return translation.tera;
        } else {
            missingWords.push(word);
            return word;
        }
    });

    return {
        translatedWords,
        missingWords
    };
}

const words = [
    'hello', 'world'
];

const test = translate(words);

console.log(test);