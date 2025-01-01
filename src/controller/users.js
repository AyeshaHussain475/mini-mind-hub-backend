import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const search = req.query.search ?? "";

    const firstNameRegex = new RegExp(search, "i");
    const skip = (page - 1) * limit;

    const users = await User.find({
      _id: { $ne: req.user._id },
      firstName: firstNameRegex,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const totalUsers = await User.countDocuments({
      firstName: firstNameRegex,
    });
    const totalPages = Math.ceil(totalUsers / limit);

    if (users) {
      return res.status(200).json({
        message: "All MiniMindHub Users",
        users,
        count: totalUsers,
        currentPage: page,
        totalPages,
      });
    } else {
      return res.status(400).json({
        message: "Something went wrong!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error!",
      error,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deleteUser) {
      return res.status(404).json({
        message: "User not found!",
      });
    }
    return res.status(200).json({
      message: "User is deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { isVerified: true },
      { new: true }
    );

    if (!updateUser) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    return res.status(200).json({
      message: "User has been verified successfully!",
      user: updateUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error!",
      error: error.message,
    });
  }
};
