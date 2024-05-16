// AuthService.js
class AuthService {
    async login(loginInfo) {
        try {
            // Perform login API call
            loginInfo['apiKey'] = "1234567"
            loginInfo['projectName'] = "projectOne"
            const response = await fetch(process.env.REACT_APP_API_BASE_URL + 'auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginInfo),
                credentials: 'include'
            });

            if (response.ok) {
                const authorizationInfo = await response.json();

                // console.log("data",authorizationInfo);
                // console.log("coke",);
                // Assuming your backend returns a token upon successful login
                // const token = data.token;
                // Store the token in localStorage or sessionStorage
                // localStorage.setItem('refresh_token', data.access_code.refresh_token);
                // localStorage.setItem('token', data.access_code.access_token);
                // document.cookie = "access_token=" + data.access_code.access_token + "; path=/";
                return authorizationInfo; // Return any additional data if needed
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async register(userData) {
        try {

            // Perform registration API call
            const response = await fetch(process.env.REACT_APP_API_BASE_URL + 'auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
                credentials: 'include'
            });
            const data = await response.json();
            return data
            // if (response.ok) {
            //     // Return any additional data if needed
            //     return data;
            // } else {

            //     return data;
            //     //   throw new Error('Registration failed');
            // }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async logout() {
        try {
            // Perform login API call
            // loginInfo['apiKey'] = "1234567"
            // loginInfo['projectName'] = "projectOne"
            const response = await fetch(process.env.REACT_APP_API_BASE_URL + 'auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify(loginInfo),
                credentials: 'include'
            });

            if (response.ok) {
                // Successfully logged out, do additional client-side cleanup if necessary
                window.location.reload();
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }
}

export default new AuthService();
