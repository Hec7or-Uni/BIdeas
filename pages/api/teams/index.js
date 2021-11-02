import { PrismaClient } from "@prisma/client"
import status from "../../../../utils/status"

const prisma = new PrismaClient()

export default async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({
      status: status(405, ""),
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
