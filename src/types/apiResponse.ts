export interface IApiResponse {
  success?: boolean;
  status?: number;
  message: string;
  data?: unknown;
  error?: unknown;
}
