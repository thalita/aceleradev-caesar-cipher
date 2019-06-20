var fs = require('fs');

class Filehandler {
    readFile() {

        return new Promise((resolve, reject) => {
            fs.readFile('answer.json', 'utf8', (err, data) => {
                if (err) reject(err)
                else resolve(data);
            })
        })
    }
    
    rewriteFile(text) {
        return new Promise((resolve, reject) => {
            fs.writeFile('answer.json', text, error => {
                if (error) reject(error);
                resolve("file rewrited Successfully");
            });
        });
    }
}

module.exports = Filehandler;