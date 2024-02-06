function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function assignRandomlyAndEvenly(people: string[], year: number, month: number) {
    const assignments = {};
    const daysInMonth = new Date(year, month, 0).getDate();
    // let shuffledPeople = shuffleArray([...people]);
    let shuffledPeople = people;
    let personIndex = 0;

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day);
        // Skip weekends
        if (date.getDay() === 0 || date.getDay() === 6) continue;

        const dayKey = `${year}-${month}-${day}`;
        if (!assignments[dayKey]) {
            assignments[dayKey] = [];
        }

        // Assign two people for the day
        assignments[dayKey].push(shuffledPeople[personIndex % shuffledPeople.length]);
        assignments[dayKey].push(shuffledPeople[(personIndex + 1) % shuffledPeople.length]);

        // Move to next pair after two consecutive days
        if (day % 2 === 0) {
            personIndex = (personIndex + 2) % shuffledPeople.length;
        }
    }

    return assignments;
}

// Example usage
// const people: string[] = ['Sakib', 'Nouros', 'Ruman', 'Faiza', 'Rakib', 'Salman', 'Fahim', 'Shafayat', 'Misbah', 'Porosh', 'Jeba', 'Yamin'];
// const year: number = 2024; // For example
// const month: number = 2; // February
// const assignments = assignRandomlyAndEvenly(people, year, month);
// console.log(assignments);

export default assignRandomlyAndEvenly;

