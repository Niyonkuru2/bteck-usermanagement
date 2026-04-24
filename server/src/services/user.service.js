import { v4 as uuidv4 } from "uuid";
import { hashEmail, signHash } from "./crypto.service.js";

export const createUser = async (db, { email, role, status }) => {
  try {
    const id = uuidv4();

    const emailHash = hashEmail(email);
    const signature = signHash(emailHash);

    await db.run(
      `INSERT INTO users (id, email, role, status, emailHash, signature)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, email, role, status, emailHash, signature]
    );

    return { id, email, role, status };
  } catch (error) {
    if (error.message.includes("UNIQUE constraint failed")) {
      throw new Error("Email already exists");
    }

    throw error;
  }
};