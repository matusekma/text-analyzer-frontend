import { Configuration, AuthApi, PipelinesApi, UploadsApi, LabelsApi, JobsApi, ASRApi} from '../client';

const configuration = new Configuration({
    basePath: `${process.env.REACT_APP_API_URL}`,
    baseOptions: { timeout: 120_000, withCredentials: true }
});

export const AUTH_API = new AuthApi(configuration);
export const PIPELINES_API = new PipelinesApi(configuration);
export const JOBS_API = new JobsApi(configuration);
export const UPLOADS_API = new UploadsApi(configuration);
export const LABELS_API = new LabelsApi(configuration);
export const ASR_API = new ASRApi(configuration);