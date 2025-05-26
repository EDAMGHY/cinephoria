import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { default as storage } from "@react-native-async-storage/async-storage";
import { genres } from "~/api/genres";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export class Storage {
  static async get(key: string) {
    try {
      const value = await storage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (e) {
      console.error(e);
    }
  }

  static async set(key: string, value: any) {
    try {
      await storage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  }

  static async remove(key: string) {
    try {
      await storage.removeItem(key);
    } catch (e) {
      console.error(e);
    }
  }
}

// Define the shape of our options object
interface FormatDateOptions extends Intl.DateTimeFormatOptions {
  locale?: string;
  monthFormat?: "long" | "short";
  includeYear?: boolean;
}

/**
 * Returns the day with its ordinal suffix:
 *   1  → "1st"
 *   2  → "2nd"
 *   11 → "11th"
 *   23 → "23rd"
 */
function getOrdinalSuffix(day: number): string {
  const rem100 = day % 100;
  if (rem100 >= 11 && rem100 <= 13) {
    return `${day}th`;
  }
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

/**
 * Formats a date as "February 2nd 2023" by default.
 *
 * @param input  - A Date instance, an ISO date string, or a millisecond timestamp
 * @param opts   - Formatting options
 * @returns      - A string like "February 2nd 2023"
 */
export function formatDate(
  input: Date | string | number,
  opts: FormatDateOptions = {}
): string {
  const { locale = "en-US", monthFormat = "long", includeYear = true } = opts;

  // Normalize to a Date object
  const date = input instanceof Date ? input : new Date(input);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date passed to formatDate");
  }

  // Get month name
  const month = date.toLocaleString(locale, { month: monthFormat });
  // Get day with suffix
  const dayWithSuffix = getOrdinalSuffix(date.getDate());
  // Get year if requested
  const year = date.getFullYear();

  return includeYear
    ? `${month} ${dayWithSuffix} ${year}`
    : `${month} ${dayWithSuffix}`;
}

export const getGenres = (ids: number[]): string[] => {
  const strings: string[] = genres
    .filter((genre) => ids.includes(genre.id))
    .map((genre) => genre.name);
  return strings.length > 0 ? strings : [];
};
