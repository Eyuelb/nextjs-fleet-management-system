enum ConnectionError {
  ECONNREFUSED = "ECONNREFUSED",
  ETIMEDOUT = "ETIMEDOUT",
  EHOSTUNREACH = "EHOSTUNREACH",
  ENETUNREACH = "ENETUNREACH",
  EADDRINUSE = "EADDRINUSE",
  ECONNRESET = "ECONNRESET",
  EPIPE = "EPIPE",
  ENOTFOUND = "ENOTFOUND",
  EAI_AGAIN = "EAI_AGAIN",
  EAI_FAIL = "EAI_FAIL",
  EAI_NODATA = "EAI_NODATA",
  EAI_NONAME = "EAI_NONAME",
  EALREADY = "EALREADY",
  EINPROGRESS = "EINPROGRESS",
  EHOSTDOWN = "EHOSTDOWN",
  ENETDOWN = "ENETDOWN",
  EPROTO = "EPROTO",
  EPROTOSSL = "EPROTOSSL",
  EPROTO_TLS = "EPROTO_TLS",
  EBADMSG = "EBADMSG",
  EISCONN = "EISCONN",
  EISDIR = "EISDIR",
  EMFILE = "EMFILE",
  EACCES = "EACCES",
  EAGAIN = "EAGAIN",
  EAFNOSUPPORT = "EAFNOSUPPORT",
  EWOULDBLOCK = "EWOULDBLOCK",
  ELOOP = "ELOOP",
  ENOTDIR = "ENOTDIR",
  ENAMETOOLONG = "ENAMETOOLONG",
  EOPNOTSUPP = "EOPNOTSUPP",
  EOVERFLOW = "EOVERFLOW",
  EPERM = "EPERM",
  ESRCH = "ESRCH",
  ESTALE = "ESTALE",
  EXDEV = "EXDEV",
  UNKNOWN = "UNKNOWN", // Add UNKNOWN to the enum
  // Add more connection errors as needed
}

interface ErrorInfo {
  status: number;
  message: string;
}

const errorMap: Record<ConnectionError, ErrorInfo> = {
    ECONNREFUSED: { status: 503, message: "Service Unavailable" },
    ETIMEDOUT: { status: 504, message: "Gateway Timeout" },
    EHOSTUNREACH: { status: 502, message: "Bad Gateway" },
    ENETUNREACH: { status: 502, message: "Bad Gateway" },
    EADDRINUSE: { status: 503, message: "Service Unavailable" },
    ECONNRESET: { status: 504, message: "Gateway Timeout" },
    EPIPE: { status: 503, message: "Service Unavailable" },
    ENOTFOUND: { status: 404, message: "Not Found" },
    EAI_AGAIN: { status: 503, message: "Service Unavailable" },
    EAI_FAIL: { status: 503, message: "Service Unavailable" },
    EAI_NODATA: { status: 503, message: "Service Unavailable" },
    EAI_NONAME: { status: 503, message: "Service Unavailable" },
    EALREADY: { status: 503, message: "Service Unavailable" },
    EINPROGRESS: { status: 503, message: "Service Unavailable" },
    EHOSTDOWN: { status: 503, message: "Service Unavailable" },
    ENETDOWN: { status: 503, message: "Service Unavailable" },
    EPROTO: { status: 503, message: "Service Unavailable" },
    EPROTOSSL: { status: 503, message: "Service Unavailable" },
    EPROTO_TLS: { status: 503, message: "Service Unavailable" },
    EBADMSG: { status: 503, message: "Service Unavailable" },
    EISCONN: { status: 503, message: "Service Unavailable" },
    EISDIR: { status: 400, message: "Bad Request" },
    EMFILE: { status: 503, message: "Service Unavailable" },
    EACCES: { status: 403, message: "Forbidden" },
    EAGAIN: { status: 503, message: "Service Unavailable" },
    EAFNOSUPPORT: { status: 503, message: "Service Unavailable" },
    EWOULDBLOCK: { status: 503, message: "Service Unavailable" },
    ELOOP: { status: 503, message: "Service Unavailable" },
    ENOTDIR: { status: 400, message: "Bad Request" },
    ENAMETOOLONG: { status: 400, message: "Bad Request" },
    EOPNOTSUPP: { status: 503, message: "Service Unavailable" },
    EOVERFLOW: { status: 413, message: "Request Entity Too Large" },
    EPERM: { status: 403, message: "Forbidden" },
    ESRCH: { status: 404, message: "Not Found" },
    ESTALE: { status: 503, message: "Service Unavailable" },
    EXDEV: { status: 503, message: "Service Unavailable" },
    UNKNOWN: { status: 500, message: "Internal Server Error" }, // Default mapping for UNKNOWN
  };
export interface FetchErrorType extends Error {
  cause?: {
    code?: ConnectionError | undefined;
  };
}
export function handleConnectionError(error: FetchErrorType): ErrorInfo {
    const errorCode = error.cause?.code ?? "UNKNOWN";
    const { status, message } = errorMap[errorCode] || { status: 500, message: "Internal Server Error" };
    return { status, message };
  }

async function handleResponse(response: Response) {
  const contentType = response.headers.get("Content-Type");
  const isJSON = contentType && contentType.match(/json/);
  const data = isJSON ? await response.json() : await response.text();
  if (response.ok) return data;
  else {
    return isJSON
      ? Promise.reject(new JSONHTTPError(response, data))
      : Promise.reject(new TextHTTPError(response, data));
  }
}

class HTTPError extends Error {
  status: number;

  constructor(response: Response) {
    super(response.statusText);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(response.statusText).stack;
    }
    this.status = response.status;
  }
}

class TextHTTPError extends HTTPError {
  data: string;

  constructor(response: Response, data: string) {
    super(response);
    this.data = data;
  }
}

class JSONHTTPError extends HTTPError {
  json: any;

  constructor(response: Response, json: any) {
    super(response);
    this.json = json;
  }
}

export { handleResponse, HTTPError, TextHTTPError, JSONHTTPError };
