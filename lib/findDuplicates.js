import { writeFileSync } from 'fs';
import { createRequire } from 'module';
import { dictionary } from '../data/dictionary.js';

const require = createRequire(import.meta.url);

// Function to find and print duplicates
function findDuplicates(dictionary) {
    const duplicates = new Map();

    // Iterate through the dictionary to find duplicates
    dictionary.forEach(entry => {
        const { english, tera } = entry;
        if (!duplicates.has(english)) {
            duplicates.set(english, []);
        }
        duplicates.get(english).push(tera);
    });

    // Prepare the content to be written to the file
    let fileContent = '';

    // Populate file content with duplicates
    for (const [english, teraValues] of duplicates.entries()) {
        if (teraValues.length > 1) {
            teraValues.forEach(tera => {
                fileContent += `${english}\t${tera}\n`;
            });
        }
    }

    try {
        // Write the content to the ../_test/duplicates.txt file
        const filePath = '_test/duplicates.txt';
        writeFileSync(filePath, fileContent, 'utf8');
        console.log(`Successfully wrote file ${filePath}`);
    } catch (error) {
        console.error('Error writing file:', error);
    }
}

// Call the function
findDuplicates(dictionary);
