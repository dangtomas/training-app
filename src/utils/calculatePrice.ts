import Training from "@/types/Training";

export default function calculatePrice(training: Training) {
    return calculateCourtPrice(training) + calculateTrainerPrice(training);
}

export function calculateCourtPrice(training: Training) {
    return (training.duration / 60) * training.courtPrice * training.courts;
}

export function calculateTrainerPrice(training: Training) {
    const newPriceDate = new Date("2024-09-01T00:00:00.000Z");
    const trainerHourly = training.isTrainer
        ? training.date > newPriceDate
            ? 600
            : 500
        : 0;
    return (training.duration / 60) * trainerHourly;
}
