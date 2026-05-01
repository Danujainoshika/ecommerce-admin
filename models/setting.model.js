import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const setting  = sequelize.define("Setting", {
        key : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true
        },
        value : {  
            type : DataTypes.STRING,
            allowNull : false
        }
    },{
        timestamps : true
    }
);

export default setting;