import type { Request, Response } from "express";
import { ProjectService } from "../services/project.service.js";

export class ProjectController {
  static async getAll(req: Request, res: Response) {
    try {
      const data = await ProjectService.findAll();
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const data = await ProjectService.findById(req.params.id as string);
      if (!data) return res.status(404).json({ error: "Project not found" });
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { name, category, desc } = req.body;
      if (!name || !category || !desc) {
        return res.status(400).json({ error: "name, category, desc are required" });
      }
      const data = await ProjectService.create(req.body);
      return res.status(201).json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const data = await ProjectService.update(req.params.id as string, req.body);
      if (!data) return res.status(404).json({ error: "Project not found" });
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const data = await ProjectService.delete(req.params.id as string);
      if (!data) return res.status(404).json({ error: "Project not found" });
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
