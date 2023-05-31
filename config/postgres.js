import dotenv from 'dotenv'
dotenv.config()

export default {
  user: "postgres",
  host: "localhost",
  database: "ems",
  password: process.env.POSTGRES_PASSWORD,
  port: 5432
}
