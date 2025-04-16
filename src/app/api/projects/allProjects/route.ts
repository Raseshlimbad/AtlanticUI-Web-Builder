import { connect } from "@/backend/helpers/connection";
import projects from "@/backend/models/projects";
import users from "@/backend/models/users";

//GET PROJECTS DETAIL FROM USER ARRAY NOT THE CODE BUT ONLY DETAILS - FOR DASHBOARD
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    connect();
    const user = await users.findOne({ userID: userId });

    const tempPromises = user._doc.projects.map((project: string) =>
      projects.findOne({ projectID: project }).then((project) => {
        if (project) {
          const { code, ...others } = project._doc;
          return others;
        }
      }),
    );

    const tempProjectStorage = await Promise.all(tempPromises);
    tempProjectStorage.filter((project) => project !== null);

    return Response.json(
      { msg: "PROJECT_FETCHED", data: tempProjectStorage, status: true },
      { status: 200 },
    );
  } catch (err) {
    return Response.json({ status: false, error: err }, { status: 400 });
  }
}
