import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }

export function mulberry32(a: number) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const maskPhone = (v: string) => {
  let d = v.replace(/\D/g, '')
  if (d.startsWith('8')) d = '7' + d.slice(1)
  d = d.slice(0, 11)
  let o = '+7'
  if (d.length > 1) o += ' (' + d.slice(1, 4)
  if (d.length >= 5) o += ') ' + d.slice(4, 7)
  if (d.length >= 8) o += '-' + d.slice(7, 9)
  if (d.length >= 10) o += '-' + d.slice(9, 11)
  return o
}