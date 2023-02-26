import User from "../models/User.js";

const UserController = {};

UserController.getAll = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      succes: true,
      message: "Get all users retrieved succsessfully",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving users",
      error: error.message,
    });
  }
};

UserController.getByName = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.params.name });

    return res.status(200).json({
      succes: true,
      message: "Get user retrieved succsessfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      succes: false,
      message: "Error retrieving user",
      error: error.message,
    });
  }
};

UserController.getById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    return res.status(200).json({
      succes: true,
      message: "Get user retrieved succsessfully va be",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      succes: false,
      message: "Error retrieving user",
      error: error.message,
    });
  }
};

UserController.deleteById = async (req, res) => {
  try {
    const deletedOne = await User.deleteOne({ _id: req.params.id });
    res.json({
      message: `${req.params.id} Deleted`,
      data: deletedOne,
    });
  } catch (error) {
    res.status(500).send("internal error");
  }
};

//  UserController.update = async (req, res) => {
//     try {
//         const updatedUser = await User.findOne(
//             req.params.userId,
//             req.body
//           );
//       console.log("updatedUser:",updatedUser)
//       return res.status(200).json({
//         success: true,
//         message: 'User updated successfully',
//         data: updatedUser,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: 'Error updating user',
//         error: error.message,
//       });
//     }
//   };
// UserController.update = async (req, res) => {
//     try {
//       const updatedUser = await User.findOne(req.params.userId, req.body);
//       if (!updatedUser) {
//         return res.status(404).json({
//           success: false,
//           message: "User not found",
//         });
//       }
//       return res.status(200).json({
//         success: true,
//         message: "User updated successfully",
//         data: updatedUser,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Error updating user",
//         error: error.message,
//       });
//     }
//   };

// Actualización del controlador UserController.update




UserController.update = async function updateUser(req, res) {
  const UserId = req.params.id;
  const updatedUser = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { _id: UserId },
      { $set: updatedUser },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error.message,
    });
  }
};

export default UserController;
