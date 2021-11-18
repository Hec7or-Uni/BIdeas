import prisma from "../../libs/prisma"

export async function User(id) {
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
    where: {
      OR: [{ email: id }, { userName: id }],
    },
  })
}
