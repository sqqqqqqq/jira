import {useEffect, useState} from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

export const cleanObject = (object: { [ley: string]: unknown }) => {
  const result = {...object};
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // callback加到依赖项里，会造成无限循环。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

//用泛型来规范类型
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    //每次在value变化之后，设置一个定时器。
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    //回调函数，每次在上一个useEffect处理完之后再运行。
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
