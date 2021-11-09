import { PipelineStartRequest, SingleJobStartRequest } from "../client";
import { PIPELINES_API, JOBS_API } from "../client/client";

export const getPipelinePage = (
    page: number,
    pageSize: number,
    column?: string,
    direction: string = 'ASC'
) => {
    return PIPELINES_API.getPipelines(
        page,
        pageSize,
        column ? `${column},${direction}` : undefined
    ).then((res) => res.data)
}

export function launchPipelineCall(pipelineStartRequest: PipelineStartRequest) {
    return PIPELINES_API.launchPipeline(pipelineStartRequest).then(res => res.data)
}

export function runJobCall(singleJobStartRequest: SingleJobStartRequest) {
    return JOBS_API.runJob(singleJobStartRequest).then(res => res.data)
}