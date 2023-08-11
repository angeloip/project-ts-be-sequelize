import { DataTypes, Model, Optional } from 'sequelize'

export interface IProduct extends ProductAttributes {
  category: string
}

interface ProductAttributes {
  _id: string
  name: string
  description: string
  price: number
  discountPercentage?: number
  rating?: number
  stock: number
  categoryId?: string
  thumbnail?: Thumbnail
}

interface Thumbnail {
  url: string
  public_id: string
}

interface ProductCreationAttributes
  extends Optional<ProductAttributes, '_id'> {}

export interface Product
  extends Model<ProductAttributes, ProductCreationAttributes>,
    ProductAttributes {}

export interface QueryParams {
  name: string
  key: string
  order: string
  min: string
  max: string
}
