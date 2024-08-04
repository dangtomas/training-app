export default async function fetchWeeks() {
    const response = await fetch("/api/weeks");

    if (response.status !== 200) {
        throw new Error();
    }
    let weeks = await response.json();
    return weeks;
}
