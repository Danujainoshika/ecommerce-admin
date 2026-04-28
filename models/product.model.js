import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Product = sequelize.define("Product",{
    name : {
        type : DataTypes.STRING,
        allowNull:false
    },
    price : {
        type :DataTypes.FLOAT,
        allowNull:false
    },
    stock : {
        type : DataTypes.INTEGER,
        defaultValue : 0
    }

});

export default Product;

