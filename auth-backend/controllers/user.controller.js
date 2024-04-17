import User from "../models/user.model.js";

const getUsers = async(req, res) => {
    try {
        const users = await User.find({}, 'username');
        return res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Server Error' });
    }
}

export default getUsers;