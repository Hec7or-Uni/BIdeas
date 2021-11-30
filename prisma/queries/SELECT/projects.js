import prisma from "../../../libs/prisma"

export async function Projects() {
  const query = await prisma.projects.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
      {
        updatedAt: "desc",
      },
    ],
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
  })
  return query
}

export async function ProjectsLite() {
  const query = await prisma.projects.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
      {
        updatedAt: "desc",
      },
    ],
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
  })
  return query
}
