import { connect } from "@/backend/helpers/connection";
import users from "@/backend/models/users";
import bcrypt from "bcrypt";
import * as admin from 'firebase-admin';
import { NextRequest, NextResponse } from 'next/server';

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
  projects: string[];
  googleIdToken?: string;
}


// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // Use your credentials here
  });
} else {
  admin.app(); // Use the default app
}

// Verify Google ID Token
const verifyIdToken = async (idToken: string) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    console.error("Error verifying ID token:", error);
    return null;
  }
};

// GET USER DIRECTLY
export async function GET(req:NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    connect();
    const user = await users.findOne({ userID: userId });
    if (!user) {
      return NextResponse.json(
        { msg: "INVALID_EMAIL", status: false },
        { status: 200 },
      );
    } else {
      const { password, ...others } = user._doc;
      return NextResponse.json(
        { msg: "VALIDATED", data: { ...others }, status: true },
        { status: 200 },
      );
    }
  } catch (error) {
    return NextResponse.json({ status: false, error: error }, { status: 400 });
  }
}

// LOGIN
export async function PUT(req: NextRequest) {
  try {
    const json = await req.json();

    // Type assertion to UserLoginFields or null
    const body = json as UserLoginFields | null;

    if (!body || !body.email || !body.password)
      return NextResponse.json({ msg: "INVALID_REQUEST", status: false });

    connect();
    const enteredPassword = body.password;
    const enteredEmail = body.email;

    const user = await users.findOne({ email: enteredEmail });
    const { password, ...others } = user?._doc;

    if (!user) {
      return NextResponse.json({ msg: "INVALID_EMAIL", status: false });
    } else {
      const isPassCorrect = await bcrypt.compare(enteredPassword, password);
      if (!isPassCorrect) {
        return NextResponse.json({ msg: "INVALID_PASSWORD", status: false });
      } else {
        return NextResponse.json({
          msg: "VALIDATED",
          data: { ...others },
          status: true,
        });
      }
    }
  } catch (error) {
    return NextResponse.json({ status: false, error: error });
  }
}

// SIGN UP
export async function POST(req:NextRequest) {
  try {
    const json = await req.json();

    // Type assertion to UserLoginFields or null
    const body = json as UserRegisterFields | null;

    if (!body || !body.email || !body.password)
      return NextResponse.json({ msg: "INVALID_REQUEST", status: false });

    connect();
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(body.password, salt);
    const newUser = new users({
      ...body,
      password: hash,
    });
    await newUser.save();
    const { password, ...others } = newUser._doc;
    return NextResponse.json(
      { message: "USER_CREATED", data: { ...others }, status: true },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ status: false, error: error }, { status: 400 });
  }
}



// SIGN UP or Google login/signup
// export async function POST(req: NextRequest) {
//   try {
//     const json = await req.json();
//     const body = json as UserRegisterFields | null;

//     try {
//        // Handle Google Login/Signup
//     if (body?.googleIdToken) {
//       // Verify the Google idToken using Firebase Admin SDK
//       // const googleUser = await verifyIdToken(body.googleIdToken);
//       const googleUser = await admin.auth().verifyIdToken(body.googleIdToken);
//       console.log("Google User:", googleUser);
//       if (!googleUser) {
//         return NextResponse.json({ msg: "INVALID_GOOGLE_TOKEN", status: false }, { status: 400 });
//       }

//       // Check if the user already exists in the DB (you can use email or UID for uniqueness)
//       const existingUser = await users.findOne({ email: googleUser.email });
//       if (existingUser) {
//         // If user already exists, send back the user data (no need to create a new user)
//         return NextResponse.json({ message: "USER_EXISTS", data: existingUser, status: true }, { status: 200 });
//       }

//       // If user does not exist, create a new user using Google info
//       const newUser = new users({
//         email: googleUser.email,
//         name: googleUser.name, // Using the user's name from Google
//         password: "", // No password required for Google login
//         userID: googleUser.uid, // Google UID as userID
//         projects: [], // No projects for Google users by default, you can modify this if needed
//         googleId: googleUser.uid, // Store the Google UID
//       });
//       await newUser.save();

//       return NextResponse.json({ message: "USER_CREATED", data: newUser, status: true }, { status: 200 });
//     }
      
//     } catch (error) {
//       console.log("Error in Google auth:", error)
//       return NextResponse.json({ status: false, error: error }, { status: 400 });
//     }
   

//     // Handle regular signup (email/password)
//     if (!body || !body.email || !body.password || !body.name || !body.userID || !Array.isArray(body.projects)) {
//       return NextResponse.json({ msg: "INVALID_REQUEST", status: false }, { status: 400 });
//     }

//     // Regular signup with email/password
//     connect();
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(body.password, salt);
//     const newUser = new users({
//       ...body,
//       password: hash,
//     });
//     await newUser.save();
//     const { password, ...others } = newUser._doc;

//     return NextResponse.json(
//       { message: "USER_CREATED", data: { ...others }, status: true },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json({ status: false, error: error }, { status: 400 });
//   }
// }
