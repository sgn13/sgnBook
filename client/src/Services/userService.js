import useHandleResponse from '../utils/handle-response';
import authHeader from '../utils/auth-header';

export function useGetUsers() {
    const handleResponse = useHandleResponse();
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    const getUsers = () => {
        return fetch(
            `${process.env.REACT_APP_API_URL}/api/users`,
            requestOptions
        )
            .then(handleResponse)
            .catch((err) =>
                console.log(err)
            );
    };

    return getUsers;
}
