import axios from 'axios';

const useClient = () => {
    const client = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL
    })
    return client;
}

export default useClient;