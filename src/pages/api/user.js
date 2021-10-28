import { PrismaClient } from "@prisma/client"
import { data } from "autoprefixer"

export default async (req, res) => {
  if (req.method === "POST") {
    const prisma = new PrismaClient()
    const newUser = await prisma.users.create({ data: JSON.parse(req.body) })
    res.status(200).json({
      data: {
        user: newUser,
      },
      status: {
        status_code: 200,
        timestamp: new Date(),
      },
    })
    // } else if (req.method === "PUT") {
    //   const prisma = new PrismaClient()
    // } else if (req.method === "GET") {
    //   const prisma = new PrismaClient()
    // } else if (req.method === "DELETE") {
    //   const prisma = new PrismaClient()
    // } else {
    //   res.status(405).json({
    //     status: {
    //       status_code: 405,
    //       timestamp: new Date(),
    //       method: "Method not allowed",
    //     },
    //   })
  }

  res.status(200).json({
    data22: data,
    status: {
      status_code: 200,
      timestamp: new Date(),
    },
  })
}
