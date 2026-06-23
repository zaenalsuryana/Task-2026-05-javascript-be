const { User } = require("../models");

const getAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.json(users);
};

const getUserById = async (req, res) =>{
    const user = await User.findByPk(req.params.id);
    res.json(user);
};

const createUser = async (req, res) =>{
    const user = await User.create(req.body);
    res.status(201).json(user);
};

const updateUser = async (req, res) => {
    await User.update(req.body, {
        where:{
            id: req.params.id,
        },
    });
    res.json({ message: "User berhasil diupdate",});
};

const deleteUser = async (req, res) => {
    await User.destroy({
        where: {
            id: req.params.id,
        },
    });
    res.json({ message: "User berhasil dihapus",});
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}