import { PrismaClient } from "@prisma/client"

export default async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const prisma = new PrismaClient()

  try {
    const data = await prisma.users.findUnique({
      select: {
        id: true,
        userName: true,
        email: true,
        avatar: true,
        description: true,
        xp: true,
        respect: true,
        name: true,
        lastName: true,
        country: true,
        studies: true,
        plan: true,
        facebook: true,
        twitter: true,
        website: true,
      },
      where: {
        // id: Number(req.url.substring(5)),
        userName: req.url.substring(11),
      },
      // include: {
      //   participations: {
      //     include: {
      //       projects: true,
      //     },
      //   },
      // },
    })
    res.status(200).json(data)
  } catch (err) {
    console.log("error")
    res.status(400).json({ message: "Something went wrong" })
  } finally {
    await prisma.$disconnect()
    console.log("desconectado de la bbdd")
  }
}
