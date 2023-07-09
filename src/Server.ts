import express, { Application } from "express";
import { errorHandler } from "./middlewares";
import clientRoutes from "./routes/clientRoutes";
import authRoutes from "./routes/authRoutes";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

// Application init.
const app: Application = express();

// Middlewares.
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "DELETE", "GET"],
    credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

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