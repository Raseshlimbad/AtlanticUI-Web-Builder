import { PrismaClient } from '@prisma/client';
import { EditorElement } from "@/context/Editor/EditorProvider";
import { NextRequest } from 'next/server';

const prisma = new PrismaClient();

export interface ProjectProps {
  projectID: string;
  name: string;
  status: string;
  creatorID: string;
  code: EditorElement;
}

const validateAccess = async (projectId: string, authorId: string) => {
  const project = await prisma.project.findUnique({
    where: { projectID: projectId }
  });

  if (!project) {
    return { msg: "INVALID_PROJECT", data: null };
  }
  
  const getValidated = project.creatorID === authorId;
  if (!getValidated) {
    return { msg: "INVALID_REQUEST", data: null };
  }
  
  return { msg: "VALID_REQUEST", data: project };
};

const createProjectFromUser = async (userId: string, projectId: string) => {
  await prisma.user.update({
    where: { userID: userId },
    data: {
      projects: {
        connect: { projectID: projectId }
      }
    }
  });
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ProjectProps | null;

    if (!body) return Response.json({ msg: "INVALID_REQUEST", status: false });

    const newProject = await prisma.project.create({
      data: {
        projectID: body.projectID,
        name: body.name,
        status: body.status,
        creatorID: body.creatorID,
        code: body.code as any,
      }
    });

    await createProjectFromUser(body.creatorID, newProject.projectID);
    return Response.json(
      { message: "PROJECT_CREATED", data: newProject, status: true },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ status: false, error: error }, { status: 400 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");
    const authorId = searchParams.get("authorId");

    if (!projectId || !authorId) {
      return Response.json(
        { msg: "INVALID_REQUEST", status: false },
        { status: 200 }
      );
    }

    const validationResponse = await validateAccess(projectId, authorId);
    return Response.json(
      {
        msg: validationResponse.msg,
        data: validationResponse.data,
        status: validationResponse.msg === "VALID_REQUEST"
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ status: false, error: error }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");
    const authorId = searchParams.get("authorId");
    const body = await req.json();

    if (!projectId || !authorId || !body) {
      return Response.json(
        { msg: "INVALID_REQUEST", status: false },
        { status: 200 }
      );
    }

    const validationResponse = await validateAccess(projectId, authorId);
    if (validationResponse.msg !== "VALID_REQUEST") {
      return Response.json(
        { error: validationResponse.msg, status: false },
        { status: 200 }
      );
    }

    const updatedProject = await prisma.project.update({
      where: { projectID: projectId },
      data: body
    });

    return Response.json(
      { msg: "PROJECT_UPDATED", data: updatedProject, status: true },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ msg: "ERROR", status: false }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");
    const authorId = searchParams.get("authorId");

    if (!projectId || !authorId) {
      return Response.json(
        { error: "INVALID_REQUEST", status: false },
        { status: 200 }
      );
    }

    const validationResponse = await validateAccess(projectId, authorId);
    if (validationResponse.msg !== "VALID_REQUEST") {
      return Response.json(
        { error: validationResponse.msg, status: false },
        { status: 200 }
      );
    }

    await prisma.project.delete({
      where: { projectID: projectId }
    });

    await prisma.user.update({
      where: { userID: authorId },
      data: {
        projects: {
          disconnect: { projectID: projectId }
        }
      }
    });

    return Response.json(
      { msg: "PROJECT_DELETED", status: true },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ status: false, error: error }, { status: 400 });
  }
}
