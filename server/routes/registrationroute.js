import { signupschema } from "../schema/signupschema.js";
import bycrpt from 'bcryptjs'
const users = signupschema;

export const signuproute = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedpassword= await bycrpt.hash(password,12)
  const newUser = await users.create({
    name,
    email,
    password:hashedpassword,
  });

  if (!newUser) {
    return res.json({
      status: 400,
      error: "user failed to be added to the database",
    });
  }
  res.json({ status: "ok" });
};
