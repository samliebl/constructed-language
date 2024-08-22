// Importing the wordlist-english module
import wordlist from 'wordlist-english';
import { wordArray } from './../_test/wordArray.js';

// Select the word list you want to use (e.g., entire English word list)
const words = wordlist['english'];

// Function to get a random word based on string length
function getRandomWordBasedOnLength(input) {
    const length = input.length;
    let filteredWords = [];

    if (length >= 0 && length <= 2) {
        filteredWords = words.filter(word => word.length >= 1 && word.length <= 3);
    } else if (length >= 3 && length <= 5) {
        filteredWords = words.filter(word => word.length >= 4 && word.length <= 7);
    } else if (length >= 6 && length <= 10) {
        filteredWords = words.filter(word => word.length >= 8 && word.length <= 10);
    } else if (length >= 11) {
        filteredWords = words.filter(word => word.length > 10);
    }

    // Return a random word from the filtered list
    const randomIndex = Math.floor(Math.random() * filteredWords.length);
    return filteredWords[randomIndex];
}

// Function to process an array of strings
export function getWordsForArray(stringArray) {
    return stringArray.map(input => getRandomWordBasedOnLength(input));
}

// Example usage with an array of strings:
const result = getWordsForArray(wordArray);

console.log(result);