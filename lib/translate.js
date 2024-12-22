export function translateText(dictionary, args) {
    const text = args.join(' '); // Combine all arguments into a single string
    const words = text.split(' '); // Split the text into an array of words

    const { translatedWords, missingWords } = translate(words, dictionary);

    // Output the translated words
    console.log(translatedWords.join(' '));

    // Alert if there are any missing words
    if (missingWords.length > 0) {
        console.log(`No translation for ${missingWords.join(', ')}.`);
    }
}

/**
 * Translates an array of words between English and Tera.
 * @param {string[]} words - Array of words to translate.
 * @param {Object[]} dictionary - The dictionary array with English-Tera mappings.
 * @returns {Object} - Contains translatedWords and missingWords.
 */
function translate(words, dictionary) {
    const translatedWords = words.map(word => {
        const entry = dictionary.find(item => item.english === word || item.tera === word);
        return entry ? (entry.english === word ? entry.tera : entry.english) : null;
    });

    const missingWords = translatedWords
        .map((word, index) => (word === null ? words[index] : null))
        .filter(Boolean);

    return {
        translatedWords: translatedWords.filter(word => word !== null),
        missingWords
    };
}
