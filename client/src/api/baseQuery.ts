import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const baseUrl = import.meta.env.PROD ? 'berkeley.fly.dev/api' : 'http://localhost:4000/api';

export default fetchBaseQuery({ baseUrl, credentials: 'include' });
