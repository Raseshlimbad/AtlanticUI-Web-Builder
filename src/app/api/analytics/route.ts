import { connect } from "@/backend/helpers/connection";
import analytics from "@/backend/models/analytics";

export interface AnalyticsProps {
  analyticsId: string;
  timestamp: string[];
}

// CREATE PROJECT
export async function POST(req: Request) {
  try {
    const json = await req.json();

    // Type assertion to UserLoginFields or null
    const body = json as AnalyticsProps | null;

    if (!body) return Response.json({ msg: "INVALID_REQUEST", status: false });

    connect();
    const newAnalytics = new analytics({
      ...body,
    });
    await newAnalytics.save();
    return Response.json(
      { message: "PROJECT_CREATED", data: newAnalytics, status: true },
      { status: 200 },
    );
  } catch (error) {
    return Response.json({ status: false, error: error }, { status: 400 });
  }
}

// VIEW A PROJECT
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const analyticsId = searchParams.get("analyticsId");

    connect();

    if (!analyticsId) {
      return Response.json(
        { msg: "INVALID_REQUEST", status: false },
        { status: 200 },
      );
    }

    const analyticsData = await analytics.findOne({ analyticsId: analyticsId });

    if (analyticsData) {
      return Response.json(
        {
          data: analyticsData,
        },
        { status: 200 },
      );
    }
  } catch (error) {
    return Response.json({ status: false, error: error }, { status: 400 });
  }
}

//EDIT PROJECT
export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const analyticsId = searchParams.get("analyticsId");

    connect();

    if (!analyticsId) {
      return Response.json(
        { msg: "INVALID_REQUEST", status: false },
        { status: 200 },
      );
    }

    const analyticsData = await analytics.findOne({ analyticsId: analyticsId });

    if (analyticsData) {
      const updatedProject = await analytics.findOneAndUpdate(
        { analyticsId: analyticsId },
        {
          $set: {
            timestamps: [
              ...analyticsData.timestamps,
              new Date().toLocaleString(),
            ],
          },
        },
      );
      return Response.json(
        { msg: "PROJECT_UPDATED", data: updatedProject, status: true },
        { status: 200 },
      );
    }
  } catch (error) {
    return Response.json({ msg: "ERROR", status: false }, { status: 400 });
  }
}
