import { Request, Response } from "express";
import Module from "@models/module";

export const createModule = async (req: Request, res: Response) => {
  try {
    const module = new Module(req.body);
    await module.save();
    res.status(201).json(module);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getModuleById = async (req: Request, res: Response) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) return res.status(404).json({ message: "Module not found" });
    res.json(module);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllModules = async (req: Request, res: Response) => {
  try {
    const modules = await Module.find();
    res.json(modules);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateModule = async (req: Request, res: Response) => {
  try {
    const updatedModule = await Module.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedModule)
      return res.status(404).json({ message: "Module not found" });
    res.json(updatedModule);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteModule = async (req: Request, res: Response) => {
  try {
    const deletedModule = await Module.findByIdAndDelete(req.params.id);
    if (!deletedModule)
      return res.status(404).json({ message: "Module not found" });
    res.json({ message: "Module deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
