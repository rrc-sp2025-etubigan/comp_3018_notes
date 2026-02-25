import express, { Express } from "express";
import {
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorHandler";
// import the item routes from the new routes file
import itemRouter from "./api/v1/routes/itemRoutes";
import userRouter from "./api/v1/routes/userRoutes";
import adminRouter from "./api/v1/routes/adminRoutes";

const app: Express = express();

// Logging middleware (should be applied early in the middleware stack)
if (process.env.NODE_ENV === "production") {
    // In production, log to files
    app.use(accessLogger);
    app.use(errorLogger);
} else {
    // In development, log to console for immediate feedback
    app.use(consoleLogger);
}

app.use(express.json());

// Route handler for items
app.use("/api/v1/items", itemRouter);

// Route handler for users
app.use("/api/v1/users", userRouter);

// Route handler for admins
app.use("/api/v1/admin", adminRouter);

// Global error handling middleware (MUST be applied last)
app.use(errorHandler);

// Export the app
export default app;
