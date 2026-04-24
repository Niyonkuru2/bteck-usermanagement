import crypto from "crypto";
import fs from "fs";

const PRIVATE_KEY_PATH = "./keys/private.pem";
const PUBLIC_KEY_PATH = "./keys/public.pem";

let privateKey;
let publicKey;

export const initKeys = () => {
  if (!fs.existsSync("./keys")) fs.mkdirSync("./keys");

  if (!fs.existsSync(PRIVATE_KEY_PATH)) {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
    });

    fs.writeFileSync(PRIVATE_KEY_PATH, privateKey.export({ type: "pkcs1", format: "pem" }));
    fs.writeFileSync(PUBLIC_KEY_PATH, publicKey.export({ type: "pkcs1", format: "pem" }));
  }

  privateKey = fs.readFileSync(PRIVATE_KEY_PATH);
  publicKey = fs.readFileSync(PUBLIC_KEY_PATH);
};

export const hashEmail = (email) => {
  return crypto.createHash("sha384").update(email).digest();
};

export const signHash = (hash) => {
  const signer = crypto.createSign("RSA-SHA384");
  signer.update(hash);
  return signer.sign(privateKey);
};

export const getPublicKey = () => {
  return crypto.createPublicKey(publicKey).export({ format: "jwk" });
};