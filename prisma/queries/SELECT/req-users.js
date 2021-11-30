import prisma from "../../../libs/prisma"

export async function ReqUsers(id) {
  const query = await prisma.RequestRecruit.findMany({
    user: {
      select: {
        id: true, // ---------- Identification
        teamName: true,
        owner: true,
        avatar: true, // ------ Profile
        motto: true,
        description: true,
        xp: true,
        respect: true,
        maxMembers: true, // -- Account state
        discord: true, // ----- Social
        facebook: true,
        twitter: true,
        createdAt: true, // --- Info
        updatedAt: true,
      },
    },
    project: {
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
    },
    where: { idProject: Number(id) },
  })

  return query
}

export async function ReqUsersLite(id) {
  const query = await prisma.requestRecruit.findMany({
    include: {
      user: {
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
      },
      project: {
        select: {
          id: true, // ---------- Identification
          teamName: true,
          owner: true,
          avatar: true, // ------ Profile
          motto: true,
          description: true,
          createdAt: true, // --- Info
          updatedAt: true,
        },
      },
    },
    where: { idProject: Number(id) },
  })
  return query
}
