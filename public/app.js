// Fetch bikes from backend and display on the webpage
fetch('/api/bikes')
    .then(response => response.json())
    .then(bikes => {
        const bikesList = document.getElementById('bikes-list');
        bikes.forEach(bike => {
            const bikeElement = document.createElement('div');
            bikeElement.innerHTML = `
                <h2>${bike.brand} ${bike.model}</h2>
                <p>Type: ${bike.type}</p>
                <p>Price: ${bike.price}</p>
            `;
            bikesList.appendChild(bikeElement);
        });
    })
    .catch(error => console.error('Error fetching bikes:', error));
