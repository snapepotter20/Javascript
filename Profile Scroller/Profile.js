const data = [
  {
    name: 'Sameer Bhatiya',
    age: 30,
    gender: 'male',
    lookingfor: 'female',
    location: 'New Delhi',
    image: 'https://randomuser.me/api/portraits/men/82.jpg',
  },
  {
    name: 'Ruhi Chaudary',
    age: 27,
    gender: 'female',
    lookingfor: 'male',
    location: 'Hisar',
    image: 'https://randomuser.me/api/portraits/women/82.jpg',
  },
  {
    name: 'Aisha Singh',
    age: 28,
    gender: 'female',
    lookingfor: 'male',
    location: 'Lucknow',
    image: 'https://randomuser.me/api/portraits/women/82.jpg',
  },
  {
    name: 'Sanchit Pandey',
    age: 29,
    gender: 'male',
    lookingfor: 'female',
    location: 'Mumbai',
    image: 'https://randomuser.me/api/portraits/men/82.jpg',
  },
  {
    name: 'Harsh Tomar',
    age: 30,
    gender: 'male',
    lookingfor: 'female',
    location: 'Gaziabad',
    image: 'https://randomuser.me/api/portraits/men/82.jpg',
  },
  {
    name: 'Neema Zengzopa',
    age: 26,
    gender: 'female',
    lookingfor: 'male',
    location: 'Assam',
    image: 'https://randomuser.me/api/portraits/women/82.jpg',
  },
];

const profiles = profileIterator(data);

// Call first profile
nextProfile();

// Next Event
document.getElementById('next').addEventListener('click', nextProfile);

// Next Profile Display
function nextProfile() {
  const currentProfile = profiles.next().value;

  if(currentProfile !== undefined) {
    document.getElementById('profileDisplay').innerHTML = `
      <ul class="list-group">
        <li class="list-group-item">Name: ${currentProfile.name}</li>
        <li class="list-group-item">Age: ${currentProfile.age}</li>
        <li class="list-group-item">Location: ${currentProfile.location}</li>
        <li class="list-group-item">Preference: ${currentProfile.gender} looking for ${currentProfile.lookingfor}</li>
      </ul>
    `;

    document.getElementById('imageDisplay').innerHTML = `<img src="${currentProfile.image}">`;
  } else {
    // No more profiles
    window.location.reload();
  }
}

// Profile Iterator
function profileIterator(profiles) {
  let nextIndex = 0;

  return {
    next: function() {
      return nextIndex < profiles.length ? 
      { value: profiles[nextIndex++], done: false } : 
      { done: true }
    }
  };
}