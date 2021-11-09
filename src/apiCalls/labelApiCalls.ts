import { CreateLabelRequest } from "../client";
import { LABELS_API } from "../client/client";

export function getLabelsCall() {
    return LABELS_API.getLabels().then(res => res.data)
}

export function createLabelCall(createLabelRequest: CreateLabelRequest) {
    return LABELS_API.createLabel(createLabelRequest).then(res => res.data)
}