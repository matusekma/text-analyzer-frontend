import { Language } from "../client";
import { ASR_API } from "../client/client";


export function asrCall(file: any, language: Language) {
    return ASR_API.asr(file, language, { timeout: 0 }).then(res => res.data)
}