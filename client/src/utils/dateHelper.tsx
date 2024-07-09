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
            throw new Error("Chybný den v týdnu");
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
            throw new Error("Chybné číslo měsíce.");
    }
}

function addDurationToDate(date: Date, duration: number): Date {
    const now = date.valueOf();
    return new Date(now + duration * 60 * 1000);
}

function generateDateString(date: Date, duration: number): string {
    return `
            ${numberToDay(date.getDay())},
            ${date.getDate()}. ${numberToMonth(date.getMonth())}, 
            ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")} - 
            ${addDurationToDate(date, duration).getHours()}:${
            addDurationToDate(date, duration).getMinutes().toString().padStart(2, "0")}
        `
}

function getOneMonthRange(): [string, string] {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    let defaultFrom: string;
    if (month === 0) {
        defaultFrom = `${year - 1}-12-01`;
    } else {
        defaultFrom = `${year}-${month < 10 ? "0" : ""}${month}-01`;
    }

    const defaultTo = `${year}-${month + 1 < 10 ? "0" : ""}${month + 1}-01`
    return [defaultFrom, defaultTo];
}



export { generateDateString, addDurationToDate, getOneMonthRange };