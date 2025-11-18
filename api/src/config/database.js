const { Sequelize } = require("sequelize");

const DB_DIALECT = process.env.DB_DIALECT || "mysql";

let sequelize;

if (DB_DIALECT === "sqlite") {
  const DB_STORAGE = process.env.DB_STORAGE || "./data.sqlite";

  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: DB_STORAGE,
    logging: false,
  });
} else {
  const DB_NAME = process.env.DB_NAME || "trouve_ton_artisan";
  const DB_USER = process.env.DB_USER || "root";
  const DB_PASSWORD = process.env.DB_PASSWORD || "";
  const DB_HOST = process.env.DB_HOST || "127.0.0.1";

  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "mysql",
    logging: false,
  });
}

module.exports = sequelize;