import { useContext } from 'react';
import { AuthContext } from '../../ContextApi/AuthContext';
import {axiosPrivate as axios} from '../api/axios';
const useRefreshToken = () => {
   
    const { setAccessToken } = useContext(AuthContext);
    const refresh = async () => {
        var apiInfo = {}
        apiInfo['apiKey'] = "1234567"
        apiInfo['projectName'] = "projectOne"
        const response = await axios.post('/auth/refresh',apiInfo, {
            withCredentials: true
        });
        setAccessToken(prev => {
            console.log(prev);
            console.log(response.data.accessToken);
            return { ...prev, accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
    }
    return refresh;
};
export default useRefreshToken;
