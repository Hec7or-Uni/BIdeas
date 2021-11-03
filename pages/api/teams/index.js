import { PrismaClient } from "@prisma/client"
import status from "../../../utils/status"
import { getToken } from "next-auth/jwt"

const prisma = new PrismaClient()
const secret = process.env.SECRET

export default async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({
      status: status(405, ""),
    })
  }

  const token = await getToken({ req, secret })
  if (!token) {
    res.status(401).json({
      status: status(401, ""),
    })
  }

  const projects = await prisma.projects.findMany({
    select: {
      id: true,
      avatar: true,
      teamName: true,
      motto: true,
      createdAt: true,
    },
    take: 1000,
  })

  res.status(200).json({
    data: { projects: projects },
    status: status(200, ""),
  })
}
