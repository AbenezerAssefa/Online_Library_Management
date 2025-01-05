import { Express, Request, Response } from 'express'; // Corrected import syntax
import authRoutes from './AuthRoutes'; // Fixed the import path
import UserRoutes from "./UserRoutes";
import bookRoutes from "./BookRoutes";
import cardRoutes from "./LibraryCardRoutes"
import loanRoutes from "./LoanRecordRoutes";


export function registerRoutes(app: Express) {
    app.get("/health", (req: Request, res: Response) => {
        res.status(200).json({ message: "Server is running properly" });
    });
    app.use("/auth", authRoutes); // Fixed the syntax error here
    app.use("/users", UserRoutes);
    app.use("/book", bookRoutes);
    app.use("/card", cardRoutes);
    app.use("/loan", loanRoutes);
}

