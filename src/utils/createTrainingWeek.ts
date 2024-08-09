import Training from "@/types/Training";
import { getTimezoneOffset } from "./dateHelper";

type TrainingWithoutId = Omit<Training, "_id">;

export function createTrainingWeek(from: Date, type: string) {
    if (from.getUTCDay() !== 0) {
        throw new Error("Week must start with Monday.");
    }

    const date = new Date(from.getTime());
    date.setHours(date.getHours() + 24);
    const trainings: TrainingWithoutId[] = [];

    type === "standard"
        ? addNormalWeekTrainings(trainings, date)
        : addHolidayTrainingWeek(trainings, date);

    return trainings;
}

function addNormalWeekTrainings(trainings: TrainingWithoutId[], date: Date) {
    const offsetHours = getTimezoneOffset("Europe/Prague") / 60;
    const defaults = {
        activity: "badminton",
        duration: 90,
        isTrainer: true,
        courts: 2,
        courtPrice: 310,
        attendance: [],
        info: "",
    };

    //monday
    date.setUTCHours(7 - offsetHours, 0, 0, 0);
    trainings.push({
        ...defaults,
        date: new Date(date.getTime()),
        courtPrice: 210,
    });

    date.setUTCHours(15 - offsetHours, 30);
    trainings.push({ ...defaults, date: new Date(date.getTime()) });

    //tuesday
    date.setUTCHours(date.getHours() + 25);
    date.setUTCHours(16 - offsetHours, 30);
    trainings.push({ ...defaults, date: new Date(date.getTime()) });

    //wednesday
    date.setUTCHours(date.getHours() + 15, 0);
    date.setUTCHours(7 - offsetHours, 0);
    trainings.push({
        ...defaults,
        date: new Date(date.getTime()),
        courtPrice: 210,
    });

    date.setUTCHours(15 - offsetHours, 0);
    trainings.push({ ...defaults, date: new Date(date.getTime()) });

    //thursday
    date.setUTCHours(date.getHours() + 25, 30);
    date.setUTCHours(16 - offsetHours, 30);
    trainings.push({ ...defaults, date: new Date(date.getTime()) });

    //friday
    date.setUTCHours(date.getHours() + 15, 0);
    date.setUTCHours(7 - offsetHours, 0);
    trainings.push({ ...defaults, date: new Date(date.getTime()) });
}

function addHolidayTrainingWeek(trainings: TrainingWithoutId[], date: Date) {
    const offsetHours = getTimezoneOffset("Europe/Prague") / 60;
    const badmintonDefaults = {
        activity: "badminton",
        duration: 90,
        isTrainer: true,
        courts: 2,
        courtPrice: 140,
        attendance: [],
        info: "",
    };

    const athleticsDefaults = {
        activity: "Kondice Lužánky",
        duration: 60,
        isTrainer: true,
        courts: 0,
        courtPrice: 0,
        attendance: [],
        info: "",
    };

    //monday
    date.setUTCHours(7 - offsetHours, 15, 0, 0);
    trainings.push({ ...athleticsDefaults, date: new Date(date.getTime()) });
    date.setUTCHours(9 - offsetHours, 0);
    trainings.push({ ...badmintonDefaults, date: new Date(date.getTime()) });
    date.setUTCHours(16 - offsetHours, 30);
    trainings.push({ ...badmintonDefaults, date: new Date(date.getTime()) });

    //tuesday
    date.setUTCHours(date.getHours() + 17, 0);
    date.setUTCHours(9 - offsetHours, 0);
    trainings.push({ ...badmintonDefaults, date: new Date(date.getTime()) });
    date.setUTCHours(16 - offsetHours, 30);
    trainings.push({ ...badmintonDefaults, date: new Date(date.getTime()) });

    //wednesday
    date.setUTCHours(date.getHours() + 15, 15);
    date.setUTCHours(7 - offsetHours, 15);
    trainings.push({ ...athleticsDefaults, date: new Date(date.getTime()) });
    date.setUTCHours(9 - offsetHours, 0);
    trainings.push({ ...badmintonDefaults, date: new Date(date.getTime()) });
    date.setUTCHours(16 - offsetHours, 30);
    trainings.push({ ...badmintonDefaults, date: new Date(date.getTime()) });

    //thursday
    date.setUTCHours(date.getHours() + 17, 0);
    date.setUTCHours(9 - offsetHours, 0);
    trainings.push({ ...badmintonDefaults, date: new Date(date.getTime()) });
    date.setUTCHours(16 - offsetHours, 30);
    trainings.push({ ...badmintonDefaults, date: new Date(date.getTime()) });

    //friday
    date.setUTCHours(date.getHours() + 15, 15);
    date.setUTCHours(7 - offsetHours, 15);
    trainings.push({ ...athleticsDefaults, date: new Date(date.getTime()) });
    date.setUTCHours(9 - offsetHours, 0);
    trainings.push({ ...badmintonDefaults, date: new Date(date.getTime()) });
}
