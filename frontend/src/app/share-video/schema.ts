import * as yup from "yup";

export interface IShareVideoPayload {
  youtubeUrl: string;
}

export const schema = yup.object().shape({
  youtubeUrl: yup
    .string()
    .url("Invalid URL")
    .required("YouTube URL is required"),
});