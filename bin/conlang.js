#!/usr/bin/env node

import { translate } from '../lib/translate.js';
import fs from 'fs';
import readline from 'readline';

// Corrected path to the dictionary
const dictionaryPath = './data/dictionary.js'; // Path is relative to the project root

const dictionary = await import('../data/dictionary.js').then(module => module.dictionary);
// Get the command-line arguments, excluding the first two (node and script path)
const args = process.argv.slice(2);

// Function to check for duplicates
function findDuplicate(entry, key) {
    return dictionary.find(item => item[key] === entry);
}

// Function to add a new word pair to the dictionary
function addWordPair() {
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
            const duplicate = findDuplicate(fromWord, fromKey);

            if (duplicate) {
                rl.question(`"${fromWord}" is already in the dictionary as "${duplicate[toKey]}". Would you like to add it again? [yN]\n`, (response) => {
                    if (response.toLowerCase() === 'y') {
                        rl.question(`Translation in ${toLang}: \n$ `, (toWord) => {
                            dictionary.push({ [fromKey]: fromWord, [toKey]: toWord });
                            console.log(`"${fromWord}" has been added to the dictionary as "${toWord}".`);
                            saveDictionary();
                            rl.close();
                        });
                    } else {
                        console.log(`"${fromWord}" was not added again.`);
                        rl.close();
                    }
                });
            } else {
                rl.question(`Translation in ${toLang}: \n$ `, (toWord) => {
                    dictionary.push({ [fromKey]: fromWord, [toKey]: toWord });
                    console.log(`"${fromWord}" has been added to the dictionary as "${toWord}".`);
                    saveDictionary();
                    rl.close();
                });
            }
        });
    });
}

// Function to save the updated dictionary
function saveDictionary() {
    const updatedDictionary = `export const dictionary = ${JSON.stringify(dictionary, null, 4)};`;
    fs.writeFileSync(dictionaryPath, updatedDictionary, 'utf-8');
}

// Main logic to handle different commands
if (args.length === 0) {
    console.log('Please provide a command or words to translate.');
    process.exit(1);
}

const command = args[0];

if (command === 'add') {
    addWordPair();
} else {
    // Assume it's a translation request if the command isn't 'add'
    const { translatedWords, missingWords } = translate(args);

    // Output the translated words
    console.log(translatedWords.join(' '));

    // Alert if there are any missing words
    if (missingWords.length > 0) {
        console.log(`No translation for ${missingWords.join(', ')}.`);
    }
}