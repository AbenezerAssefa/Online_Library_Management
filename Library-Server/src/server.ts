import express, { Request, Response } from 'express';
import cors from 'cors';
import { config } from './config'; 
import mongoose from 'mongoose';
import { registerRoutes } from './routes';

const PORT = config.server.port; 
const app = express();

app.use(express.json());  
app.use(cors());         

(async function startup() {
    try {
    
        await mongoose.connect(config.mongo.url, {
            authMechanism: "DEFAULT",
            retryWrites: true,
        });
        console.log("Connection to MongoDB successfully made");

        registerRoutes(app);

        app.get("/health", (req: Request, res: Response) => {
            res.status(200).json({ message: "Server is running properly" });
        });

        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    } catch (error) {
        console.log("Could not make a connection to the database", error);
    }
})();//
