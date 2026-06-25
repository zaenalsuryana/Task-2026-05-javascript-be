const express = require("express");
const router = express.Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/userController");

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Mengambil semua data user
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Berhasil mengambil daftar user
 */

router.get("/", getAllUsers);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Mengambil user berdasarkan ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Data user berhasil ditemukan
 *       404:
 *         description: User tidak ditemukan
 */
router.get("/:id", getUserById);
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Menambahkan user baru
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User berhasil ditambahkan
 *       400:
 *         description: Validasi gagal (name/email wajib diisi atau format email tidak valid)
 */
router.post("/", createUser);
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Mengubah data user berdasarkan ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User berhasil diupdate
 *       400:
 *         description: Validasi gagal (name/email wajib diisi atau format email tidak valid)
 *       404:
 *         description: User tidak ditemukan
 */
router.put("/:id", updateUser);
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Menghapus user berdasarkan ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User berhasil dihapus
 *       404:
 *         description: User tidak ditemukan
 */
router.delete("/:id", deleteUser);

module.exports = router;