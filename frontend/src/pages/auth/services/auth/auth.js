import instance from '../../../../environment/axiosInstance';

export const signup = async(signupDto) => {
    try {
      console.log('Sending signup request with data:', signupDto); // Debug log
      const response = await instance.post('/api/auth/signup', signupDto);
      console.log('Signup response:', response); // Debug log
      return response;
    } catch (error) {
         console.log('Error signing up:', error);
         console.log('Error response:', error.response); // This will show backend error
         console.log('Error status:', error.response?.status);
         console.log('Error data:', error.response?.data);
         throw error;
    }
}

export const signin = async(signinDto) => {
    try {
      console.log('Sending signin request with data:', signinDto); // Debug log
      const response = await instance.post('/api/auth/signin', signinDto);
      console.log('Signin response:', response); // Debug log
      return response;
    } catch (error) {
         console.log('Error logging in:', error);
         throw error;
    }
}