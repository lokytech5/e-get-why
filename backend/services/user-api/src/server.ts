import express from "express";
import serverless from "serverless-http";
import { getUserById, getUserProfile, updateUser, uploadProfilePicture } from "./handler";
import { validateToken } from "../../../middleware/validateToken";
import fileUpload  from "../../../middleware/fileUploads";
import { applyMiddleware } from "../../../middleware/corsConfig"

const app = express();
const origin = "http://localhost:3000"

app.use(express.json());

app.get("/users/:userId", validateToken, getUserById);
app.get("/me", validateToken, getUserProfile);
app.put("/users/update", validateToken, updateUser);
app.post("/users/upload-profile-picture", validateToken, fileUpload.single('file'), uploadProfilePicture);
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

const expressHandler = serverless(app);

export const handler = applyMiddleware(expressHandler, origin);
