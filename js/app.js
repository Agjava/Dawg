
const API_KEY = 'live_T4bvaeYyWu4BSNDLu75E98hdwEk6KT3XkYD0TcdWtS9ZiG2H22VLWz6FIZrp6xqQ'; 

// State variables
let bannedBreeds = [];
let bannedGroups = [];
let bannedTemperaments = [];
let dogHistory = [];

// DOM Elements
const dogCard = document.getElementById('dog-card');
const dogImage = document.getElementById('dog-image');
const dogName = document.getElementById('dog-name');
const dogBreed = document.getElementById('dog-breed');
const dogGroup = document.getElementById('dog-group');
const dogTemperament = document.getElementById('dog-temperament');
const fetchDogBtn = document.getElementById('fetch-dog-btn');
const bannedBreedsEl = document.getElementById('banned-breeds');
const bannedGroupsEl = document.getElementById('banned-groups');
const bannedTemperamentsEl = document.getElementById('banned-temperaments');
const historyContainer = document.getElementById('history-container');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    fetchDogBtn.addEventListener('click', fetchRandomDog);
    
    // Add event listeners for clickable attributes
    document.querySelectorAll('.attribute').forEach(attr => {
        attr.addEventListener('click', handleAttributeClick);
    });
});

// Fetch a random dog that isn't on the ban list
async function fetchRandomDog() {
    try {
        // Show loading state
        dogCard.classList.remove('hidden');
        dogName.textContent = 'Loading...';
        dogBreed.textContent = 'Loading...';
        dogGroup.textContent = 'Loading...';
        dogTemperament.textContent = 'Loading...';
        
        // Fetch random dog from API
        const response = await fetch('https://api.thedogapi.com/v1/images/search?has_breeds=1&limit=1', {
            headers: {
                'x-api-key': API_KEY
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch dog data');
        }
        
        const data = await response.json();
        const dog = data[0];
        
        // Check if the dog should be filtered out based on ban lists
        if (dog.breeds && dog.breeds[0]) {
            const breed = dog.breeds[0];
            
            // Check if breed is banned
            if (bannedBreeds.includes(breed.name)) {
                console.log(`Skipping banned breed: ${breed.name}`);
                fetchRandomDog(); // Try again
                return;
            }
            
            // Check if breed group is banned
            if (breed.breed_group && bannedGroups.includes(breed.breed_group)) {
                console.log(`Skipping banned group: ${breed.breed_group}`);
                fetchRandomDog(); // Try again
                return;
            }
            
            // Check if any temperament is banned
            if (breed.temperament) {
                const temperaments = breed.temperament.split(', ');
                const hasBannedTemperament = temperaments.some(temp => 
                    bannedTemperaments.includes(temp)
                );
                
                if (hasBannedTemperament) {
                    console.log(`Skipping dog with banned temperament`);
                    fetchRandomDog(); // Try again
                    return;
                }
            }
            
            // Display the dog
            displayDog(dog);
            
            // Add to history
            addToHistory(dog);
        } else {
            // If no breed info, try again
            fetchRandomDog();
        }
    } catch (error) {
        console.error('Error fetching dog:', error);
        dogName.textContent = 'Error fetching dog';
    }
}

// Display dog information
function displayDog(dog) {
    const breed = dog.breeds[0];
    
    // Set image
    dogImage.src = dog.url;
    dogImage.alt = breed.name || 'A dog';
    
    // Set breed info
    dogName.textContent = breed.name || 'Unknown breed';
    dogBreed.textContent = breed.name || 'Unknown';
    dogGroup.textContent = breed.breed_group || 'Unknown';
    dogTemperament.textContent = breed.temperament || 'Unknown';
}

// Handle clicking on an attribute to ban it
function handleAttributeClick(event) {
    const attribute = event.target;
    const type = attribute.dataset.type;
    const value = attribute.textContent;
    
    if (value === 'Unknown') return;
    
    switch (type) {
        case 'breed':
            if (!bannedBreeds.includes(value)) {
                bannedBreeds.push(value);
                updateBanList(bannedBreedsEl, bannedBreeds);
            }
            break;
        case 'group':
            if (!bannedGroups.includes(value)) {
                bannedGroups.push(value);
                updateBanList(bannedGroupsEl, bannedGroups);
            }
            break;
        case 'temperament':
            // For temperament, we need to handle multiple values
            const temperaments = value.split(', ');
            
            // Show a simple prompt to choose which temperament to ban
            const temperamentToBan = prompt(
                `Choose a temperament to ban:\n${temperaments.join('\n')}`
            );
            
            if (temperamentToBan && temperaments.includes(temperamentToBan) && 
                !bannedTemperaments.includes(temperamentToBan)) {
                bannedTemperaments.push(temperamentToBan);
                updateBanList(bannedTemperamentsEl, bannedTemperaments);
            }
            break;
    }
}

// Update the ban list in the UI
function updateBanList(element, list) {
    element.innerHTML = '';
    
    list.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item}
            <button class="remove-ban" data-value="${item}">×</button>
        `;
        
        // Add event listener to remove button
        li.querySelector('.remove-ban').addEventListener('click', (e) => {
            const value = e.target.dataset.value;
            const index = list.indexOf(value);
            
            if (index !== -1) {
                list.splice(index, 1);
                updateBanList(element, list);
            }
            
            e.stopPropagation();
        });
        
        element.appendChild(li);
    });
}

// Add a dog to the history
function addToHistory(dog) {
    // Add to the beginning of the array (most recent first)
    dogHistory.unshift(dog);
    
    // Limit history to 10 items
    if (dogHistory.length > 10) {
        dogHistory.pop();
    }
    
    updateHistoryUI();
}

// Update the history UI
function updateHistoryUI() {
    historyContainer.innerHTML = '';
    
    dogHistory.forEach((dog, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <img src="${dog.url}" alt="${dog.breeds[0].name || 'Dog'}">
            <p>${dog.breeds[0].name || 'Unknown'}</p>
        `;
        
        // Add click event to show this dog again
        historyItem.addEventListener('click', () => {
            displayDog(dog);
        });
        
        historyContainer.appendChild(historyItem);
    });
}

// Initial fetch on page load
fetchRandomDog();
