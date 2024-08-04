export default async function fetchTrainings(from: Date, to: Date) {
    const fromString = from.toISOString().substring(0, 10);
    const toString = to.toISOString().substring(0, 10);
    const queryString = `?from=${fromString}&to=${toString}`;
    const response = await fetch(`/api/trainings${queryString}`);
    if (response.status !== 200) {
        throw new Error();
    }
    let data = await response.json();
    return data;
}
