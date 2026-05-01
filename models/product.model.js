import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Product = sequelize.define("Product",{
    name : {
        type : DataTypes.STRING,
        allowNull:false,
        validate :{ notEmpty : true }
    },
    description:{
        type : DataTypes.TEXT,
    },
    price : {
        type :DataTypes.FLOAT,
        allowNull:false,
        validate : {min : 0}
    },
    stock : {
        type : DataTypes.INTEGER,
        defaultValue : 0,
        validate : {min : 0}

    },
    categoryId: {
  type: DataTypes.INTEGER,
  allowNull: true
}

});

export default Product;

