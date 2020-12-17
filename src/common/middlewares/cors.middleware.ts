import cors from 'cors';

export function corsMiddleware(): void {
    const config = {
        credentials: true,
        origin: true
    }

    cors(config);
}