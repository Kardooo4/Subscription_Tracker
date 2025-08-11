import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send({ title: "All Users" });
});
userRouter.get("/:id", (req, res) => {
  res.send({ title: "Get User details" });
});
userRouter.post("/", (req, res) => {
  res.send({ title: "Create User" });
});
userRouter.put("/:id", (req, res) => {
  res.send({ title: "Update user" });
});
userRouter.delete("/:id", (req, res) => {
  res.send({ title: "Delete user" });
});

export default userRouter;
