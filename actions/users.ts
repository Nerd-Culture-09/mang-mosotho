"use server"

import { prismaClient }  from "@/lib/db";
import { BusinessRegisterInputProps, RegisterInputProps } from "@/types/types";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export async function createUser(formdata: RegisterInputProps) {
  const {
    fullName,
    email,
    phone,
    location,
    password,
    instaProfile,
    twitterProfile,
    facebookProfile,
    linkedProfile,
    role,
  } = formdata;

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
        linkedProfile,
        facebookProfile,
        twitterProfile,
        instaProfile,
        password: hashedPassword,
        role,
      },
    });

    return {
      data: newUser,
      error: null,
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: "Something went wrong",
      status: 500,
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

export async function getSocials() {
    try {
        const socials = await prismaClient.user.findMany({
            select: {
                linkedProfile: true,
                facebookProfile: true,
                twitterProfile: true,
                instaProfile: true,
            },
        });
        return socials;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function createBusinessProfile(formData: BusinessRegisterInputProps) {
    // Destructure form data for easier access
    const {
        businessName,
        businessEmail,
        businessPhone,
        businessAddress,
        role,
        district,
        website,
        code,
    } = formData;

    try {
        // Create a new business profile in the database
        const newProfile = await prismaClient.business.create({
            data: {
                businessName,
                businessEmail,
                businessPhone,
                businessAddress,
                role,
                district,
                website,
                code,
            },
        });

        // Log the newly created profile and return success response
        console.log(newProfile);
        return {
            data: newProfile,
            status: 201,
            error: null,
        };
    } catch (error) {
        // Handle errors and return error response
        console.log(error);
        return {
            data: null,
            status: 500,
            error: "Something went wrong",
        };
    }
}



