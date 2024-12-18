class Person {
    constructor(name, income, birthday) {
        this.name = name;
        this.income = parseFloat(income); // Ensure income is a float
        this.birthday = new Date(birthday); // Ensure birthday is a valid date
    }
}

let people = [];

document.getElementById('personForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Collect form inputs
    let name = document.getElementById('name').value.trim();
    let income = parseFloat(document.getElementById('income').value); // Convert to number
    let birthday = document.getElementById('birthday').value;

    // Validate inputs
    if (!name || isNaN(income) || !birthday) {
        alert('Please fill out all fields correctly.');
        return;
    }

    // Create and add a new Person object
    let person = new Person(name, income, birthday);
    people.push(person);

    // Clear form and update the display
    event.target.reset();
    updateList();
});

document.getElementById('sortByIncome').addEventListener('click', function () {
    // Sort by income, highest first
    people.sort((a, b) => b.income - a.income);
    updateList();
});

document.getElementById('sortByBirthday').addEventListener('click', function () {
    // Sort by birthday, oldest first
    people.sort((a, b) => a.birthday - b.birthday);
    updateList();
});

function updateList() {
    let list = document.getElementById('peopleList');
    list.innerHTML = '';

    // Create and append list items for each person
    people.forEach(person => {
        let li = document.createElement('li');
        li.textContent = `Name: ${person.name} - Income: £${person.income.toFixed(0)} - Birthday: ${person.birthday.toDateString()}`;
        list.appendChild(li);
    });
}
