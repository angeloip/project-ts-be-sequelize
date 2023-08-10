import { NextFunction, Request, Response } from 'express'
import { ProductModel } from '../models/product'
import { IProduct } from '../interfaces/product'
import data from './data.json'

export const productController = {
  getProducts: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await ProductModel.scope('category').findAll()
      return res.status(200).json(products)
    } catch (error) {
      next(error)
    }
  },
  getProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const product = await ProductModel.scope('category').findByPk(id)

      if (!product)
        return res.status(404).json({ msg: 'Producto no existente' })

      return res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  },
  createProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productData: IProduct = req.body
      console.log(productData)
      await ProductModel.create(productData)

      res.status(201).json({ msg: 'Producto creado' })
    } catch (error) {
      next(error)
    }
  },
  updateProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const productData: IProduct = req.body

      const product = await ProductModel.findByPk(id)

      if (!product)
        return res.status(404).json({ msg: 'Producto no existente' })

      await product.update(productData)

      return res.status(200).json({ msg: 'Producto actualizado' })
    } catch (error) {
      next(error)
    }
  },
  deleteProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params

      const product = await ProductModel.findByPk(id)

      if (!product)
        return res.status(404).json({ msg: 'Producto no existente' })

      await product.destroy()

      return res.status(200).json({ msg: 'Producto eliminado' })
    } catch (error) {
      next(error)
    }
  },
  createProducts: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      await ProductModel.bulkCreate(data)

      res.status(201).json({ msg: 'Productos creados' })
    } catch (error) {
      next(error)
    }
  }
}
