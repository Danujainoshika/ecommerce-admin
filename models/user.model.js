import { DataTypes } from "sequelize";
import sequelize  from "../config/db.js";
import bcrypt from "bcrypt";
import e from "express";

const User = sequelize.define("User", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role:{
        type: DataTypes.ENUM("admin", "user"),
        defaultValue: "user",
    }


    

});

User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});


export default User;