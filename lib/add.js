import readline from 'readline';
import { saveDictionary } from './utils/save.js';

export function addWordPair(dictionary) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Choose an option: \n(1) English -> Tera\n(2) Tera -> English\n', (option) => {
        if (option !== '1' && option !== '2') {
            console.log('Invalid option. Please enter 1 or 2.');
            rl.close();
            return;
        }

        const fromLang = option === '1' ? 'English' : 'Tera';
        const toLang = option === '1' ? 'Tera' : 'English';
        const fromKey = option === '1' ? 'english' : 'tera';
        const toKey = option === '1' ? 'tera' : 'english';

        rl.question(`Word in ${fromLang}: \n$ `, (fromWord) => {
            rl.question(`Translation in ${toLang}: \n$ `, (toWord) => {
                dictionary.push({ [fromKey]: fromWord, [toKey]: toWord });
                console.log(`"${fromWord}" has been added to the dictionary as "${toWord}".`);
                saveDictionary(dictionary);
                rl.close();
            });
        });
    });
}
