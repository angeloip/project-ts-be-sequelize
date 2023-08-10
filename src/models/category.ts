import { DataTypes } from 'sequelize'
import { sequelize } from '../config/connection'
import { Category } from '../interfaces/category'
import { ProductModel } from './product'

export const CategoryModel = sequelize.define<Category>(
  'category',
  {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    defaultScope: {
      attributes: { exclude: ['updatedAt'] }
    },
    tableName: 'categories'
  }
)

CategoryModel.hasMany(ProductModel)

ProductModel.belongsTo(CategoryModel)

ProductModel.addScope('category', {
  attributes: { exclude: ['categoryId', 'updatedAt'] },
  include: [
    {
      model: CategoryModel
    }
  ]
})
