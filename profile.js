// Function to handle user sign-in
function handleCredentialResponse(response) {
    const data = jwt_decode(response.credential);
    const profileContainer = document.querySelector('.profile-container');
    const profileName = document.querySelector('.profile-name');
    const profileImage = document.querySelector('.profile-container img');

    profileName.textContent = data.name;
    profileImage.src = data.picture;

    profileContainer.style.opacity = 1;
    profileContainer.style.pointerEvents = 'auto';
}

// Function to handle user sign-out
function signOut() {
    const profileContainer = document.querySelector('.profile-container');

    profileContainer.style.opacity = 0;
    profileContainer.style.pointerEvents = 'none';
}

// Add sign-out button event listener
document.querySelector('.sign-out-btn').addEventListener('click', signOut);

updateProfile();




function handleCredentialResponse(response) {
    const responsePayload = parseJwt(response.credential);
    document.getElementById('user-name').innerText = `Hello, ${responsePayload.name}`;
    document.getElementById('user-image').src = responsePayload.picture;
    document.getElementById('user-image').style.display = 'block';
    document.getElementById('sign-out').style.display = 'block';

    // Save user profile in local storage
    localStorage.setItem('userProfile', JSON.stringify(responsePayload));

    // Load user progress
    loadUserProgress();
}

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

document.getElementById('sign-out').addEventListener('click', function() {
    document.getElementById('user-name').innerText = '';
    document.getElementById('user-image').style.display = 'none';
    document.getElementById('sign-out').style.display = 'none';
    localStorage.removeItem('userProfile');
    localStorage.removeItem('userProgress');
    location.reload();
});

function loadUserProfile() {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (userProfile) {
        document.getElementById('user-name').innerText = `Hello, ${userProfile.name}`;
        document.getElementById('user-image').src = userProfile.picture;
        document.getElementById('user-image').style.display = 'block';
        document.getElementById('sign-out').style.display = 'block';
        loadUserProgress();
    }
}

function saveUserProgress(stats) {
    localStorage.setItem('userProgress', JSON.stringify(stats));
}

function loadUserProgress() {
    const userProgress = JSON.parse(localStorage.getItem('userProgress'));
    if (userProgress) {
        document.querySelector('.stats[name="cube-size"] b').innerText = userProgress.cubeSize;
        document.querySelector('.stats[name="total-solves"] b').innerText = userProgress.totalSolves;
        document.querySelector('.stats[name="best-time"] b').innerText = userProgress.bestTime;
        document.querySelector('.stats[name="worst-time"] b').innerText = userProgress.worstTime;
        document.querySelector('.stats[name="average-5"] b').innerText = userProgress.average5;
        document.querySelector('.stats[name="average-12"] b').innerText = userProgress.average12;
        document.querySelector('.stats[name="average-25"] b').innerText = userProgress.average25;
    }
}

// Call loadUserProfile on page load
window.onload = function() {
    loadUserProfile();
};

function changeProfilePic() {
    // Implement functionality to change profile picture
    alert('Change Profile Picture');
}

function editName() {
    document.getElementById('profile-name').style.display = 'none';
    document.getElementById('name-input').style.display = 'inline';
    document.getElementById('save-name-btn').style.display = 'inline';
    document.getElementById('name-input').value = document.getElementById('profile-name').textContent;
}

function saveName() {
    const newName = document.getElementById('name-input').value;
    document.getElementById('profile-name').textContent = newName;
    document.getElementById('profile-name').style.display = 'inline';
    document.getElementById('name-input').style.display = 'none';
    document.getElementById('save-name-btn').style.display = 'none';

    // Optionally, save the new name to local storage or server
}

document.getElementById('sign-out-btn').addEventListener('click', function() {
    // Sign out logic here
    console.log('User signed out');
    // Hide profile elements
    document.getElementById('profile-container').style.opacity = 0;
    document.getElementById('profile-container').style.pointerEvents = 'none';
    // Clear user data from localStorage or state
});

// On page load, check if the user is logged in and update the profile
window.onload = function() {
    // Load user data from localStorage or authentication state
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (userProfile) {
        document.getElementById('profile-name').textContent = userProfile.name;
        document.getElementById('profile-img').src = userProfile.picture;
    }
};


function toggleProfileOptions() {
    const options = document.getElementById('profile-options');
    options.classList.toggle('hidden'); // Toggle visibility
}

function editProfileName() {
    const newName = prompt("Enter new name:");
    if (newName) {
        document.getElementById('user-name').textContent = newName;
        // Update this in your local storage or server as needed
    }
}

function viewProgress() {
    alert("Viewing progress..."); // Replace with actual progress viewing logic
}

function signOut() {
    // Logic for signing out
    document.getElementById('user-name').textContent = 'Guest';
    document.getElementById('profile-image').src = 'default-profile-pic.jpg';
    // Perform any additional sign-out actions
}