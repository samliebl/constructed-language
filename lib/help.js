export function displayHelp() {
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
    `);
}
