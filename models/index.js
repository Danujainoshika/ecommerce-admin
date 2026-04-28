import Category from "./category.model";
import Order from "./order.model";
import Order_Item from "./orderItem.model";
import Product from "./product.model";
import User from "./user.model";
import sequelize from "../config/db.js";
import setting from "./setting.model.js";

Category.hasMany(Product, { foreignKey: "categoryId" });
Product.belongsTo(Category, { foreignKey: "categoryId" });

User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

Order.hasMany(Order_Item, { foreignKey: "orderId" });
Order_Item.belongsTo(Order, { foreignKey: "orderId" });

Product.hasMany(Order_Item, { foreignKey: "productId" });
Order_Item.belongsTo(Product, { foreignKey: "productId" });

export { Category, Product, User, Order, Order_Item,setting, sequelize };

