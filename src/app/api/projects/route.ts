import { connect } from "@/backend/helpers/connection";
import projects from "@/backend/models/projects";
import users from "@/backend/models/users";
import { EditorElement } from "@/context/Editor/EditorProvider";

export interface ProjectProps {
  projectID: string;
  name: string;
  status: string;
  creatorID: string;
  code: EditorElement;
}

const validateAccess = async (projectId: string, authorId: string) => {
  const project = await projects.findOne({ projectID: projectId });

  if (!project) {
    return { msg: "INVALID_PROJECT", data: null };
  } else {
    const getValidated = project.creatorID === authorId;
    if (!getValidated) {
      return { msg: "INVALID_REQUEST", data: null };
    } else {
      return { msg: "VALID_REQUEST", data: project._doc };
    }
  }
};

// PROJECT REMOVAL FROM USER ARRAY AFTER DELETION
const createProjectFromUser = async (userId: string, projectId: string) => {
  const user = await users.findOne({ userID: userId });
  if (user) {
    var updatedProject = [...user.projects, projectId];
    const { projects, ...updatedUser } = user._doc;

    await users.findOneAndUpdate(
      { userID: userId },
      { $set: { ...updatedUser, projects: updatedProject } },
    );
  }
};

// CREATE PROJECT
export async function POST(req: Request) {
  try {
    const json = await req.json();

    // Type assertion to UserLoginFields or null
    const body = json as ProjectProps | null;

    if (!body) return Response.json({ msg: "INVALID_REQUEST", status: false });

    connect();
    const newProject = new projects({
      ...body,
    });
    await newProject.save();
    await createProjectFromUser(body.creatorID, newProject.projectID);
    return Response.json(
      { message: "PROJECT_CREATED", data: newProject, status: true },
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
    const projectId = searchParams.get("projectId");
    const authorId = searchParams.get("authorId");
    connect();

    if (!projectId || !authorId) {
      return Response.json(
        { msg: "INVALID_REQUEST", status: false },
        { status: 200 },
      );
    }
    const validationResponse = await validateAccess(projectId, authorId);
    if (validationResponse.msg === "INVALID_PROJECT") {
      return Response.json(
        { error: "INVALID_PROJECT", status: false },
        { status: 200 },
      );
    } else if (validationResponse.msg === "INVALID_REQUEST") {
      return Response.json(
        { error: "INVALID_REQUEST", status: false },
        { status: 200 },
      );
    } else if (validationResponse.msg === "VALID_REQUEST") {
      return Response.json(
        {
          msg: "VALIDATED",
          data: validationResponse.data,
          status: true,
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
    const projectId = searchParams.get("projectId");
    const authorId = searchParams.get("authorId");
    const body = await req.json();
    if (!projectId || !authorId || !body) {
      return Response.json(
        { msg: "INVALID_REQUEST", status: false },
        { status: 200 },
      );
    }
    connect();

    const validationResponse = await validateAccess(projectId, authorId);
    if (validationResponse.msg === "INVALID_PROJECT") {
      return Response.json(
        { error: "INVALID_PROJECT", status: false },
        { status: 200 },
      );
    } else if (validationResponse.msg === "INVALID_REQUEST") {
      return Response.json(
        { error: "INVALID_REQUEST", status: false },
        { status: 200 },
      );
    } else if (validationResponse.msg === "VALID_REQUEST") {
      //After Validation it updates
      const updatedProject = await projects.findOneAndUpdate(
        { projectID: projectId },
        { $set: body },
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

// DELETE A PROJECT

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");
    const authorId = searchParams.get("authorId");

    if (!projectId || !authorId) {
      return Response.json(
        { error: "INVALID_REQUEST", status: false },
        { status: 200 },
      );
    }
    connect();
    const validationResponse = await validateAccess(projectId, authorId);

    if (validationResponse.msg === "INVALID_PROJECT") {
      return Response.json(
        { error: "INVALID_PROJECT", status: false },
        { status: 200 },
      );
    } else if (validationResponse.msg === "INVALID_REQUEST") {
      return Response.json(
        { error: "INVALID_REQUEST", status: false },
        { status: 200 },
      );
    } else if (validationResponse.msg === "VALID_REQUEST") {
      //After Validation it updates

      const deletedUser = await projects.findOneAndDelete({
        projectID: projectId,
      });

      if (deletedUser) {
        await deleteProjectFromUser(authorId, projectId);
        return Response.json(
          { msg: "PROJECT_DELETED", status: true },
          { status: 200 },
        );
      }
    }
  } catch (error) {
    return Response.json({ status: false, error: error }, { status: 400 });
  }
}
// PROJECT REMOVAL FROM USER ARRAY AFTER DELETION

const deleteProjectFromUser = async (userId: string, projectId: string) => {
  const user = await users.findOne({ userID: userId });
  const { projects, ...userOther } = user._doc;
  if (user) {
    const updatedProjectsArray = user._doc.projects.filter(
      (project: string) => project !== projectId,
    );

    await users.findOneAndUpdate(
      { userID: userId },
      { $set: { ...userOther, projects: updatedProjectsArray } },
    );
  }
};
