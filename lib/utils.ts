import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type EventType = 'REHEARSAL' | 'SERVICE' | 'AUXILIARY' | 'PRAYER' | 'WORKSHOP'

export function getEventTypeColor(type: EventType): string {
  const colors = {
    REHEARSAL: '#3B82F6', // blue-500
    SERVICE: '#A855F7', // purple-500
    AUXILIARY: '#22C55E', // green-500
    PRAYER: '#EAB308', // yellow-500
    WORKSHOP: '#F97316' // orange-500
  }
  return colors[type]
}
export const createQueryString = (name: string, value: string) => {
  const params = new URLSearchParams()
  params.set(name, value)
  return params.toString()
}





