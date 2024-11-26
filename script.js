// Array of locations with latitude and longitude
const locations = [
    {
        name: "SIRC Toronto Downtown",
        address: "123 Queen St W, Toronto, ON M5H 2M9",
        image: "https://i.pinimg.com/564x/e9/42/56/e942560116299fed7b86e037a663f3cc.jpg", 
        details: "SIRC Toronto Downtown offers the best urban vibes with a full menu and a casual atmosphere perfect for lunch or dinner.",
        lat: 43.6532, // Latitude for Toronto Downtown
        lon: -79.3832 // Longitude for Toronto Downtown
    },
    {
        name: "SIRC Toronto Uptown",
        address: "456 Yonge St, Toronto, ON M4Y 1X6",
        image: "https://restaurantinteriordesign.eu/wp-content/uploads/2019/06/Caramel-London-Restaurant-Lounge-decor-7.jpg",
        details: "Enjoy SIRC Uptown's trendy decor and upscale menu, ideal for date nights and celebrations.",
        lat: 43.7000, 
        lon: -79.4200
    },
    {
        name: "SIRC Scarborough",
        address: "789 Kingston Rd, Scarborough, ON M1N 1P3",
        image: "https://static1.squarespace.com/static/5d6d67f2387da800015dc00e/t/615b80cbf3db07736dc50049/1633386702853/704A8653-e1504290251947.jpeg?format=1500w",
        details: "SIRC Scarborough brings comfort food with a modern twist, perfect for family dinners and get-togethers.",
        lat: 43.7695,
        lon: -79.2620
    },
    {
        name: "SIRC Vaughan",
        address: "101 Commerce Blvd, Vaughan, ON L4K 5P2",
        image: "https://pics.craiyon.com/2023-11-17/3kP8RC5FTFOvpqGphq1eHw.webp",
        details: "SIRC Vaughan is known for its vibrant ambiance and innovative cuisine, offering a fine dining experience.",
        lat: 43.8331,
        lon: -79.5094
    },
    {
        name: "SIRC Mississauga",
        address: "222 Lakeshore Rd E, Mississauga, ON L5G 1B2",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZfeiyUWBJbhSKvyySS4nb3evm5jYBON2WqJIIsgmZeNPRFq2t3k0sI823dKwsvE77G1Y&usqp=CAU",
        details: "The SIRC Mississauga location offers a spacious dining area and a welcoming environment for both casual and special events.",
        lat: 43.5890,
        lon: -79.6441
    },
    {
        name: "SIRC Oakville",
        address: "333 Kerr St, Oakville, ON L6K 3B2",
        image: "https://nwdb.nyc/wp-content/uploads/2023/05/1117_NWDB_110-Kent_Restaurant_View-04-copy.jpg",
        details: "SIRC Oakville boasts a cozy atmosphere with exceptional dishes perfect for a night out with friends or family.",
        lat: 43.4675,
        lon: -79.6875
    },
    // Add more locations if needed
];

// Initialize map centered on Toronto
const map = L.map('map').setView([43.6532, -79.3832], 10);  // Default view: Toronto Downtown

// Add OpenStreetMap tiles (free and open source)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Loop through locations and add markers to the map
locations.forEach(location => {
    L.marker([location.lat, location.lon])
        .addTo(map)
        .bindPopup(`
            <b>${location.name}</b><br>
            ${location.address}<br>
            <img src="${location.image}" alt="${location.name}" style="width:100px; height: auto;">
        `);
});

// Function to render locations (same as your previous code)
function renderLocations(filter = "all", name = "") {
    const locationsList = document.getElementById("locationsList");
    locationsList.innerHTML = "";

    const filteredLocations = locations.filter(location => {
        const isLocationMatch = filter === "all" || location.name.toLowerCase().includes(filter.toLowerCase());
        const isNameMatch = location.name.toLowerCase().includes(name.toLowerCase()) || location.address.toLowerCase().includes(name.toLowerCase());
        return isLocationMatch && isNameMatch;
    });

    filteredLocations.forEach(location => {
        const locationItem = document.createElement("div");
        locationItem.classList.add("location-item");

        locationItem.innerHTML = `
            <img src="${location.image}" alt="${location.name}">
            <div class="details">
                <h3>${location.name}</h3>
                <p>${location.address}</p>
                <button class="detail-btn" onclick="toggleDetails('${location.name}')">Details</button>
                <div id="details-${location.name}" class="location-details" style="display: none;">
                    <p>${location.details}</p>
                </div>
            </div>
        `;

        locationsList.appendChild(locationItem);
    });
}

// Event listeners (same as your previous code)
document.getElementById("locationFilter").addEventListener("change", (e) => {
    const filter = e.target.value;
    const nameSearch = document.getElementById("searchByName").value;
    renderLocations(filter, nameSearch);
});

document.getElementById("searchRestaurant").addEventListener("input", (e) => {
    const nameSearch = e.target.value;
    const locationFilter = document.getElementById("locationFilter").value;
    renderLocations(locationFilter, nameSearch);
});

document.getElementById("searchByName").addEventListener("input", (e) => {
    const nameSearch = e.target.value;
    const locationFilter = document.getElementById("locationFilter").value;
    renderLocations(locationFilter, nameSearch);
});

// Initialize page with all locations
renderLocations();

// Toggle details visibility (same as your previous code)
function toggleDetails(locationName) {
    const details = document.getElementById(`details-${locationName}`);
    details.style.display = details.style.display === "none" ? "block" : "none";
}




