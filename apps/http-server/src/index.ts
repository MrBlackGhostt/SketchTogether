import express, { Request, Response } from "express";
import { client } from "@repo/db/client";
import { generateToken } from "@repo/auth/token";

const app = express();

app.use(express.json());

app.post("/signup", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const user = await client.user.create({
    data: {
      name: username,
      email,
      password,
    },
  });
  res.status(200).send({
    message: "Signup successfull",
    id: user.id,
  });
});

app.post("/signin", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await client.user.findFirst({
      where: {
        email: email,
      },
    });
    if (user) {
      const token = generateToken(user.id);
      res.status(200).send({
        token,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(404).send({
        error: "User not found",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Something Went wrong with database",
    });
  }
});

app.listen(3001, () => {
  console.log("Listining at port 3001");
});
