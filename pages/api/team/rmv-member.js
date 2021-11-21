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
    if (req.method === "DELETE") {
      const query = JSON.parse(req.body)
      const delUser = await prisma.participates.delete({
        where: {
          idUser: query.idUser,
          idProject: query.idProject,
        },
      })

      res.status(200).json({
        data: {
          delUser: delUser,
        },
        status: status(200, ""),
      })
    } else {
      res.setHeader("Allow", ["DELETE"])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  }
}
