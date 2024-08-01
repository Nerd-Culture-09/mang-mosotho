"use server"

import EmailTemplate from "@/components/Emails/email-template";
import { prismaClient }  from "@/lib/db";
import { RegisterInputProps } from "@/types/types";
import bcrypt from "bcrypt";


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

        // Generate a verification token
        const generateToken = () => {
            const min = 100000; // Minimum 6-figure number
            const max = 999999; // Maximum 6-figure number
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const userToken = generateToken();

        // Create the new user in the database
        const newUser = await prismaClient.user.create({
            data: {
                name: fullName,
                email,
                phone,
                password: hashedPassword,
                role,
                token: userToken,
            },
        });

        // Send an Email with the verification token
        const token = newUser.token;
        const userId = newUser.id;
        const firstName = newUser.name.split(" ")[0];
        const linkText = "Verify your Account ";
        const message =
            "Thank you for registering with Clinicease. To complete your registration and verify your email address, please enter the following 6-digit verification code on our website :";
        const sendMail = await resend.emails.send({
            from: "Clinic Ease <bookings@clinicease.tech>",
            to: email,
            subject: "Verify Your Email Address",
            react: EmailTemplate({ firstName, token, linkText, message }),
        });

        console.log(token);
        console.log(sendMail);
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
export async function updateUserById(id: string) {
    if (id) {
        try {
            const updatedUser = await prismaClient.user.update({
                where: {
                    id,
                },
                data: {
                    isVerified: true,
                },
            });
            return updatedUser;
        } catch (error) {
            console.log(error);
        }
    }
}

// Function to fetch all doctors
export async function getDoctors() {
    try {
        const doctors = await prismaClient.user.findMany({
            where: {
                role: "DOCTOR",
            },
            select: {
                id: true,
                name: true,
                email: true,
                slug: true,
                phone: true,
                doctorProfile: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        gender: true,
                        bio: true,
                        profilePicture: true,
                        operationMode: true,
                        hourlyWage: true,
                        availability: {
                            select: {
                                monday: true,
                                tuesday: true,
                                wednesday: true,
                                thursday: true,
                                friday: true,
                                saturday: true,
                                sunday: true,
                            },
                        },
                    },
                },
            },
        });
        return doctors;
    } catch (error) {
        console.log(error);
        return null;
    }
}


// export async function getDoctors() {
//         try {
//             const doctors = await prismaClient.user.findMany({
//                 where: {
//                     role: "DOCTOR",
//                 },
//                 include : {
//                     doctorProfile: true,
//                 },
//             });
//         return doctors;
//         } catch (error) {
//             console.log(error);
//             return null;
//         }
//     }



// Function to fetch a doctor by slug
export async function getDoctorBySlug(slug: string) {
    if (slug) {
        try {
            const doctor = await prismaClient.user.findFirst({
                where: {
                    role: "DOCTOR",
                    slug,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    slug: true,
                    phone: true,
                    doctorProfile: {
                        select: {
                            firstName: true,
                            lastName: true,
                            gender: true,
                            bio: true,
                            profilePicture: true,
                            operationMode: true,
                            hourlyWage: true,
                            yearsOfExperience: true,
                            country: true,
                            city: true,
                            state: true,
                            primarySpecialization: true,
                            otherSpecialities: true,
                            organizationName: true,
                            organizationAddress: true,
                            organizationContactNumber: true,
                            organizationEmailAddress: true,
                            organizationWebsite: true,
                            organizationHoursOfOperarion: true,
                            servicesOffered: true,
                            insuranceAccepted: true,
                            educationHistory: true,
                            research: true,
                            accomplishments: true,
                        },
                    },
                },
            });

            if (!doctor) {
                return null;
            }

            return doctor;
        } catch (error) {
            console.log(error);
        }
    }
}
