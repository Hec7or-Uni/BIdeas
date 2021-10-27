import { PrismaClient } from "@prisma/client"

export default async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const prisma = new PrismaClient()

  console.log(req.url.substring(11))

  try {
    const data = await prisma.projects.findUnique({
      select: {
        id: true,
        teamName: true,
        avatar: true,
        cover: true,
        motto: true,
        description: true,
        xp: true,
        respect: true,
        country: true,
        facebook: true,
        twitter: true,
        discord: true,
      },
      where: {
        teamName: req.url.substring(11),
      },
      // include: {
      //   participations: {
      //     include: {
      //       user: true,
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
