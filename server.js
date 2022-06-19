const Application = require("./src/app");
const PORT = 3000;
const DB_URL = "mongodb://localhost:27017/quiz_app_mvp";

new Application(DB_URL, PORT);

// var CryptoJS = require("crypto-js");
// // Encrypt
// var ciphertext = CryptoJS.AES.encrypt(
//   "saeb jafari",
//   "13243583&@#$*(!&@()#*()@!#)_!@(#)_@(#_)(#)_@*$()!_#%&*()!2!!!!##"
// ).toString();

// // Decrypt
// console.log(ciphertext);
// var bytes = CryptoJS.AES.decrypt(
//   ciphertext,
//   "13243523&@#$*(!&@()#*()@!#)_!@(#)_@(#_)(#)_@*$()!_#%&*()!2!!!!##"
// );
// var originalText = bytes.toString(CryptoJS.enc.Utf8);

// console.log(originalText); // 'my message'
