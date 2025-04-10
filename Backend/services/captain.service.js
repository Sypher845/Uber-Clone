import captainModel from "../models/captain.model.js";

export default {
  createCaptain: async ({
    firstName,
    lastName,
    email,
    password,
    color,
    plate,
    capacity,
    vehicleType, }) => {
    if (
      !firstName ||
      !email ||
      !password ||
      !color ||
      !plate ||
      !capacity ||
      !vehicleType
    ) {
      throw new Error("All fields are required");
    }
    const captain = await captainModel.create({
      fullname: {
        firstName,
        lastName,
      },
      email,
      password,
      vehicle: {
        color,
        plate,
        capacity,
        vehicleType,
      },
    });
    return captain;
  },
};
