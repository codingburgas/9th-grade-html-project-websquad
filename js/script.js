function switchTab(tab) {
  document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.form').forEach(el => el.classList.remove('active'));
  document.querySelector(`.tab[onclick*="${tab}"]`).classList.add('active');
  document.getElementById(tab).classList.add('active');
}

async function updateUserPanel() {
  const panel = document.getElementById('user-panel');
  if (!panel) return;

  try {
    const res = await fetch('http://localhost:3000/auth-status', {
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Auth status fetch failed');
    const data = await res.json();

    if (data.loggedIn) {
      panel.innerHTML = `
        <div class="user-dropdown" style="position: relative; display: inline-block;">
          <button class="user-button" style="cursor: pointer; background: none; border: none; font-weight: bold;">
            ${data.username} ▼
          </button>
          <div class="dropdown-content" style="
            display: none;
            position: absolute;
            background-color: white;
            border: 1px solid #ccc;
            min-width: 120px;
            right: 0;
            z-index: 1000;
          ">
            <button id="logoutBtn" style="width: 100%; padding: 8px; border: none; background: none; text-align: left; cursor: pointer;">
              Logout
            </button>
          </div>
        </div>
      `;

      const userButton = panel.querySelector('.user-button');
      const dropdownContent = panel.querySelector('.dropdown-content');
      const logoutBtn = document.getElementById('logoutBtn');

      userButton.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
      });

      logoutBtn.addEventListener('click', async () => {
        await logout();
      });

      document.addEventListener('click', () => {
        dropdownContent.style.display = 'none';
      });

    } else {
      panel.innerHTML = `<a href="html/login.html">Login</a>`;
    }
  } catch (err) {
    console.error('Error checking auth status:', err);
    panel.innerHTML = `<a href="html/login.html">Login</a>`;
  }
}

// Logout function
async function logout() {
  try {
    const res = await fetch('http://localhost:3000/logout', {
      method: 'GET',
      credentials: 'include',
    });
    if (res.ok) {
      await updateUserPanel();
      window.location.href = '/';
    } else {
      alert('Logout failed');
    }
  } catch (err) {
    alert('Logout error: ' + err.message);
  }
}

async function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      alert('Login successful!');
      window.location.href = '/';
    } else {
      const text = await res.text();
      alert('Login failed: ' + text);
    }
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

async function handleSignup(event) {
  event.preventDefault();
  const username = document.getElementById('signupUsername').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  try {
    const res = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, email, password }),
    });
    if (res.ok) {
      alert('Signup successful! Please login.');
      switchTab('login');
    } else {
      const text = await res.text();
      alert('Signup failed: ' + text);
    }
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateUserPanel();

  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) loginBtn.addEventListener('click', handleLogin);

  const signupBtn = document.getElementById('signupBtn');
  if (signupBtn) signupBtn.addEventListener('click', handleSignup);
});

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  function myFunction1() {
    document.getElementById("myDropdown1").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  function myFunction2() {
    document.getElementById("myDropdown2").classList.toggle("show");
  }
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }