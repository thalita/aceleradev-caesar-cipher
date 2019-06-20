var sha1 = require('js-sha1');


class CipherService {
    decipherText(object) {
        console.log(object);
        let text = object.cifrado;
        var result ="";
        
         text.split('').forEach((el) => {
            let asciiCode = el.charCodeAt(0);
            var newAsciiCode = asciiCode - object.numero_casas;
            var char = el;

            if (el.match(/[A-Za-z]/gi))
                char = String.fromCharCode(newAsciiCode);

            result += char;
        });

        return result;
    }

    encryptTextSHA1(text){

        return sha1(text);

    }      
}

module.exports = CipherService;
