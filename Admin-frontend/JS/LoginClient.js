const form = document.querySelector("form");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const infoText = document.querySelector("#InfoText");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;

  // Make GET request to server to check if there are any existing users
  const response = await fetch("http://localhost:5500/users", {
    method: "GET",
  });

  if (response.ok) {
    const users = await response.json();
    if (users.length === 0) {
      // No existing users, switch to account creation flow
      const createResponse = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const createData = await createResponse.json();
      infoText.textContent = createData.message;
    } else {
      // Existing users, attempt login
      const loginResponse = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        infoText.textContent = loginData.message;
        // Redirect to admin page
        window.location.href = "/admin";
      } else {
        const loginData = await loginResponse.json();
        infoText.textContent = loginData.error;
      }
    }
  } else {
    const data = await response.json();
    infoText.textContent = data.error;
  }
});
