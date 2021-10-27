import { PrismaClient } from "@prisma/client"

export default async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const prisma = new PrismaClient()

  try {
    const data = await prisma.projects.findMany({
      select: {
        id: true,
        avatar: true,
        teamName: true,
        motto: true,
        createdAt: true,
      },
      take: 1000,
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
