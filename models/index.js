import Category from "./category.model.js";
import Order from "./order.model.js";
import Order_Item from "./orderItem.model.js";
import Product from "./product.model.js";
import User from "./user.model.js";
import sequelize from "../config/db.js";
import setting from "./setting.model.js";


Category.hasMany(Product, { foreignKey: "categoryId", onDelete:"CASCADE" });
Product.belongsTo(Category, { foreignKey: "categoryId" });

User.hasMany(Order, { foreignKey: "userId", onDelete: "CASCADE" });
Order.belongsTo(User, { foreignKey: "userId" });

Order.hasMany(Order_Item, { foreignKey: "orderId", onDelete: "CASCADE" });
Order_Item.belongsTo(Order, { foreignKey: "orderId" });

Product.hasMany(Order_Item, { foreignKey: "productId", onDelete: "CASCADE" });
Order_Item.belongsTo(Product, { foreignKey: "productId" });

export { Category, Product, User, Order, Order_Item,setting, sequelize };

