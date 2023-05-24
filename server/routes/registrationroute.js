import { signupschema } from "../schema/signupschema.js";
import bycrpt from "bcryptjs";
import jwt from "jsonwebtoken";
const users = signupschema;

export const signuproute = async (req, res) => {
  const { name, email, password } = req.body;
  const check_if_email_exist= await users.findOne({email:email})
  if(check_if_email_exist) return res.json({status:400,error:'user already exist'})

  const hashedpassword = await bycrpt.hash(password, 12);
  const newUser = await users.create({
    name,
    email,
    password: hashedpassword,
  });

  if (!newUser) {
    return res.json({
      status: 400,
      error: "user failed to be added to the database",
    });
  }
  res.json({ status: "ok",message:'user added succsefully' });
};

// !login route for alread existing users

export const login_route = async (req, res) => {
  const { password, email } = req.body;

  const user_exist = await users.findOne({ email });

  if (!user_exist) {
    return res.json({ error: "user does not exist" });
  }
  // password check

  const db_password = user_exist.password;
  const db_name = user_exist.name;
  // check if passwords match
  const password_match = await bycrpt.compare(password, db_password);

  if (!password_match) {
    return res.json({ error: "password dont match" });
  }
  // create a token
  const secrete_key = process.env.SECRETE_KEY;
  const refresh_key = process.env.REFRESH_SECRETE_KEY;
  const token = jwt.sign({ email: email }, secrete_key, {
    expiresIn: "10s",
  });
  const refresh_token = await jwt.sign({ email: email }, refresh_key, {
    expiresIn: "1y",
  });

  res.json({
    status: "ok",
    token: token,
    name: db_name,
    refresh_token: refresh_token,
  });
};

// todo validate the users token b4 sending the response
export const validatetoken = async (req, res) => {
  const { token } = req.body;

  
  const secrete_key = process.env.SECRETE_KEY;
  // verify token
  const valid_token = await jwt.verify(token, secrete_key, (err, result) => {
    if (err) {
      const error_massage = { status: "token expired" };
      return res.json(error_massage);
    }
    if (result) {
      return res.json({ status: true });
    }
  });
};

// validate refresh token

export const refreshToken = async (req, res) => {
  const refresh_key = process.env.REFRESH_SECRETE_KEY;
  const secrete_key = process.env.SECRETE_KEY;
  // check if the token is valid
  const { refresh_token } = req.body;
  const valid_refresh_token = await jwt.verify(
    refresh_token,
    refresh_key,
    (err, payload) => {
      if (err) {
        console.log("error the json token is invalid");
      }
      if (payload) {
        console.log("token has been refreshed");
        const { email } = payload;
        const token = jwt.sign({ email: email }, secrete_key, {
          expiresIn: "10s",
        });

        return res.json({ refreshedToken: token });
      }
    }
  );

  // create a new token for the user
};
