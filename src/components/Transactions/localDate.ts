import { Temporal } from "temporal-polyfill";
import {
  DateLang,
  Duration,
  Instant,
  PlainDate,
  PlainDateTime,
  PlainTime,
} from "./types";

export const localDate = (
  date:
    | PlainDate
    | PlainDateTime
    | Instant
    | Temporal.PlainYearMonth
    | PlainTime
    | Duration
    | null,
  dateLang: DateLang,
  localFormat: Intl.DateTimeFormatOptions
) => {
  if (!date) return "";
  return date.toLocaleString(dateLang, localFormat);
};
export function decodePlainDate(encoded: Date | null): PlainDate | null {
  if (encoded == null) return encoded;
  // Ensure the date string does not contain time part
  const dateString = encoded.toISOString().split("T")[0];
  return Temporal.PlainDate.from(dateString);
}

export const DD_MM_YYYY: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
};
