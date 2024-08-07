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

function numberToDayTable(n: number): string {
    switch (n) {
        case 1:
            return "PO";
        case 2:
            return "ÚT";
        case 3:
            return "ST";
        case 4:
            return "ČT";
        case 5:
            return "PÁ";
        case 6:
            return "SO";
        case 0:
            return "NE";
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

export function getDateInterval(from: Date, to: Date) {
    return (
        `${from.getDate()}.${from.getMonth() + 1}-` +
        `${to.getDate()}.${to.getMonth() + 1}.${to.getFullYear()}`
    );
}

export function addDurationToDate(date: Date, duration: number): Date {
    const now = date.valueOf();
    return new Date(now + duration * 60 * 1000);
}

export function generateDateString(date: Date, duration: number): string {
    return `
            ${numberToDay(date.getDay())},
            ${date.getDate()}. ${numberToMonth(date.getMonth())}, 
            ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")} - 
            ${addDurationToDate(date, duration).getHours()}:${addDurationToDate(
                date,
                duration,
            )
                .getMinutes()
                .toString()
                .padStart(2, "0")}
        `;
}

export function generateDateStringTable(
    date: Date,
    duration: number,
    activity: string,
) {
    return `${numberToDayTable(date.getDay())} 
    ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")} - 
    ${addDurationToDate(date, duration).getHours()}:${addDurationToDate(
        date,
        duration,
    )
        .getMinutes()
        .toString()
        .padStart(2, "0")}
        ${activity}`;
}

export function getTimezoneOffset(timeZone: string) {
    const str = new Date().toLocaleString("en", {
        timeZone,
        timeZoneName: "longOffset",
    });
    const [_, h, m] = str.match(/([+-]\d+):(\d+)$/) || [, "+00", "00"];
    const hour = Number(h);
    const minutes = Number(m);
    return hour * 60 + (hour > 0 ? +minutes : -minutes);
}
