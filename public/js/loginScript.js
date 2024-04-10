// Function to handle login form submission
const handleLogin = async (e) => {
	e.preventDefault();

	// Retrieve values from the login form
	const userName = document.getElementById('login-username').value;
	const password = document.getElementById('login-password').value;

	try {
		// Send a POST request to the server to login
		const response = await axios.post('/api/login', { userName, password });

		// If login is successful, display a success message
		if (response.status === 200) {
			const token = response.data.token;
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			alert('Login successful');

			// refetch messages
			fetchMessages();
		}
	} catch (error) {
		// If there's an error during login, display an error message
		alert('Login failed. Please check your username and password.');
	}
};

// Add event listener to the login form
document.getElementById('login-form').addEventListener('submit', handleLogin);
