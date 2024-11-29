import { createConnection } from 'mysql2/promise'

const newConnection = async () => {
    try {
        const config = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        };
        const connection = await createConnection(config);
        console.log("Database has been connected successfully.");
        return connection;
    } catch (error) {
        console.log(`database connection failed:`, error.message);
        process.exit(1);
    }
};

export default newConnection;