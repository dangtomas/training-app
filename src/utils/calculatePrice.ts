import Training from "@/types/Training";

export default function calculatePrice(training: Training) {
    const STANDA = training.isTrainer ? 500 : 0;
    if (training.attendance.length === 0) {
        return 0;
    }
    return Math.ceil(
        ((training.duration / 60) *
            (STANDA + training.courtPrice * training.courts)) /
            training.attendance.length,
    );
}
