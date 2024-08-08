export default interface Training {
    _id: string;
    activity: string;
    date: Date;
    duration: number;
    isTrainer: boolean;
    courts: number;
    courtPrice: number;
    attendance: string[];
    info: string;
}
