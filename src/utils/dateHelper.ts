function numberToDay(n: number): string {
    switch (n) {
        case 1:
            return "pondělí";
        case 2:
            return "úterý";
        case 3:
            return "středa";
        case 4:
            return "čtvrtek";
        case 5:
            return "pátek";
        case 6:
            return "sobota";
        case 0:
            return "neděle";
        default:
            throw new Error("Invalid week number.");
    }
}

function numberToMonth(n: number) {
    switch (n) {
        case 0:
            return "led";
        case 1:
            return "úno";
        case 2:
            return "bře";
        case 3:
            return "dub";
        case 4:
            return "kvě";
        case 5:
            return "čvn";
        case 6:
            return "čvc";
        case 7:
            return "srp";
        case 8:
            return "zář";
        case 9:
            return "říj";
        case 10:
            return "lis";
        case 11:
            return "pro";
        default:
            throw new Error("Invalid month number.");
    }
}

export function addDurationToDate(date: Date, duration: number): Date {
    const now = date.valueOf();
    return new Date(now + duration * 60 * 1000);
}

export function generateDateString(date: Date, duration: number): string {
    return `
            ${numberToDay(date.getUTCDay())},
            ${date.getUTCDate()}. ${numberToMonth(date.getUTCMonth())}, 
            ${date.getUTCHours()}:${date.getUTCMinutes().toString().padStart(2, "0")} - 
            ${addDurationToDate(date, duration).getUTCHours()}:${addDurationToDate(
                date,
                duration,
            )
                .getUTCMinutes()
                .toString()
                .padStart(2, "0")}
        `;
}
