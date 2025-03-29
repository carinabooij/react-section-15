export async function fetchAvailablePlaces() {
    const response = await fetch('http://localhost:3000/places');
    const resData = await response.json();
    // response.ok > 200,300
    // !response.ok > 400,500
    if (!response.ok) {
        throw new Error('Failed to fetch places'); // app crash
    }
    return resData.places;
}

export async function fetchleUserPlaces() {
    const response = await fetch('http://localhost:3000/user-places');
    const resData = await response.json();
    // response.ok > 200,300
    // !response.ok > 400,500
    if (!response.ok) {
        throw new Error('Failed to fetch user places'); // app crash
    }
    return resData.places;
}

    
export async function updateUserPlaces(places) {
    const respons = await fetch('http://localhost:3000/user-places', 
        { method: 'PUT', 
          body: JSON.stringify({places}), 
          headers: {'Content-Type': 'application/json',}
        }
    );

    const resData = await respons.json();

    if (!respons.ok) {
        throw new Error('Failed to update user data.');
    }

    return resData.message;
}