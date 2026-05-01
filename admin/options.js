import {
  User,
  Category,
  Product,
  Order,
  Order_Item,
  setting,
} from "../models/index.js";

const isAdmin = ({ currentAdmin }) => currentAdmin?.role === "admin";

const adminOptions = {
  resources: [
    {
      resource: User,
      options: {
        navigation: "Admin",
        properties: {
          password: {
            isVisible: {
              list: false,
              show: false,
              filter: false,
              edit: true, // allow input
            },
          },
        },
        actions: {
          list: { isAccessible: isAdmin },
          new: { isAccessible: isAdmin },
          edit: { isAccessible: isAdmin },
          delete: { isAccessible: isAdmin },
        },
      },
    },

    {
      resource: setting,
      options: {
        navigation: "Admin",
        actions: {
          list: { isAccessible: isAdmin },
          new: { isAccessible: isAdmin },
          edit: { isAccessible: isAdmin },
          delete: { isAccessible: isAdmin },
        },
      },
    },

    {
      resource: Category,
      options: {
        navigation: "Shop",
        actions: {
          list: { isAccessible: true },
          new: { isAccessible: isAdmin },
          edit: { isAccessible: isAdmin },
          delete: { isAccessible: isAdmin },
        },
      },
    },

    {
      resource: Product,
      options: {
        navigation: "Shop",
        actions: {
          list: { isAccessible: true },
          new: { isAccessible: isAdmin },
          edit: { isAccessible: isAdmin },
          delete: { isAccessible: isAdmin },
        },
      },
    },

    {
      resource: Order,
      options: {
        navigation: "Shop",
        properties: {
          totalAmount: {
            isVisible: {
              list: true,
              show: true,
              edit: false, 
              filter: false,
            },
          },
        },
        actions: {
          list: {
            isAccessible: true,

            
            before: async (request, context) => {
              const { currentAdmin } = context;

              if (currentAdmin?.role !== "admin") {
                request.query = {
                  ...request.query,
                  "filters.userId": currentAdmin.id,
                };
              }

              return request;
            },
          },

          new: { isAccessible: isAdmin },
          edit: { isAccessible: isAdmin },
          delete: { isAccessible: isAdmin },
        },
      },
    },

    {
      resource: Order_Item,
      options: {
        navigation: "Shop",
        actions: {
          list: { isAccessible: isAdmin },
          new: { isAccessible: isAdmin },
          edit: { isAccessible: isAdmin },
          delete: { isAccessible: isAdmin },
        },
      },
    },
  ],

  dashboard: {
    handler: async () => {
      try {
        const [users, orders, products, revenue] = await Promise.all([
          User.count(),
          Order.count(),
          Product.count(),
          Order.sum("totalAmount"),
        ]);

        return {
          totalUsers: users,
          totalOrders: orders,
          totalProducts: products,
          totalRevenue: revenue || 0,
        };
      } catch (error) {
        console.error("Dashboard error:", error);
        return {
          message: "Error loading dashboard",
        };
      }
    },
  },
};

export default adminOptions;