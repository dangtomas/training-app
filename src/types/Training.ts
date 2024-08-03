export default interface Training {
    _id: string;
    date: Date;
    duration: number;
    isTrainer: boolean;
    courts: number;
    courtPrice: number;
    activity: string;
    attendance: string[];
    info: string;
}
