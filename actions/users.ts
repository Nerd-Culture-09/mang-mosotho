"use server"

import { prismaClient }  from "@/lib/db";
import { RegisterInputProps } from "@/types/types";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";


// Function to create a new user
export async function createUser(formdata: RegisterInputProps) {
    const { fullName, email, phone, password, role} = formdata;

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

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method === "GET") {
      try {
        const { q: query } = req.query;
  
        if (typeof query !== "string") {
          throw new Error("Invalid request");
        }
  
        /**
         * Search users
         */
        const users = await prismaClient.user.findMany({
          where: {
            OR: [
              {
                name: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                email: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                phone: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
          },
          select: {
            name: true,
            email: true,
            phone: true,
          },
        });
  
        /**
         * Save search query
         */
        await prismaClient.searchQuery.create({
          data: {
            query,
          },
        });
  
        res.status(200).json({ users });
      } catch (error: any) {
        console.log(error);
        res.status(500).end();
      }
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  }