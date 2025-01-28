// DOM Elements
const userFormContainer = document.getElementById('userFormContainer');
const userForm = document.getElementById('userForm');
const userTableBody = document.getElementById('userTableBody');
const addUserBtn = document.getElementById('addUserBtn');
const cancelBtn = document.getElementById('cancelBtn');

// Mock API URL (JSONPlaceholder)
const apiUrl = 'https://jsonplaceholder.typicode.com/users';

// Fetch Users and Display
async function fetchUsers() {
  const response = await fetch(apiUrl);
  const users = await response.json();
  renderUsers(users);
}

// Render Users in the Table
function renderUsers(users) {
  userTableBody.innerHTML = '';
  users.forEach((user) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name.split(' ')[0]}</td>
      <td>${user.name.split(' ')[1]}</td>
      <td>${user.email}</td>
      <td>${user.company.name}</td>
      <td>
        <button class="edit-btn" onclick="editUser(${user.id})">Edit</button>
        <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
      </td>
    `;
    userTableBody.appendChild(row);
  });
}

// Add New User
async function addUser(user) {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  const newUser = await response.json();
  console.log('User Added:', newUser);
  fetchUsers();
}

// Delete User
async function deleteUser(id) {
  await fetch(${apiUrl}/${id}, { method: 'DELETE' });
  console.log('User Deleted:', id);
  fetchUsers();
}

// Edit User (Mock Behavior)
function editUser(id) {
  console.log('Edit User:', id);
  userFormContainer.classList.remove('hidden');
}

// Form Submit Handler
userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = {
    name: ${userForm.firstName.value} ${userForm.lastName.value},
    email: userForm.email.value,
    company: { name: userForm.department.value },
  };
  addUser(user);
  userForm.reset();
  userFormContainer.classList.add('hidden');
});

// Show Add User Form
addUserBtn.addEventListener('click', () => {
  userForm.reset();
  userFormContainer.classList.remove('hidden');
});

// Cancel Form
cancelBtn.addEventListener('click', () => {
  userFormContainer.classList.add('hidden');
});

// Initialize
fetchUsers();
