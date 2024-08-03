export default function calculatePrice(
    duration: number,
    courts: number,
    courtPrice: number,
    isTrainer: boolean,
    attendants: number,
) {
    const STANDA = isTrainer ? 500 : 0;
    if (attendants === 0) {
        return 0;
    }
    return Math.floor(
        ((duration / 60) * (STANDA + courtPrice * courts)) / attendants,
    );
}
