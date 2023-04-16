import MongoDBConnection from "../../../../database/dbConnection";
import Users from "../../../../model/Schema";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  try {
    await MongoDBConnection();

    // only post method is accepted
    if (req.method !== "POST") {
      return res
        .status(500)
        .json({ message: "HTTP method not valid only POST Accepted" });
    }

    if (!req.body) {
      return res
        .status(404)
        .json({ error: "Don't have form data...!" });
    }

    const { username, email, password } = req.body;

    // check duplicate users
    const checkexisting = await Users.findOne({ email });
    if (checkexisting) {
      return res
        .status(422)
        .json({ error: "User Already Exists...!" });
    }

    if (password.length < 6 || password.length > 12) {
      // example password length range
      return res.status(400).json({
        error: "Password length should be between 6 and 12 characters.",
      });
    }

    const hashedPassword = await hash(password, 12);

    // hash password
    const data = await Users.create({ username, email, password: hashedPassword });

    res.status(201).json({ status: true, user: data });
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).json({ error: "API Not Found...!" });
    } else if (error.status === 422) {
      return res.status(422).json({ error: "User Already Exists...!" });
    } else {
      return res.status(500).json({ error: error.message });
    }
  }
}