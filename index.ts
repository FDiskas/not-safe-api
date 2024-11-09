import express from 'express';
import cors from 'cors';
import isPorn from 'is-porn';

const app = express();
const port = process.env.PORT ?? 3001;

app.use(cors());

const isPornPromise = (url) => new Promise((resolve, reject) => {
    isPorn(url, (error, status) => {
        if (error) reject(error);
        else resolve(status);
    });
});

app.get('/', async (req, res, next) => {
    const { site } = req.query;
    let url = '';

    try {
        url = new URL(site).hostname;
    } catch (error) {
        return res.status(400).json({ error: 'Invalid url' });
    }

    try {
        const status = await isPornPromise(url);
        return res.json({ url, status });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
  console.log(`Ready http://localhost:${port}`);
});
