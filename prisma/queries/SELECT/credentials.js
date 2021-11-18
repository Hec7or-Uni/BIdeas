import prisma from "../../../libs/prisma"

export async function Credentials(id) {
  const regex = /@/
  const isEmail = regex.test(id)
  const filter = isEmail ? { email: id } : { userName: id }

  return await prisma.users.findUnique({
    select: {
      id: true, // ---------- Identification
      userName: true,
      email: true,
      salt: true, // -------- Credentials
      passwd: true,
      createdAt: true, // --- Info
      updatedAt: true,
    },
    where: filter,
  })
}
