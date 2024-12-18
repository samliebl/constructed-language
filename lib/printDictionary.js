import { dictionary } from '../data/dictionary.js';
import fs from 'fs';
import path from 'path';

// Define the output directory and file paths
const outputDir = './contents';
const outputFilePath = path.join(outputDir, 'sorted_dictionary.txt');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Sort the dictionary alphabetically by the English word
const sortedDictionary = dictionary.sort((a, b) => a.english.localeCompare(b.english));

// Format the sorted dictionary as plain text
const formattedText = sortedDictionary
    .map(entry => `${entry.english}: ${entry.tera}`)
    .join('\n');

// Write the formatted text to a file
fs.writeFileSync(outputFilePath, formattedText, 'utf8');

console.log(`Alphabetized dictionary has been saved to ${outputFilePath}`);
