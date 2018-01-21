const {
    exec
} = require('child_process');
const fs = require('fs');
const Baby = require('babyparse')

if (!fs.existsSync('audio')) {
    fs.mkdirSync('audio');
}
const dictionary = {}
for (let i = 1; i <= 4; i++) {
    const words = [];
    dictionary[`${i}char`] = words;

    const parsed = Baby.parseFiles(`${i}ch.csv`);
    for (const row of parsed.data) {
        const word = row[1];
        const pinyin = row[2];
        exec(`say -o audio/${word}.m4a --file-format m4af ${word}`,
            (error, stdout, stderr) => {
                if (error) {
                    console.log(`${word} ${pinyin}: ${error}`);
                    return;
                }
                // console.log(`stdout: ${stdout}`);
                // console.log(`stderr: ${stderr}`);
            });
        words.push({
            word,
            pinyin
        });
    }
}
const outputFilename = 'words.json'
fs.writeFile(outputFilename, JSON.stringify(dictionary, null, 4), (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("JSON saved to " + outputFilename);
    }
});