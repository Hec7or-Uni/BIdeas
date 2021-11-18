import status from "../../../libs/status"
import { getToken } from "next-auth/jwt"
import prisma from "../../../libs/prisma"

const secret = process.env.SECRET

export default async (req, res) => {
  const token = await getToken({ req, secret })
  if (!token) {
    res.status(401).json({
      status: status(401, ""),
    })
  } else {
    if (req.method === "POST") {
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
    } else {
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  }
}
