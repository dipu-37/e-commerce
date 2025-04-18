import { User } from "./user.model.js";

export const createStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({
        success: true,
        message: "User create successfully",
        data: newUser,
      });
  } catch (err) {
    console.log(err);
    res.status(404).json({
        success: false,
        message: "User can not create successfully",
        err
      })
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const result = await User.find();

    res.status(201).json({
      success: true,
      message: "User retrieved successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
        success: false,
        message: "Users can not retrieved successfully ",
        err
      })
  }
};
