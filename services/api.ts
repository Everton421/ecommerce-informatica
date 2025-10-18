import https from 'https';
import axios from 'axios';

// Create a custom HTTPS agent
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

// Option 1: Apply to an Axios instance
export const api = axios.create({
  httpsAgent,
});

 