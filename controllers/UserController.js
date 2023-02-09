import User from "../models/User.js";

const UserController = {};

UserController.getAll = async (req, res) => {
    try{
        const users = await User.find();

        return res.status(200).json({
            succes: true,
            message: "Get all users retrieved succsessfully",
            data: users,
        });
    } catch (error){
        return res.status(500).json({
            success: false,
            message: "Error retrieving users",
            error: error.message,
        });
    }
};

UserController.getByName = async (req, res) => {
    try{
        const user = await User.findOne({name:req.params.name});

        return res.status(200).json({
            succes: true,
            message: "Get user retrieved succsessfully",
            data: user,
        });
    } catch (error){
        return rmSync.status(500).json({
            succes:false,
            message: "Error retrieving user",
            error: error.message,
        });

    }
};

UserController.deleteById = async (req,res) => {
    try {
        const deletedOne = await User.deleteOne({_id: req.params.id});
        res.json({
            message: `${req.params.id} Deleted`,
            data: deletedOne,
        });
    } catch (error){
        res.status(500).send("internal error");
    };
}



export default UserController;