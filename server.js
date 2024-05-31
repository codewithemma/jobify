import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import { nanoid } from "nanoid";
let jobs = [
  {
    id: nanoid(),
    company: "apple",
    position: "frontend",
  },
  {
    id: nanoid(),
    company: "google",
    position: "backend",
  },
  {
    id: nanoid(),
    company: "microsoft",
    position: "fullstack dev",
  },
];

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello world");
});
app.post("/", (req, res) => {
  console.log(req);
  res.json({ message: "data received", data: req.body });
});
// GET ALL JOBS
app.get("/api/v1/jobs", (req, res) => {
  res.status(200).json({ jobs });
});
// CREATE A JOB
app.post("/api/v1/jobs", (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res
      .status(400)
      .json({ message: "please provide company and position" });
  }
  const id = nanoid(10);
  const job = { id, company, position };
  jobs.push(job);
  res.status(201).json({ jobs });
});
// GET SINGLE JOB
app.get("/api/v1/jobs/:id", (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ message: `no job with ${id}` });
  }
  res.status(200).json({ job });
});
// EDIT JOB
app.patch("/api/v1/jobs/:id", (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res
      .status(400)
      .json({ message: "please provide company and position" });
  }
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ message: `no job with ${id}` });
  }
  job.company = company;
  job.position = position;
  res.status(200).json({ job });
});
// DELETE A JOB
app.delete("/api/v1/jobs/:id", (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ message: `no job with ${id}` });
  }
  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;
  res.status(200).json({ message: "job deleted successfully", job });
});
app.use("*", (req, res) => {
  return res.status(404).json({ message: "not found" });
});
app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).json({ message: "something went wrong" });
});
const port = process.env.PORT || 5100;
app.listen(port, () => {
  console.log(`server running on PORT ${port}...`);
});
