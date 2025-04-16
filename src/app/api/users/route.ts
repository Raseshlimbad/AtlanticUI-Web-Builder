import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
import * as admin from 'firebase-admin';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export interface UserProps {
  _doc: string;
  userID: string;
  name: string;
  email: string;
  password: string;
  projects: string[];
}

// CREDENTIAL VALIDATION OR LOGIN

export interface UserLoginFields {
  email: string;
  password: string;
}

export interface UserRegisterFields {
  name: string;
  email: string;
  password: string;
  userID: string;
  projects?: string[]; // Make projects optional
  googleIdToken?: string;
}


// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
} else {
  admin.app();
}

// GET USER DIRECTLY
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const user = await prisma.user.findUnique({
      where: { userID: userId || '' }
    });

    if (!user) {
      return NextResponse.json(
        { msg: "INVALID_EMAIL", status: false },
        { status: 200 },
      );
    }

    const { password, ...others } = user;
    return NextResponse.json(
      { msg: "VALIDATED", data: others, status: true },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ status: false, error: error }, { status: 400 });
  }
}

// LOGIN
export async function PUT(req: NextRequest) {
  try {
    const json = await req.json();
    const body = json as UserLoginFields | null;

    if (!body || !body.email || !body.password)
      return NextResponse.json({ msg: "INVALID_REQUEST", status: false });

    const user = await prisma.user.findUnique({
      where: { email: body.email }
    });

    if (!user) {
      return NextResponse.json({ msg: "INVALID_EMAIL", status: false });
    }

    const isPassCorrect = await bcrypt.compare(body.password, user.password);
    if (!isPassCorrect) {
      return NextResponse.json({ msg: "INVALID_PASSWORD", status: false });
    }

    const { password, ...others } = user;
    return NextResponse.json({
      msg: "VALIDATED",
      data: others,
      status: true,
    });
  } catch (error) {
    return NextResponse.json({ status: false, error: error });
  }
}

// SIGN UP
export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const body = json as UserRegisterFields | null;

    if (!body || !body.email || !body.password)
      return NextResponse.json({ msg: "INVALID_REQUEST", status: false });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(body.password, salt);

    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: hash,
        userID: body.userID,
        // Remove the direct projects array assignment
      }
    });

    // If you need to create projects, do it separately
    if (body.projects && body.projects.length > 0) {
      await prisma.project.createMany({
        data: body.projects.map(projectId => ({
          projectID: projectId,
          name: "New Project",
          status: "active",
          creatorID: newUser.userID,
          code: {}
        }))
      });
    }

    const userWithProjects = await prisma.user.findUnique({
      where: { id: newUser.id },
      include: { projects: true }
    });

    const { password, ...others } = userWithProjects || newUser;
    return NextResponse.json(
      { message: "USER_CREATED", data: others, status: true },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ status: false, error: error }, { status: 400 });
  }
}
