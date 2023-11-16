import {
  ClassConstructor,
  instanceToPlain,
  plainToInstance,
} from "class-transformer";
import { useState } from "react";

export interface RequestProps<T> {
  url: string;
  method: "POST" | "GET" | "PUT" | "DELETE";
  body?: any;
  isArray?: boolean;
  responseType?: ClassConstructor<any>;
}

export const useFetch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [result, setResult] = useState<Response>();

  const request = async <T,>({
    url,
    method,
    body,
    isArray,
    responseType,
  }: RequestProps<T>): Promise<T[] | T> => {
    setLoading(true);
    const result = await fetch(url, {
      method,
      body,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const json = await result.json();

    setResult(result);
    setLoading(false);

    if (isArray) {
      const data = json as [];
      return await Promise.all(
        data.map(async (response) => {
          return responseType
            ? plainToInstance(responseType, response)
            : (response as T);
        }) as T[]
      );
    }

    return responseType ? plainToInstance(responseType, json) : (json as T);
  };

  return { loading, result, error, request };
};
