import { PrismaClient } from "@prisma/client"
import status from "../../../../utils/status"

const prisma = new PrismaClient()

export default async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({
      status: status(405, ""),
    })
  }

  const query = JSON.parse(req.body)
  const dataUser = await prisma.users.findUnique({
    select: {
      userName: true,
      email: true,
      salt: true,
      passwd: true,
    },
    where: {
      email: query.email,
    },
  })

  res.status(200).json({
    data: { user: dataUser },
    status: status(200, ""),
  })
}
