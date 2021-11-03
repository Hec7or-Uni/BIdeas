import { PrismaClient } from "@prisma/client"
import status from "../../../utils/status"
import { getToken } from "next-auth/jwt"

const prisma = new PrismaClient()
const secret = process.env.SECRET

export default async (req, res) => {
  if (req.method !== "POST") {
    res
      .status(405)
      .json({
        status: status(405, ""),
      })
      .end()
  }

  const token = await getToken({ req, secret })
  if (!token) {
    res
      .status(401)
      .json({
        status: status(401, ""),
      })
      .end()
  }

  const query = JSON.parse(req.body)
  const delUser = await prisma.participates.delete({
    where: {
      idUser: query.idUser,
      idProject: query.idProject,
    },
  })

  res
    .status(200)
    .json({
      data: {
        delUser: delUser,
      },
      status: status(200, ""),
    })
    .end()
}
