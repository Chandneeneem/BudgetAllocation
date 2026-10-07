import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import loggerMiddleware from './middlewares/logger.middleware';
import yearRoutes from './routes/year.routes';
import programRoutes from './routes/program.routes';


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
app.use('/api/years', yearRoutes);
app.use('/api/programs', programRoutes);
export default app;