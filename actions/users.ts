"use server"

import { prismaClient }  from "@/lib/db";
import { RegisterInputProps } from "@/types/types";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";


// Function to create a new user
export async function createUser(formdata: RegisterInputProps) {
    const { fullName, email, phone,location, password, role} = formdata;

    try {
        // Check if user with the same email exists
        const existingUser = await prismaClient.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            return {
                data: null,
                error: `User with this email (${email}) already exists in the Database`,
                status: 409,
            };
        }

        // Encrypt the Password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
       // Create the new user in the database
        const newUser = await prismaClient.user.create({
            data: {
                name: fullName,
                email,
                phone,
                location,
                password: hashedPassword,
                role,
            },
        });
        console.log(newUser);

        return {
            data: newUser,
            error: null,
            status: 200,
        };
    } catch (error) {
        console.log(error);
        return {
            error: "Something went wrong",
        };
    }
}

// Function to fetch a user by ID
export async function getUserById(id: string) {
    if (id) {
        try {
            const user = await prismaClient.user.findUnique({
                where: {
                    id,
                },
            });
            return user;
        } catch (error) {
            console.log(error);
        }
    }
}

// Function to update a user's verification status by ID
// export async function updateUserById(id: string) {
//     if (id) {
//         try {
//             const updatedUser = await prismaClient.user.update({
//                 where: {
//                     id,
//                 },
//             });
//             return updatedUser;
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }
