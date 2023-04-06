const USER_DATA_FILE = "../Json/users.json";

async function sha256(message) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);

  // hash the message
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

async function loadUsers() {
  try {
    // Fetch the user data file
    const response = await fetch(USER_DATA_FILE);
    const userList = await response.json();

    // Check if any users exist in the user data
    if (userList.length === 0) {
      // No users exist, prompt for user creation
      promptUserCreation(userList);
    } else {
      // Users exist, prompt for login
      promptUserLogin(userList);
    }
  } catch (error) {
    console.error(
      `An error occurred while fetching user data: ${error.message}`
    );
    alert("An error occurred. Please try again later."); // Show an error message if something goes wrong with the data fetch
  }
}

function promptUserCreation(userList) {
  const form = document.querySelector("form");
  const usernameInput = document.querySelector("#username");
  const passwordInput = document.querySelector("#password");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get the values of the username and password input fields
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Create a new user object
    const newUser = {
      username: username,
      password: await sha256(password),
    };

    // Add the new user to the user data
    userList.push(newUser);

    // Update the user data file with the new user information
    try {
      const response = await fetch(USER_DATA_FILE, {
        method: "POST",
        body: JSON.stringify(userList),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to update user data.");
      }
    } catch (error) {
      console.error(
        `An error occurred while updating user data: ${error.message}`
      );
      alert("An error occurred. Please try again later."); // Show an error message if something goes wrong with the data update
      return;
    }

    // Redirect to the dashboard upon successful user creation
    window.location.href = "/dashboard";
  });
}

function promptUserLogin(userList) {
  const form = document.querySelector("form");
  const usernameInput = document.querySelector("#username");
  const passwordInput = document.querySelector("#password");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get the values of the username and password input fields
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Hash the password using SHA-256
    const hashedPassword = await sha256(password);

    // Find the user with the provided username in the user data
    const user = userList.find((user) => user.username === username);

    // Check if the user was found and the password matches
    if (user && user.password === hashedPassword) {
      window.location.href = "/dashboard"; // Redirect to the dashboard upon successful login
    } else {
      alert("Incorrect username or password."); // Show an error message if the login credentials are incorrect
    }
  });
}

loadUsers();
