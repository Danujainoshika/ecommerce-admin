import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Order_Item = sequelize.define("Order_Item", {
    quantity : {
        type : DataTypes.INTEGER,
        allowNull : false,
        validate : {min : 1}
    },
    price : {
        type : DataTypes.FLOAT,
        allowNull : false,
        validate : {min : 0}
    }
});
export default Order_Item;