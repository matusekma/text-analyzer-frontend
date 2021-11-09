import { EditUploadRequest, UploadTextRequest } from "../client";
import { UPLOADS_API } from "../client/client";

export const getUploadPage = (
    page: number,
    pageSize: number,
    column?: string,
    direction: string = 'ASC'
) => {
    return UPLOADS_API.getUploads(
        page,
        pageSize,
        column ? `${column},${direction}` : undefined
    ).then((res) => res.data)
}

export const getUploadCall = (
    uploadId: number
) => {
    return UPLOADS_API.getUpload(uploadId).then((res) => res.data)
}

export function uploadTextCall(uploadTextRequest: UploadTextRequest) {
    return UPLOADS_API.uploadText(uploadTextRequest).then(res => res.data)
}

export function editUploadCall(uploadId: number, editUploadRequest: EditUploadRequest) {
    return UPLOADS_API.editUpload(uploadId, editUploadRequest).then(res => res.data)
}

export function deleteUploadCall(uploadId: number) {
    return UPLOADS_API.deleteUpload(uploadId)
}