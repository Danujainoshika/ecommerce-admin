import { User, Category , Product , Order , Order_Item , setting } from "../models/index.js";

const adminOptions = {
    resources : [
        {
            resource : User,
            options : {
                properties : {
                    password : { isVisible : false }
                },
                isAccessible : ({ currentAdmin})=>currentAdmin?.role === "admin",
            }
        },
        {
            resource : setting,
            options : {
                isAccessible : ({ currentAdmin})=>currentAdmin?.role === "admin",
            }
        },
        {resource : Category},
        {resource : Product},
        {resource : Order},
        {resource : Order_Item}
        
    ],
    dashboard : {
        handler : async (request , response , context)=>{
            const {currentAdmin} = context;
            if(currentAdmin?.role !== "admin"){
                const userCount = await User.count();
                const orderCount = await Order.count();
                const productCount = await Product.count();

                return {
                    totalUsers : userCount,
                    totalOrders : orderCount,
                    totalProducts : productCount ,   
                    message : "Welcome to the Admin Dashboard"
                };
            }
            return{message :`Welcome ${currentAdmin.email} you can manage the store here`}

            
        }
        
    }
}

export default adminOptions;