import { PrismaClient } from "@prisma/client"
import status from "../../../utils/status"
import { getToken } from "next-auth/jwt"

const prisma = new PrismaClient()
const secret = process.env.SECRET

export default async (req, res) => {
  if (req.method !== "POST") {
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

  const query = JSON.parse(req.body)
  const newMember = await prisma.requestJoin.create({
    data: query,
  })

  res.status(200).json({
    data: { user: newMember },
    status: status(200, ""),
  })
}
