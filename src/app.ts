import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import loggerMiddleware from './middlewares/logger.middleware';
const app = express();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);
app.get('/', (_req, res) => {
    res.json({
        success: true,
        message: 'Auth Backend API is running',
    });
});

app.use('/api/auth', authRoutes);

export default app;