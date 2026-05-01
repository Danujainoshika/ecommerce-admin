import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Category = sequelize.define("Category",{
    name : {
        type :DataTypes.STRING,
        allowNull: false,
        validate : {
            notEmpty : true,
        }
    }
})

export default Category;