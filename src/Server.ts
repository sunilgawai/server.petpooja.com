import express, { Application, NextFunction, Request,Response } from "express";
import { errorHandler } from "./middlewares";
import clientRoutes from "./routes/clientRoutes";
import authRoutes from "./routes/authRoutes";
import cors from "cors";

// Application init.
const app: Application = express();

// Middlewares.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use((req: Request, res: Response, next: NextFunction) => {
//     req.salesman
// })

// Init Routes.
app.use('/api/auth', authRoutes);
app.use('/api', clientRoutes);

app.use((req, res) => {
    if (req.path == '/') return res.json({ msg: 'Welcome to www.petpooja.com' });

    res.send(`
    <h2>No Information Foud For This Route.</h2>
    <a href="http:localhost:4000">Home Route</a>
    `)
})

// Error Handler.
app.use(errorHandler);

app.listen(4000, () => console.log(`listening on http://localhost:${4000}`));