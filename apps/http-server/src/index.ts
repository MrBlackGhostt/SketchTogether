import express, { Request, Response } from "express";
import { client } from "@repo/db/client";
import { generateToken } from "@repo/auth/token";
import bcrypt from "bcrypt";
import { authMiddleware } from "./middleware/auth";

import { AuthRequest } from "./types";

async function generateHash(params: string) {
  const saltRound = 10;
  return await bcrypt.hash(params, saltRound);
}

async function verifyPassword(inputPassword: string, hashPassword: string) {
  return await bcrypt.compare(inputPassword, hashPassword);
}

const app = express();

app.use(express.json());

app.post("/signup", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const hashPassword = await generateHash(password);
  const user = await client.user.create({
    data: {
      name: username,
      email,
      password: hashPassword,
    },
  });
  res.status(200).send({
    message: "Signup successfull",
    id: user.id,
  });
});

app.post("/signin", async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await client.user.findFirst({
      where: { email: email },
    });

    console.log("user", user);

    if (!user) {
      res.status(404).send({ error: "User not found" });
      return;
    }

    const passwordCheck = await verifyPassword(password, user.password);

    if (!passwordCheck) {
      res.status(401).send({ error: "The password is incorrect" });
      return;
    }

    const token = generateToken(user.id);

    res.status(200).send({
      token,
    });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong with the database" });
  }
});

app.post(
  "/createroom",
  authMiddleware,
  async (req: AuthRequest, res: Response, next) => {
    try {
      const { name } = req.body;
      console.log("🚀 ~ name:", name);
      console.log("🚀 ~ user:", req.user);
      const id = req.user;
      if (!name) {
        res.status(400).json({ error: "Room name is required" });
        return;
      }
      const newRoom = await client.room.create({
        data: {
          name: name,
          ownerId: id as string,
        },
      });

      console.log("🚀 ~ newRoom:", newRoom);
      res.status(201).json(newRoom);
    } catch (error: any) {
      console.log("🚀 ~ error:", error);
      res.status(500).json({ error: error.message || "Error creating room" });
    }
  }
);

app.listen(3001, () => {
  console.log("Listining at port 3001");
});
