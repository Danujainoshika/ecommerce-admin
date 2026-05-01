import AdminJS from "adminjs";
import AdminJSSequelize from "@adminjs/sequelize";
import adminOptions from "../admin/options.js";
import AdminJSExpress from "@adminjs/express";
import bcrypt from "bcrypt";
import { User } from "../models/index.js";

AdminJS.registerAdapter(AdminJSSequelize);

const admin = new AdminJS(adminOptions)

export const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin,{
    authenticate: async (email, password) => {
        try {
            const user = await User.findOne({ where: { email } });

            if(user){
                const isPasswordMatch = await bcrypt.compare(password, user.password);
                if(isPasswordMatch){
                    return { email: user.email, role: user.role,id: user.id };
                }
            }
            return null;
        } catch (error) {
            console.error("Error during authentication:", error);
            return null;
        }
        
    },
    cookieName: "adminjs",
    cookiePassword: process.env.ADMIN_COOKIE_SECRET 
});