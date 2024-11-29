const { Sequelize } = require("sequelize");

// 使用上面設定的資料庫和使用者
const sequelize = new Sequelize(
  "order_system",
  "order_user",
  "secure_password",
  {
    host: "localhost",
    dialect: "mariadb",
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Database connection established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

module.exports = sequelize;
