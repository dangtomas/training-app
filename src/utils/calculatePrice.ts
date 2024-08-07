import Training from "@/types/Training";

export default function calculatePrice(training: Training) {
    return calculateCourtPrice(training) + calculateTrainerPrice(training);
}

export function calculateCourtPrice(training: Training) {
    return (training.duration / 60) * training.courtPrice * training.courts;
}

export function calculateTrainerPrice(training: Training) {
    const trainerHourly = training.isTrainer ? 500 : 0;
    if (!training.isTrainer) {
        return 0;
    }
    return (training.duration / 60) * trainerHourly;
}
