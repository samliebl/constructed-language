#!/usr/bin/env node

import { translate } from '../lib/translate.js';
import fs from 'fs';
import readline from 'readline';
import { findDuplicates } from '../lib/findDuplicates.js';
import { dictionary } from '../data/dictionary.js';

// Path to the dictionary file
const dictionaryPath = './data/dictionary.js';

// Command-line arguments
const args = process.argv.slice(2);

// Display help information
function displayHelp() {
    console.log(`
Usage: conlang [command] [arguments]

Commands:
  --help, -h                Display this help message and exit.
  add                       Launch an interactive mode to add new word pairs to the dictionary.
  translate <words>         Translate the specified words from English to Tera or vice versa.
  cdup <word>               Check if a word has duplicates in the dictionary.
                            Use -t or --tera to search in Tera. Add -l or --list to list duplicates.
  print <file path>         Print the dictionary to the specified file path.
                            Use --json (-j), --csv (-c), or --text (-t) to specify format.
                            Defaults to plain text if no format is provided.
  count                     Display the total number of entries in the dictionary.

Examples:
  conlang --help
    Displays this help message.

  conlang translate "hello world"
    Translates "hello world" to Tera using the dictionary.

  conlang add
    Launches an interactive session to add new word pairs to the dictionary.
    Duplicate entries will be flagged, and you can choose to overwrite or add anyway.

  conlang cdup "hope" -l
    Checks if the word "hope" has duplicates and lists them.

  conlang print ./output.txt --json
    Prints the dictionary to ./output.txt in JSON format.

  conlang count
    Displays the total number of entries in the dictionary.

Description:
  conlang is a CLI tool designed to work with a constructed language (Tera). 
  It supports translation, adding words, and managing dictionary entries.
  All changes to the dictionary are saved persistently.
    `);
}

// Function to save the updated dictionary
function saveDictionary() {
    const updatedDictionary = `export const dictionary = ${JSON.stringify(dictionary, null, 4)};`;
    fs.writeFileSync(dictionaryPath, updatedDictionary, 'utf-8');
}

// Function to export the dictionary
function exportDictionary(filePath, format = 'text') {
    if (!filePath) {
        console.error('Error: File path must be specified.');
        process.exit(1);
    }

    let output;
    switch (format) {
        case 'json':
            output = JSON.stringify(dictionary, null, 2);
            break;
        case 'csv':
            output = dictionary.map(entry => `${entry.english},${entry.tera}`).join('\n');
            break;
        case 'text':
            output = dictionary.map(entry => `${entry.english}: ${entry.tera}`).join('\n');
            break;
        default:
            console.error('Error: Unsupported format. Use --json, --csv, or --text.');
            process.exit(1);
    }

    try {
        fs.writeFileSync(filePath, output, 'utf8');
        console.log(`Dictionary successfully exported to ${filePath} in ${format.toUpperCase()} format.`);
    } catch (error) {
        console.error(`Error writing to file: ${error.message}`);
        process.exit(1);
    }
}

// Main logic to handle different commands
if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    displayHelp();
    process.exit(0);
}

const command = args[0];

if (command === 'count') {
    console.log(`The dictionary contains ${dictionary.length} entries.`);
} else if (command === 'print') {
    const filePath = args[1];
    const format = args.includes('--json') || args.includes('-j') ? 'json' :
                   args.includes('--csv') || args.includes('-c') ? 'csv' :
                   'text'; // Default to plain text
    exportDictionary(filePath, format);
} else if (command === 'cdup') {
    const word = args[1];
    const listOption = args.includes('-l') || args.includes('--list');
    const language = args.includes('-t') || args.includes('--tera') ? 'tera' : 'english';

    if (!word) {
        console.error('Please provide a word to check.');
        process.exit(1);
    }

    // Use the enhanced findDuplicates function
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
} else if (command === 'add') {
    addWordPair();
} else {
    const text = args.join(' ');
    const words = text.split(' '); // Ensure input is an array of words
    const { translatedWords, missingWords } = translate(words);

    // Output the translated words
    console.log(translatedWords.join(' '));

    // Alert if there are any missing words
    if (missingWords.length > 0) {
        console.log(`No translation for ${missingWords.join(', ')}.`);
    }
}
