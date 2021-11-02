import { PrismaClient } from "@prisma/client"
import status from "../../../utils/status"

const prisma = new PrismaClient()

export default async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({
      status: status(405, ""),
    })
  }

  const query = JSON.parse(req.body)
  const newMember = await prisma.requestRecruit.create({ data: query })

  res.status(200).json({
    data: { user: newMember },
    status: status(200, ""),
  })
}
