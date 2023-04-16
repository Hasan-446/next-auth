import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(value);
      },
      message: "Invalid email",
    },
  },
  password: {
    type: String,
    required: true,
  },
});

const Users = models.user || model("user", userSchema);

export default Users;
