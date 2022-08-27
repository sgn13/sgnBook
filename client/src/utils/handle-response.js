import { authenticationService } from '../Services/authenticationService';

const useHandleResponse = () => {

    const handleResponse = response => {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if ([401, 403].indexOf(response.status) !== -1) {
                    authenticationService.logout();
                    console.log('error');

                    // enqueueSnackbar('User Unauthorized', {
                    //     variant: 'error',
                    // });
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        });
    };

    return handleResponse;
};

export default useHandleResponse;
