import { useLayoutEffect, useEffect } from "react";
const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;
export { useIsomorphicLayoutEffect }

export function throttle(func: Function, delay: number): Function {
    let lastCallTime = 0;
    return function (...args: Array<unknown>) {
        const now = Date.now();
        if (now - lastCallTime >= delay) {
            func.apply(this, args);
            lastCallTime = now;
        }
    };
}

export const getCookie = (cname: string): string => {
    if (typeof window === 'undefined') return ''
    let name: string = cname + "=";
    const ca: string[] = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        const c: string = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

export const getDate = (date: string): string => {
    const today = new Date(date)
    const YY = today.getFullYear()
    const MM = today.getMonth() + 1
    const DD = today.getDate()
    const hh = today.getHours()
    const mm = today.getMinutes()
    const ss = today.getSeconds()
    return `${YY}-${MM}-${DD} ${hh}:${mm > 10 ? mm : ('0' + mm)}:${ss > 10 ? ss : ('0' + ss)}`
}

export const formatText = (text: string): string => {
    text = text.replace(/\<img.*?\>/g, '[图片]')
    console.log(text)
    return text
}