export async function verifySignature(
  publicKeyJwk: JsonWebKey,
  emailHash: ArrayBuffer,
  signature: ArrayBuffer
) {
  try {
    const publicKey = await window.crypto.subtle.importKey(
      "jwk",
      publicKeyJwk,
      {
        name: "RSA-PSS",
        hash: "SHA-384",
      },
      false,
      ["verify"]
    );

    const isValid = await window.crypto.subtle.verify(
      {
        name: "RSA-PSS",
        saltLength: 32,
      },
      publicKey,
      signature,
      emailHash
    );

    return isValid;
  } catch (err) {
    return false;
  }
}