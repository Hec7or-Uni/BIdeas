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
}
