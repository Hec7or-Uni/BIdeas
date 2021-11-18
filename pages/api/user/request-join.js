import prisma from "../../../libs/prisma"
import status from "../../../libs/status"
import { getToken } from "next-auth/jwt"

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
      res.status(200).json({
        data: {
          user: await prisma.requestJoin.create({
            data: query,
          }),
        },
        status: status(200, ""),
      })
    } else if (req.method === "GET") {
      res.status(200).json({
        solicitudes: await prisma.participates.findMany({
          include: {
            project: {
              select: {
                id: true,
                teamName: true,
                description: true,
              },
            },
            user: {
              select: {
                id: true,
                userName: true,
                description: true,
              },
            },
          },
          where: {
            OR: [{ idUser: 133 }, { idProject: 37 }],
          },
        }),
        status: status(200, ""),
      })
    } else {
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  }
}
