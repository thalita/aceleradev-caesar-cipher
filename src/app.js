var cryptoService = require("./services/cryptService");
var fileHandler = require("./handlers/fileHandler");
var FormData = require('form-data');
const fetch = require("node-fetch");
const fs = require("fs");

function run() {
    let handler = new fileHandler();
    let crypto = new cryptoService();

    handler.readFile().then((result) => {
        let teste = JSON.parse(result);
        let text = crypto.decipherText(teste);

        teste.decifrado = text;
        teste.resumo_criptografico = crypto.encryptTextSHA1(text);
        handler.rewriteFile(JSON.stringify(teste)).then(
          () =>{
            request(teste.token);
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