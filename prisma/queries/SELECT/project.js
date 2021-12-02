import prisma from "../../../libs/prisma"

export async function Project(id) {
  const query = await prisma.projects.findMany({
    select: {
      id: true, // ---------- Identification
      teamName: true,
      owner: true,
      avatar: true, // ------ Profile
      motto: true,
      description: true,
      xp: true,
      country: true,
      respect: true,
      maxMembers: true, // -- Account state
      discord: true, // ----- Social
      facebook: true,
      twitter: true,
      createdAt: true, // --- Info
      updatedAt: true,
    },
    where: {
      OR: [
        { owner: { equals: Number(id) || undefined } },
        { teamName: { equals: id || undefined } },
      ],
    },
  })
  return query[0]
}

export async function ProjectLite(id) {
  const query = await prisma.projects.findMany({
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
      OR: [
        { owner: { equals: Number(id) || undefined } },
        { teamName: { equals: id || undefined } },
      ],
    },
  })
  return query[0]
}

export async function ProjectId(id) {
  const query = await prisma.projects.findMany({
    select: {
      id: true, // ---------- Identification
      teamName: true,
      owner: true,
      avatar: true, // ------ Profile
      motto: true,
      description: true,
      xp: true,
      country: true,
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
  return query[0]
}
