import { PrismaClient } from "@prisma/client"

export default async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({
      status: {
        status_code: 405,
        timestamp: new Date(),
      },
    })
  }

  const query = JSON.parse(req.body)

  try {
    const prisma = new PrismaClient()
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
      status: {
        status_code: 200,
        timestamp: new Date(),
      },
    })
  } catch (err) {
    res.status(400).json({
      status: {
        status_code: 400,
        timestamp: new Date(),
      },
    })
  }
}
