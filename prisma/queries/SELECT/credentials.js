import prisma from "../../../libs/prisma"

export async function Credentials(id) {
  const query = await prisma.users.findMany({
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
      OR: [{ email: { equals: id } }, { userName: { equals: id } }],
    },
  })
  return query[0]
}
