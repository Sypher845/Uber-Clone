import captainModel from "../models/captain.model.js";
import captainService from "../services/captain.service.js";
import { validationResult } from "express-validator";

export default {
  registerCaptain: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { fullname, email, password, vehicle } = req.body;

    const isCaptainExist = await captainModel.findOne({ email });
    
    if (isCaptainExist) {
      return res.status(400).json({ message: "Captain already exists" });
    }

    const hashPassword = await captainModel.hashPassword(password);
    const captain = await captainService.createCaptain({
      firstName: fullname.firstName,
      lastName: fullname.lastName,
      email,
      password: hashPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });
    if (!captain) {
      return res.status(400).json({ message: "Failed to register captain" });
    }
    const token = captain.generateAuthToken();
    res.status(201).json({token , captain});
  },
};
