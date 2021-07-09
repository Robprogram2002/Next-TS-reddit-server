class HttpException extends Error {
  status: number;

  data: any[] | null;

  message: string;

  constructor(status: number, message: string, data: any[]) {
    super();
    this.status = status;
    this.message = message;
    this.data = data || null;
  }
}

export default HttpException;
