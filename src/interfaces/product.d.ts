import { DataTypes, Model, Optional } from 'sequelize';

interface ProductAttributes {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock: number;
  category: string; // Agrega la propiedad category
  thumbnail?: Thumbnail;
}

interface Thumbnail {
  url: string;
  public_id: string;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, '_id' | "category"> { }

export interface Product extends Model<ProductAttributes, ProductCreationAttributes>, ProductAttributes { }