import { Model, Optional } from "sequelize";


export interface CategoryAttributes {
  _id: string
  name: string
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes, '_id'> { }

export interface Category extends Model<CategoryAttributes, CategoryCreationAttributes>, CategoryAttributes { }