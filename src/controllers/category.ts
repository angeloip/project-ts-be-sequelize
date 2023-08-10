import { NextFunction, Request, Response } from 'express'
import { CategoryAttributes } from '../interfaces/category';
import { CategoryModel } from '../models/category';

export const categoryController = {
  getCategories: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await CategoryModel.findAll();
      return res.json(categories);
    } catch (error) {
      next(error)
    }
  },
  getCategory: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const category = await CategoryModel.findByPk(id);

      if (!category) return res.status(404).json({ msg: "Categoría no existente" })

      return res.status(200).json(category);
    } catch (error) {
      next(error)
    }
  },
  createCategory: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name }: CategoryAttributes = req.body;
      await CategoryModel.create({ name });

      res.status(201).json({ msg: "Categoría creada" });
    } catch (error) {
      next(error)
    }
  },
  updateCategory: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { name }: CategoryAttributes = req.body;

      const category = await CategoryModel.findByPk(id);

      if (!category) return res.status(404).json({ msg: "Categoría no existente" })

      await category.update({ name });

      return res.status(200).json({ msg: "Categoría actualizada" });
    } catch (error) {
      next(error)
    }
  },
  deleteCategory: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const category = await CategoryModel.findByPk(id);

      if (!category) return res.status(404).json({ msg: "Categoría no existente" })

      await category.destroy();

      return res.status(200).json({ msg: "Categoría eliminada" });
    } catch (error) {
      next(error)
    }
  }
}
