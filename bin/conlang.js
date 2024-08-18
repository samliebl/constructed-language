#!/usr/bin/env node

import { translate } from '../lib/dictionary.js';

// Get the command-line arguments, excluding the first two (node and script path)
const args = process.argv.slice(2);

if (args.length === 0) {
    console.log('Please provide words to translate.');
    process.exit(1);
}

// Perform the translation
const { translatedWords, missingWords } = translate(args);

// Output the translated words
console.log(translatedWords.join(' '));

// Alert if there are any missing words
if (missingWords.length > 0) {
    console.log(`No translation for ${missingWords.join(', ')}.`);
}
