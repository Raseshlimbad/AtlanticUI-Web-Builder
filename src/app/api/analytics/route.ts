import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AnalyticsProps {
  analyticsId: string;
  timestamps: Date[];
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as AnalyticsProps | null;

    if (!body) return Response.json({ msg: "INVALID_REQUEST", status: false });

    const newAnalytics = await prisma.analytics.create({
      data: {
        analyticsId: body.analyticsId,
        timestamps: body.timestamps || [],
      }
    });

    return Response.json(
      { message: "ANALYTICS_CREATED", data: newAnalytics, status: true },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ status: false, error: error }, { status: 400 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const analyticsId = searchParams.get("analyticsId");

    if (!analyticsId) {
      return Response.json(
        { msg: "INVALID_REQUEST", status: false },
        { status: 200 }
      );
    }

    const analyticsData = await prisma.analytics.findUnique({
      where: { analyticsId }
    });

    if (analyticsData) {
      return Response.json({ data: analyticsData }, { status: 200 });
    }

    return Response.json(
      { msg: "ANALYTICS_NOT_FOUND", status: false },
      { status: 404 }
    );
  } catch (error) {
    return Response.json({ status: false, error: error }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const analyticsId = searchParams.get("analyticsId");

    if (!analyticsId) {
      return Response.json(
        { msg: "INVALID_REQUEST", status: false },
        { status: 200 }
      );
    }

    const analyticsData = await prisma.analytics.findUnique({
      where: { analyticsId }
    });

    if (analyticsData) {
      const updatedAnalytics = await prisma.analytics.update({
        where: { analyticsId },
        data: {
          timestamps: {
            push: new Date()
          }
        }
      });

      return Response.json(
        { msg: "ANALYTICS_UPDATED", data: updatedAnalytics, status: true },
        { status: 200 }
      );
    }

    return Response.json(
      { msg: "ANALYTICS_NOT_FOUND", status: false },
      { status: 404 }
    );
  } catch (error) {
    return Response.json({ msg: "ERROR", status: false }, { status: 400 });
  }
}
