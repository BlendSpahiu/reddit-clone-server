import { StatusCodeEnums } from '../enums/StatusCode.enums';
import { ResponseModel } from '../models/Response.model';
import { baseStatusResponse } from './baseStatusResponse';

export const ok = (
  data: Record<string, unknown>,
  httpCode = 200,
): ResponseModel => ({
  data: { ...baseStatusResponse, ...data },
  httpCode,
});

export const failure = (
  data: Record<string, unknown> | string,
  statusCode: StatusCodeEnums = StatusCodeEnums.UNEXPECTED,
  httpCode = 200,
): ResponseModel => {
  return {
    data: {
      ...baseStatusResponse,
      statusCode,
      statusIsOk: false,
      ...(typeof data === 'string' ? { statusMessage: data } : data),
    },
    httpCode,
  };
};
