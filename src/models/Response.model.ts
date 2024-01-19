export interface ResponseModel<DataType = unknown> {
  data: DataType;
  httpCode: number;
}
