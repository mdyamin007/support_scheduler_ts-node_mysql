import dotenv from "dotenv"

if (process.env.NODE_ENV === 'production') {
	dotenv.config({ path: '.env.prod' });
} else {
	dotenv.config({ path: '.env' });
}

export default {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    DB: "support_scheduler"
  };