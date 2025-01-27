import { Temporal } from "temporal-polyfill";

export type TransactionType = {
  id?: number;
  transactionDate: Date;
  paymentMethod: string;
  patient: {
    id: number;
    name?: string;
  };
  amount: number;
  status: string;
};

// TypeScript types for the functions
export type PlainDateTime = Temporal.PlainDateTime;
export type PlainDate = Temporal.PlainDate;
export type PlainTime = Temporal.PlainTime;
export type Instant = Temporal.Instant;
export type Duration = Temporal.Duration;
// supported calendar systems
export type CalendarId = "islamic-civil" | "iso8601";
// supported date languages
export type DateLang = "fr-FR" | "en-US" | "ar-TN" | "ar-AR";
export type NumberingSystem = "arab" | "latin";
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type DateInputSettings = {
  dateLang: DateLang;
  maxYear: number;
  minYear: number;
  startingWeekday: DayOfWeek;
};
export type HourFormat = "12-hour" | "24-hour";
export type PeriodOption = "AM" | "PM";
export type Hours =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23;
