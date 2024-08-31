import fs from 'fs';

// randomStringGenerator.js
export function generateRandomString(minLength, maxLength) {
    if (minLength > maxLength) {
        throw new Error("minLength must be less than or equal to maxLength");
    }
    let characters = `\
        aaaaaaa\
        eeeeee\
        ooooo\
        uuuu\
        iii\
        yy\
        bcdefghijklmnopqrstuvwxyz\
        `;
    characters = characters.replace(/\s+/g, ''); // Remove all whitespace characters

    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters.charAt(randomIndex);
    }

    return result;
}

export function generateMultipleRandomStrings(minLength, maxLength, count) {
    const results = [];
    
    for (let i = 0; i < count; i++) {
        results.push(generateRandomString(minLength, maxLength));
    }

    return results;
}

// Function to write the strings to a plain text file
export function writeStringsToFile(strings, filePath) {
    const fileContent = strings.join('\n');
    fs.writeFileSync(filePath, fileContent, 'utf8');
}
