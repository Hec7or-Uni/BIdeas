import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async (req, res) => {
  // if (req.method !== "POST") {
  //   return res.status(405).json({ message: "Method not allowed" })
  // }

  console.log(req.body)
  console.log(JSON.parse(req.body))

  try {
    const newUser = await prisma.users.create({ data: req.body })
    res.status(200).json(newUser)
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" })
  } finally {
    prisma.$disconnect()
  }
}
