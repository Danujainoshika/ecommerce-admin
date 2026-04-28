import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Order = sequelize.define("Order", {
    totalAmount : {
        type : DataTypes.FLOAT,
        allowNull : false
    },
    status : {
        type : DataTypes.ENUM("pending", "completed", "cancelled"),
        defaultValue : "pending"
    }
});

export default Order;