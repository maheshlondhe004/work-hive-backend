import { Request, Response } from "express";
import Project from "../models/Project";

export const createProject = async (req: Request, res: Response) => {
    const { name, description, userId } = req.body;

    try {
        const newProject = new Project({ name, description, userId });
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
