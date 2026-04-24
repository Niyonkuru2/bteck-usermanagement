import { getPublicKey } from "../services/crypto.service.js";
import { generateToken } from "../services/jwt.service.js";

export const getPublicKeyController = (req, res) => {
  res.json(getPublicKey());
};

export const googleCallback = (req, res) => {
  const user = req.user;

  const token = generateToken(user);

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    })
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);;
};