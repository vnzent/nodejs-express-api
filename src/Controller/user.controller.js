import { PrismaClient } from "../../generated/prisma/index.js";
import { successResponse, errorResponse } from "../response.js";
const prisma = new PrismaClient(); 

const getUser = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        return successResponse(res, 200, "Users retrieved successfully", users);
    } catch (error) {
        return errorResponse(res, 500, "Internal Server Error");
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id)}
        })

        if(!user) {
           return errorResponse(res, 400, "User tidak ditemukan");
        }

        return successResponse(res, 200, "User retrieved successfully", user);
    } catch(error) {
        return errorResponse(res, 500, "Internal Server Error");
    }
}

const createUser = async (req, res) => {
    if(!req.body.email) {
        return errorResponse(res, 400, "Isi emailnya bang jangan kosongin");
    }

    if(!req.body.name) {
        return errorResponse(res, 400, "Isi namanya bang jangan kosongin");
    }
    const { email, name } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if(user) {
            return errorResponse(res, 400, "Email sudah terdaftar");
        }

        const newUser = await prisma.user.create({
            data: {
                email,
                name
            }
        })

        return successResponse(res, 201, "User berhasil dibuat", newUser);

    } catch(error) {
        return errorResponse(res, 500, "Internal Server Error");
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, name } = req.body;

    if (!email || !name) {
        return errorResponse(res, 400, "Email dan nama harus diisi");
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        })

        if(!user) {
            return errorResponse(res, 400, "User tidak ditemukan");
        }

        const newUserData = await prisma.user.update({
            data: {
                email,
                name,
            }
        })

        return successResponse(res, 200, "User berhasil diperbarui", newUserData);
    } catch(error) {
        return errorResponse(res, 500, "Internal Server Error");
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        })

        if(!user) {
            return errorResponse(res, 400, "User tidak ditemukan");
        }

        const targetedUser = await prisma.user.delete({
            where: { id: parseInt(id) }
        })
    } catch(error) {
        return errorResponse(res, 500, "Internal Server Error");
    }
}

export {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}