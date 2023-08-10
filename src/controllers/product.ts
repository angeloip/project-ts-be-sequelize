import { NextFunction, Request, Response } from 'express'

import { ProductModel } from '../models/product';

export const productController = {
  getProducts: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await ProductModel.findAll();
      return res.status(200).json(products)
    } catch (error) {
      next(error)
    }
  },
}
