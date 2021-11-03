import prisma from "../../../libs/prisma"
import status from "../../../libs/status"

export default async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({
      status: status(405, ""),
    })
  }

  const query = JSON.parse(req.body)
  const dataUser = await prisma.users.findUnique({
    select: {
      id: true,
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
