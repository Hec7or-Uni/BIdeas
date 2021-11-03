import status from "../../../libs/status"
import { getToken } from "next-auth/jwt"
import prisma from "../../../libs/prisma"

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
  const newMember = await prisma.participates.create({
    data: query,
  })

  res.json({
    data: {
      user: newMember,
    },
    status: status(200, ""),
  })
}
