"use client";

import Training from "@/types/Training";

export default function TrainingCard(training: Training) {
    return (
        <div className="box mt-4 items-start">
            <h1>{training.activity}</h1>
        </div>
    );
}
