#!/usr/bin/env node

import { displayHelp } from '../lib/help.js';
import { addWordPair } from '../lib/add.js';
import { countEntries } from '../lib/count.js';
import { checkDuplicates } from '../lib/cdup.js';
import { exportDictionary } from '../lib/export.js';
import { translateText } from '../lib/translate.js';
import { dictionary } from '../data/dictionary.js';

// Command-line arguments
const args = process.argv.slice(2);

if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    displayHelp();
    process.exit(0);
}

const command = args[0];

switch (command) {
    case 'add':
        addWordPair(dictionary);
        break;
    case 'count':
        countEntries(dictionary);
        break;
    case 'cdup':
        checkDuplicates(dictionary, args.slice(1));
        break;
    case 'print':
        exportDictionary(dictionary, args.slice(1));
        break;
    default:
        translateText(dictionary, args);
        break;
}
