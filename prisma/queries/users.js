import prisma from "../../libs/prisma"

export async function Users() {
  return await prisma.users.findMany({
    select: {
      id: true, // ---------- Identification
      userName: true,
      avatar: true, // ------ Profile
      name: true,
      lastName: true,
      studies: true,
      description: true,
      xp: true,
      respect: true,
      age: true, // --------- Statistics
      genre: true,
      country: true,
      plan: true, // -------- Account state
      av4hire: true,
      email: true, // ------- Social
      facebook: true,
      twitter: true,
      website: true,
      createdAt: true, // --- Info
      updatedAt: true,
    },
  })
}

export async function UsersLite() {
  return await prisma.users.findMany({
    select: {
      id: true, // ---------- Identification
      userName: true,
      avatar: true, // ------ Profile
      name: true,
      lastName: true,
      studies: true,
      description: true,
      plan: true, // -------- Account state
      av4hire: true,
      createdAt: true, // --- Info
      updatedAt: true,
    },
  })
}
