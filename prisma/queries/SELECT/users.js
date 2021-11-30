import prisma from "../../../libs/prisma"

export async function Users() {
  const query = await prisma.users.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
      {
        updatedAt: "desc",
      },
      {
        xp: "desc",
      },
      {
        respect: "desc",
      },
    ],
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
  return query
}

export async function UsersLite() {
  const query = await prisma.users.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
      {
        updatedAt: "desc",
      },
      {
        xp: "desc",
      },
      {
        respect: "desc",
      },
    ],
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
  return query
}
