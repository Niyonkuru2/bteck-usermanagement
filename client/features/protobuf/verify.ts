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
        name: "RSASSA-PKCS1-v1_5",
        hash: "SHA-384",
      },
      false,
      ["verify"]
    );

    const isValid = await window.crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      publicKey,
      signature,
      emailHash
    );

    return isValid;
  } catch {
    return false;
  }
}