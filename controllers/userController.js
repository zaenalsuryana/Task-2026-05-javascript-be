const { User } = require("../models");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan pada server",
        });
    }
    };

const getUserById = async (req, res) =>{
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan",
            });
        }

        res.json(user);
    }catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan pada server",
        });
    }
};

const createUser = async (req, res) =>{
    try {
        const { name,email } = req.body;

        if(!name && !email){
            return res.status(400).json({ message: "Name dan Email wajib diisi",
            });
        }

        if(!name){
            return res.status(400).json({ message: "Name wajib diisi",
            });
        }

        if(!email){
            return res.status(400).json({message: "Email wajib diisi",
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Format email tidak valid", 
            });
        }
        const user = await User.create({
            name,
            email,
        });
        res.status(201).json(user);
    }catch(error) { res.status(500).json({ message: "Terjadi kesalahan pada server",
    });
  }
};

const updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        
        if (!name && !email) {
            return res.status(400).json({
                message: "Name dan Email wajib diisi",
            });
        }

        if (!name) {
            return res.status(400).json({
                message: "Name wajib diisi",
            });
        }

        if (!email) {
            return res.status(400).json({
                message: "Email wajib diisi",
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Format email tidak valid",
            });
        }

        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User tidak ditemukan",
            });
        }

        await User.update(
            {
                name,
                email,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );

        res.json({
            message: "User berhasil diupdate",
        });
    } catch (error) {
        res.status(500).json({
            message: "Terjadi kesalahan pada server",
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
         
        if (!user) {
            return res.status(404).json({
                message: "User tidak ditemukan",
            });
    }
    await User.destroy({
        where: {
            id: req.params.id,
        },
    });
    res.json({ message: "User berhasil dihapus",});
}catch(error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server",
    });
  }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}