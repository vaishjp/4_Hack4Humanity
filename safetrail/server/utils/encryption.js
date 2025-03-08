const crypto = require("crypto");

const ENCRYPTION_KEY = process.env.SECRET_KEY;
if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 32) {
    throw new Error("❌ Invalid encryption key length! Must be exactly 32 characters.");
}

const IV_LENGTH = 16; // AES block size

function encrypt(text) {
    if (typeof text !== "string") {
        text = JSON.stringify(text); // Convert non-string data to string
    }

    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY, "utf-8"), iv);
    let encrypted = cipher.update(text, "utf-8", "hex");
    encrypted += cipher.final("hex");

    return iv.toString("hex") + ":" + encrypted;
}

function decrypt(text) {
    let textParts = text.split(":");
    let iv = Buffer.from(textParts.shift(), "hex");
    let encryptedText = Buffer.from(textParts.join(":"), "hex");
    let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY, "utf-8"), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    
    try {
        return JSON.parse(decrypted.toString()); // Convert back to object if needed
    } catch {
        return decrypted.toString();
    }
}

module.exports = { encrypt, decrypt };
