var cryptoService = require("./services/cryptService");
var fileHandler = require("./handlers/fileHandler");
var FormData = require('form-data');
const fetch = require("node-fetch");
const fs = require("fs");

function run() {
    let handler = new fileHandler();
    let crypto = new cryptoService();

    handler.readFile().then((result) => {
        let json = JSON.parse(result);
        let text = crypto.decipherText(json);

        json.decifrado = text;
        json.resumo_criptografico = crypto.encryptTextSHA1(text);
        handler.rewriteFile(JSON.stringify(json)).then(
          () =>{
            request(json.token);
          }
        )
    });
}

const request = (token) => {
    const formData = new FormData();

    formData.append('answer', fs.createReadStream('answer.json'));

    fetch('https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=' + token, {
        method: 'POST',
        body: formData
    }).then(function(response) {
       console.log(response);
    }).catch(function(error) {
        console.log(error);
    });
}

run();