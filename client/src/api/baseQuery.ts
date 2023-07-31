import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const baseUrl = 'http://localhost:4000/api';

export default fetchBaseQuery({ baseUrl, credentials: 'include' });
