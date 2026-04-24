import { getPublicKey } from "../services/crypto.service.js";
import { generateToken } from "../services/jwt.service.js";

export const getPublicKeyController = (req, res) => {
  res.json(getPublicKey());
};

export const googleCallback = (req, res) => {
  const user = req.user;

  const token = generateToken(user);

  // Option 1: Send as JSON (simplest for testing)
  res.json({ token });

  // Option 2 (better for production):
  // res.cookie("token", token, { httpOnly: true }).redirect("/dashboard");
};