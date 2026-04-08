// جلب البيانات من ملف JSON
fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    renderRooms(data.rooms);
  })
  .catch(error => console.error('Error loading JSON:', error));

// دالة عرض الغرف
function renderRooms(rooms) {
  const container = document.getElementById('roomsContainer');
  container.innerHTML = '';

  rooms.forEach(room => {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-4';
    card.innerHTML = `
      <div class="card h-100">
        <div class="card-body">
          <h5>${room.name}</h5>
          <span class="badge bg-secondary">${room.type}</span>
          <p>${room.description}</p>
          <p><strong>${room.price} OMR/night</strong></p>
          <button class="btn btn-dark" onclick="bookRoom(${room.id})">Book Now</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// حفظ الغرفة المختارة في LocalStorage
function bookRoom(id) {
  fetch('./data.json')
    .then(res => res.json())
    .then(data => {
      const selectedRoom = data.rooms.find(r => r.id === id);
      localStorage.setItem('selectedRoom', JSON.stringify(selectedRoom));
      alert(`You booked: ${selectedRoom.name}`);
    });
}



// Dark Mode Toggle
const toggleBtn = document.getElementById('darkModeToggle');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Apply saved preference on load
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}
