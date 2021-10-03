import { Configuration, AuthApi, PipelinesApi, UploadsApi } from '../client';

const configuration = new Configuration({
    basePath: `${process.env.REACT_APP_API_URL}`,
    baseOptions: { timeout: 15000, withCredentials: true }
});

export const AUTH_API = new AuthApi(configuration);
export const PIPELINES_API = new PipelinesApi(configuration);
export const UPLOADS_API = new UploadsApi(configuration);

