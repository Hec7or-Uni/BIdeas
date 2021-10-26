import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const data = await prisma.users.findUnique({
      select: {
        userName: true,
        email: true,
        salt: true,
        passwd: true,
      },
      where: {
        email: JSON.parse(req.body).email,
      },
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
