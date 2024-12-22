import fs from 'fs';

export function exportDictionary(dictionary, args) {
    const filePath = args[0];
    const format = args.includes('--json') || args.includes('-j') ? 'json' :
                   args.includes('--csv') || args.includes('-c') ? 'csv' :
                   'text'; // Default to plain text

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
