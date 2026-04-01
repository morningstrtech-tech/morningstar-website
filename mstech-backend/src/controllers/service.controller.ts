import type { Request, Response } from "express";
import { ServicePackageService } from "../services/service.service.js";

export class ServiceController {
  static async getAll(req: Request, res: Response) {
    try {
      const data = await ServicePackageService.findAll();
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const data = await ServicePackageService.findById(req.params.id as string);
      if (!data) return res.status(404).json({ error: "Service not found" });
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { name, price } = req.body;
      if (!name || !price) {
        return res.status(400).json({ error: "name and price are required" });
      }
      const data = await ServicePackageService.create(req.body);
      return res.status(201).json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const data = await ServicePackageService.update(req.params.id as string, req.body);
      if (!data) return res.status(404).json({ error: "Service not found" });
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const data = await ServicePackageService.delete(req.params.id as string);
      if (!data) return res.status(404).json({ error: "Service not found" });
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
