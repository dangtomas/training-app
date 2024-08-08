import Training from "@/types/Training";

type TrainingWithoutId = Omit<Training, "_id">;

export function createTrainingWeek(from: Date, type: string) {
    if (from.getDay() !== 1) {
        throw new Error("Week must start with Monday.");
    }

    const date = new Date(from.getTime());
    const trainings: TrainingWithoutId[] = [];

    type === "standard"
        ? addNormalWeekTrainings(trainings, date)
        : addHolidayTrainingWeek(trainings, date);

    return trainings;
}

function addNormalWeekTrainings(trainings: TrainingWithoutId[], date: Date) {
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
    date.setHours(7, 0, 0, 0);
    trainings.push({
        ...defaults,
        date: new Date(date.getTime()),
        courtPrice: 210,
    });

    date.setHours(15, 30);
    trainings.push({ ...defaults, date: new Date(date.getTime()) });

    //tuesday
    date.setHours(date.getHours() + 25);
    trainings.push({ ...defaults, date: new Date(date.getTime()) });

    //wednesday
    date.setHours(date.getHours() + 15, 0);
    trainings.push({
        ...defaults,
        date: new Date(date.getTime()),
        courtPrice: 210,
    });

    date.setHours(15, 0);
    trainings.push({ ...defaults, date: new Date(date.getTime()) });

    //thursday
    date.setHours(date.getHours() + 25, 30);
    trainings.push({ ...defaults, date: new Date(date.getTime()) });

    //friday
    date.setHours(date.getHours() + 15, 0);
    trainings.push({ ...defaults, date: new Date(date.getTime()) });
}

function addHolidayTrainingWeek(trainings: TrainingWithoutId[], date: Date) {
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
    date.setHours(7, 15, 0, 0);
    trainings.push({ ...athleticsDefaults, date: new Date(date.getTime()) });
    date.setHours(9, 0);
    trainings.push({ ...badmintonDefaults, date: new Date(date.getTime()) });
    date.setHours(16, 30);
    trainings.push({ ...badmintonDefaults, date: new Date(date.getTime()) });

    //tuesday
    date.setHours(date.getHours() + 17, 0);
    trainings.push({ ...badmintonDefaults, date: new Date(date.getTime()) });
    date.setHours(16, 30);
    trainings.push({ ...badmintonDefaults, date: new Date(date.getTime()) });

    //wednesday
    date.setHours(date.getHours() + 15, 15);
    trainings.push({ ...athleticsDefaults, date: new Date(date.getTime()) });
    date.setHours(9, 0);
    trainings.push({ ...badmintonDefaults, date: new Date(date.getTime()) });
    date.setHours(16, 30);
    trainings.push({ ...badmintonDefaults, date: new Date(date.getTime()) });

    //thursday
    date.setHours(date.getHours() + 17, 0);
    trainings.push({ ...badmintonDefaults, date: new Date(date.getTime()) });
    date.setHours(16, 30);
    trainings.push({ ...badmintonDefaults, date: new Date(date.getTime()) });

    //friday
    date.setHours(date.getHours() + 15, 15);
    trainings.push({ ...athleticsDefaults, date: new Date(date.getTime()) });
    date.setHours(9, 0);
    trainings.push({ ...badmintonDefaults, date: new Date(date.getTime()) });
}
