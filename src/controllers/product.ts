import { NextFunction, Request, Response } from 'express'
import { ProductModel } from '../models/product'
import { IProduct, QueryParams } from '../interfaces/product'
import data from './data.json'
import { CategoryModel } from '../models/category'
import { Op } from 'sequelize'

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
  getProductsByCategory: async (
    req: Request<{}, {}, {}, QueryParams>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name, key, order, min, max } = req.query

      const category = await CategoryModel.findOne({ where: { name } })

      if (!category)
        return res.status(404).json({ msg: 'Categoría no encontrada' })

      const validKey = key === 'name' || key === 'price' ? key : null
      const validOrder = order === 'desc' || order === 'asc' ? order : null

      let priceFilter = {}

      if (min && max)
        priceFilter = {
          price: { [Op.between]: [min, max] }
        }

      const products = await ProductModel.scope('category').findAll({
        where: {
          categoryId: category._id,
          ...priceFilter
        },
        order: validKey && validOrder ? [[validKey, validOrder]] : undefined
      })

      return res.status(200).json(products)
    } catch (error) {
      next(error)
    }
  },
  createProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productData: IProduct = req.body

      await ProductModel.create(productData)

      return res.status(201).json({ msg: 'Producto creado' })
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

      return res.status(201).json({ msg: 'Productos creados' })
    } catch (error) {
      next(error)
    }
  }
}
