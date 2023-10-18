import axios from 'axios';


/**
 * Makes an instance of an axios client
 * @returns The client instance
 */
const useClient = () => {
    const client = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        // headers:{
        //     'Content-Type': 'application/json',
        //     'api-key': 'iVhbf5wWMCuUG2JAHCQ0PtulILSrWl0ToRahwm6Mz1Ef1D9XtMSda9mbmcj4ZQaV',
        //     'Access-Control-Resuest-Headers': '*'
        // }
    })
    return client;
}

export default useClient;