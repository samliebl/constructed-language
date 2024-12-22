import { findDuplicates } from './utils/duplicates.js';

export function checkDuplicates(dictionary, args) {
    const word = args[0];
    const listOption = args.includes('-l') || args.includes('--list');
    const language = args.includes('-t') || args.includes('--tera') ? 'tera' : 'english';

    if (!word) {
        console.error('Please provide a word to check.');
        process.exit(1);
    }

    const duplicates = findDuplicates(dictionary, language).filter(dup => dup.key === word);

    if (duplicates.length === 0) {
        console.log(`No duplicates found for "${word}" in ${language}.`);
    } else {
        duplicates.forEach(dup => {
            console.log(`There are ${dup.count} duplicates found for "${dup.key}" in ${language}.`);
            if (listOption) {
                console.log('Listing up to 10 duplicates:');
                dup.values.forEach((val, index) => {
                    console.log(`${index + 1}: ${val}`);
                });
                if (dup.truncated) {
                    console.log('...');
                }
            }
        });
    }
}
