// import mongoose from "mongoose";

// //MongoDB CONNECTION
// export const connect = async () => {
//   if (mongoose.connections[0].readyState) {
//     return true;
//   }
//   try {
//     if (process.env.MONGODB_URI) {
//       await mongoose.connect(process.env.MONGODB_URI);
//       return true;
//     } else {
//       throw Error("MongoDB URI not found");
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };
