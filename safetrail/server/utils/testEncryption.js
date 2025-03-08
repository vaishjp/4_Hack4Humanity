require('dotenv').config();  // Load environment variables
const { encrypt, decrypt } = require('./encryption');

const sampleText = "Hello, SafeTrail!";
const encryptedText = encrypt(sampleText);
console.log("🔐 Encrypted:", encryptedText);

const decryptedText = decrypt(encryptedText);
console.log("🔓 Decrypted:", decryptedText);
