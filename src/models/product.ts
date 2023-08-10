import { DataTypes } from 'sequelize'
import { sequelize } from '../config/connection'
import { Product } from '../interfaces/product'

export const ProductModel = sequelize.define<Product>(
  'product',
  {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    discountPercentage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false,
      defaultValue: 0
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    thumbnail: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {
        url: 'https://res.cloudinary.com/dzgiu2txq/image/upload/v1677945017/picture/no-image_abom6f.jpg',
        public_id: ''
      }
    }
  },
  {
    tableName: 'products'
  }
)
