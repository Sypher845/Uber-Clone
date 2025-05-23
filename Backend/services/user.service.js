import userModel from "../models/user.model.js";


export default {
  createUser: async ({ firstName, lastName, email, password }) => {
    if (!firstName || !email || !password) {
      throw new Error('All fields are required');
    }
    const user = await userModel.create({
      fullname: {
        firstName,
        lastName
      },
      email,
      password
    });
    return user;
  }
};


