import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.post("signup", (req: Request, res: Response) => {
  const { username, password } = req.body;
  res.status(200).send({
    username,
    password,
  });
});

app.listen(3001, () => {
  console.log("Listining at port 3000");
});
