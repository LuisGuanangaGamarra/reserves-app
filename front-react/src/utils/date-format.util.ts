import { formatInTimeZone  } from "date-fns-tz";

export function formatToLocalTime(
    isoDate: string | Date,
    pattern = "yyyy-MM-dd HH:mm:ss XXX",
    tz: string = Intl.DateTimeFormat().resolvedOptions().timeZone
): string {

    return formatInTimeZone(isoDate, tz, pattern);
}