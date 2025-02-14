import express, { Request, Response } from "express";
import { client } from "@repo/db/client";

import bcrypt from "bcrypt";
import { authMiddleware } from "./middleware/auth";

import { AuthRequest } from "./types";
import { generateToken } from "@repo/auth/token";

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
    res.status(500).json({
      message: "Something went wrong with the database",
      error: error,
    });
  }
});

app.post(
  "/createroom",
  authMiddleware,
  async (req: AuthRequest, res: Response, next) => {
    try {
      const { name } = req.body;
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
      res.status(201).json(newRoom);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Error creating room" });
    }
  }
);

// Req to Join a room

app.post(
  "/joinroom",
  authMiddleware,
  async (req: AuthRequest, res: Response, next) => {
    const { roomName } = req.body;

    try {
      const room = await client.room.findFirst({
        where: {
          name: roomName,
        },
      });
      const userId = req.user;
      if (!room) {
        res.status(401).json({
          error: "No Room available for this id",
        });
        return;
      }
      await client.roomUser.create({
        data: {
          roomId: room.id,
          userId: userId!,
        },
      });
      res.status(200).json({
        messae: "Join the room Successfull",
        roomId: room.id,
      });
    } catch (error) {}
  }
);

app.listen(3001, () => {
  console.log("Listining at port 3001");
});
