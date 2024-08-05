import { prismaClient } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

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
            {
              location: {
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
          location: true,
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

      if (users.length === 0) {
        return res.status(404).json({ error: "No users found" });
      }

      res.status(200).json({ users });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
