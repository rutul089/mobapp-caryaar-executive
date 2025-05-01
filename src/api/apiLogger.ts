// src/utils/apiLogger.ts

const isDev = __DEV__; // Only log in development

export const logApiEvent = (event: {
  type: any;
  method: any;
  url: any;
  headers?: any;
  data?: any;
  error?: any;
  status?: any;
  duration?: any;
}) => {
  if (!isDev) {
    return;
  }

  const {type, method, url, status, data, headers, error, duration} = event;

  const logTitle = `[API ${type.toUpperCase()} ${method?.toUpperCase()} ] - ${url}`;
  const logData = {
    ...(status && {status}),
    ...(headers && {headers}),
    ...(duration && {duration}),
    ...(data && {data}),
    ...(error && {error}),
  };

  console.log(logTitle, logData);
};
