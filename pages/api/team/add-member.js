import status from "../../../libs/status"
import { getToken } from "next-auth/jwt"
import prisma from "../../../libs/prisma"

const secret = process.env.SECRET

export default async (req, res) => {
  if (req.method !== "POST") {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }

  existSession(req, res)

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

async function existSession(req, res) {
  const token = await getToken({ req, secret })
  if (!token) {
    res.status(401).json({
      status: status(401, ""),
    })
  }
}
