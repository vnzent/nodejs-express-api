const { PrismaClient } = require("../generated/prisma/index.js")
const prisma = new PrismaClient(); 

const getUser = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.send(users);
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error"});
    }
}

const addUser = async (req, res) => {
    if(!req.body.email) {
        return res.status(400).send({ message: "Isi emailnya bang jangan kosongin"});
    }

    if(!req.body.name) {
        return res.status(400).send({ message: "Isi namanya bang jangan kosongin"});
    }
    const { email, name } = req.body;

    try {
        const newUser = await prisma.user.create({
            data: {
                email,
                name
            }
        })
    } catch(error) {
        res.status(500).send({ message: "Internal Server Error"});
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, name } = req.body;

    if (!email || !name) {
        res.status(400).send({ message: "Semua field harus diisi"});
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        })

        if(!user) {
            res.status(400).send({ message: "User tidak ditemukan"})
        }

        const newUserData = await prisma.user.update({
            data: {
                email,
                name,
            }
        })

        res.status(200).send("User berhasil dibuat");
    } catch(error) {
        res.status(500).send({ message: "Internal Server Error"});
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.paramas;

    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        })

        if(!user) {
            res.status(400).send({ message: "User tidak ditemukan"})
        }

        const targetedUser = await prisma.user.delete({
            where: { id: parseInt(id) }
        })
    } catch(error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
}

module.exports = {
    getUser,
    addUser,
    updateUser,
    deleteUser
}