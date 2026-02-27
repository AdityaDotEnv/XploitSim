export const getApiUrl = (port: number | string, path: string = ""): string => {
    const isProd = import.meta.env.PROD;
    // In production, we use a proxy path handled by the gateway server.
    // In development, we talk directly to the microservice ports.
    if (isProd) {
        return `/proxy/${port}${path.startsWith('/') ? '' : '/'}${path}`;
    }
    return `http://localhost:${port}${path.startsWith('/') ? '' : '/'}${path}`;
};
