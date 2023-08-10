import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connection';
import { Category } from '../interfaces/category';
import { ProductModel } from './product';

export const CategoryModel = sequelize.define<Category>('categories', {
  _id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


CategoryModel.hasMany(ProductModel, {
  foreignKey: 'category',
  sourceKey: '_id'
});

ProductModel.belongsTo(CategoryModel, {
  foreignKey: 'category',
  targetKey: '_id',
  as: 'categoryId'
});

