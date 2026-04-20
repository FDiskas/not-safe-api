import isPorn from 'is-porn';

const port = Number(process.env.PORT ?? 3001);

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

const isPornPromise = (url: string): Promise<boolean> =>
    new Promise((resolve, reject) => {
        isPorn(url, (error: Error | null, status: boolean) => {
            if (error) reject(error);
            else resolve(status);
        });
    });

const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

const server = Bun.serve({
    port,
    async fetch(req) {
        if (req.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers: corsHeaders });
        }

        const { pathname, searchParams } = new URL(req.url);
        if (pathname !== '/') return json({ error: 'Not found' }, 404);

        const site = searchParams.get('site');
        let hostname = '';
        try {
            hostname = new URL(site ?? '').hostname;
        } catch {
            return json({ error: 'Invalid url: example.com?site=https://delfi.lt' }, 400);
        }

        try {
            const status = await isPornPromise(hostname);
            return json({ url: hostname, status });
        } catch (error) {
            return json({ error: (error as Error).message }, 500);
        }
    },
});

console.log(`Ready http://localhost:${server.port}`);
