import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Order_Item = sequelize.define("Order_Item", {
    quantity : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    price : {
        type : DataTypes.FLOAT,
        allowNull : false
    }
});
export default Order_Item;