import { config } from "dotenv";
config()

export const PORT = process.env.SERVERPORT || 5007
export const TOKEN_SECRET = process.env.TOKEN_SECRET
