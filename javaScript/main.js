// 1. JS Basics & Setup
console.log("Welcome to the Community Portal");

function pageLoaded() {
  alert("Page is fully loaded!");
}

// 2. Data Types and Operators
const eventName = "Music Fest";
const eventDate = "2025-06-15";
let availableSeats = 25;
console.log(`${eventName} is on ${eventDate}. Seats left: ${availableSeats}`);

// 3. Conditionals and Loops
const events = [
  { name: "Music Fest", date: "2025-06-15", seats: 25, category: "music" },
  { name: "Baking Workshop", date: "2025-05-20", seats: 0, category: "workshop" },
  { name: "Art Talk", date: "2025-06-01", seats: 5, category: "workshop" }
];

function isFutureEvent(event) {
  const today = new Date();
  const eventDate = new Date(event.date);
  return eventDate >= today && event.seats > 0;
}

function displayEvents(eventsList) {
  const container = document.getElementById("eventsContainer");
  container.innerHTML = '';
  eventsList.forEach(event => {
    if (isFutureEvent(event)) {
      const card = document.createElement("div");
      card.innerHTML = `
        <h3>${event.name}</h3>
        <p>Date: ${event.date}</p>
        <p>Seats Left: ${event.seats}</p>
        <button onclick="registerUser('${event.name}')">Register</button>
      `;
      container.appendChild(card);
    }
  });
}

displayEvents(events);

// 4. Functions, Closures, Callbacks
function addEvent(name, date, seats, category) {
  events.push({ name, date, seats, category });
}

const categoryCounter = (() => {
  const count = {};
  return (category) => {
    count[category] = (count[category] || 0) + 1;
    return count[category];
  };
})();

function filterEventsByCategory(category, callback) {
  let filtered = events.filter(event => category === "all" || event.category === category);
  callback(filtered);
}

function handleCategoryFilter() {
  const selected = document.getElementById("categoryFilter").value;
  filterEventsByCategory(selected, displayEvents);
}

// 5. Objects & Prototypes
class Event {
  constructor(name, date, seats, category) {
    this.name = name;
    this.date = date;
    this.seats = seats;
    this.category = category;
  }

  checkAvailability() {
    return this.seats > 0;
  }
}

const e1 = new Event("Yoga Class", "2025-07-01", 10, "workshop");
console.log(Object.entries(e1));

// 6. Arrays and Methods
events.push(new Event("Coding Bootcamp", "2025-07-10", 20, "workshop"));

const musicEvents = events.filter(e => e.category === "music");
console.log(musicEvents);

const displayNames = events.map(e => `${e.category} on ${e.name}`);
console.log(displayNames);

// 7. DOM Manipulation already done in displayEvents()

// 8. Event Handling
function registerUser(eventName) {
  try {
    const event = events.find(e => e.name === eventName);
    if (event && event.seats > 0) {
      event.seats--;
      categoryCounter(event.category);
      displayEvents(events);
      alert(`Registered for ${eventName}`);
    } else {
      throw new Error("Event is full or does not exist");
    }
  } catch (error) {
    console.error(error.message);
    alert("Registration failed.");
  }
}

document.addEventListener("keydown", e => {
  if (e.key === "s") {
    const name = prompt("Search by event name:");
    const result = events.filter(ev => ev.name.toLowerCase().includes(name.toLowerCase()));
    displayEvents(result);
  }
});

// 9. Async JS
async function fetchEvents() {
  try {
    document.getElementById("eventsContainer").innerHTML = "Loading...";
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    console.log("Mock Events Fetched", data);
  } catch (err) {
    console.error("Failed to fetch events", err);
  }
}

// 10. Modern Features
function logEvent({ name, date, seats }) {
  console.log(`Event: ${name}, Date: ${date}, Seats: ${seats}`);
}

const clonedEvents = [...events];

// 11. Forms
document.getElementById("registrationForm").addEventListener("submit", e => {
  e.preventDefault();
  const form = e.target;
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const event = form.elements.event.value.trim();
  
  if (!name || !email || !event) {
    document.getElementById("message").textContent = "Please fill in all fields.";
    return;
  }

  console.log("Form Submitted:", { name, email, event });
  sendRegistration({ name, email, event });
});

// 12. AJAX & Fetch API
function sendRegistration(data) {
  setTimeout(() => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(result => {
        document.getElementById("message").textContent = "Registration successful!";
        console.log("Server Response:", result);
      })
      .catch(() => {
        document.getElementById("message").textContent = "Registration failed!";
      });
  }, 1000);
}

// 13. Debugging Tips (Use browser dev tools for these):
// - Check Console tab for logs
// - Use breakpoints in Sources tab
// - Inspect fetch payload in Network tab

// 14. jQuery Usage
$('#registerBtn').click(() => {
  alert('Registered via jQuery!');
});

$(document).ready(() => {
  $('.eventCard').fadeIn();
});

// Frameworks Benefit:
console.log("React/Vue help structure code into components, improving scalability and state management.");
