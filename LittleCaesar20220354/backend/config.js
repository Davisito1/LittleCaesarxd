import dotenv from "dotenv";

dotenv.config();

export const config = {
    JWT: {
        secret: process.env.JWT_Secret_key
    },
    
}