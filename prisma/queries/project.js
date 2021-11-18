import prisma from "../../libs/prisma"

export async function Project({ id }) {
  return await prisma.projects.findUnique({
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
    where: {
      id: id,
    },
  })
}

export async function ProjectLite({ id }) {
  return await prisma.users.findUnique({
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
    where: {
      id: id,
    },
  })
}
