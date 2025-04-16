import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//GET PROJECTS DETAIL FROM USER ARRAY NOT THE CODE BUT ONLY DETAILS - FOR DASHBOARD
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return Response.json(
        { msg: "INVALID_REQUEST", status: false },
        { status: 200 }
      );
    }

    const projects = await prisma.project.findMany({
      where: {
        creatorID: userId
      },
      select: {
        id: true,
        projectID: true,
        name: true,
        status: true,
        creatorID: true,
        createdAt: true,
        updatedAt: true,
        code: false // Excluding the code field
      }
    });

    return Response.json(
      { msg: "PROJECT_FETCHED", data: projects, status: true },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ status: false, error: err }, { status: 400 });
  }
}
