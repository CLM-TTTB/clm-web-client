import axios from 'axios';
import AppProperty from '~/constants/appProperties';

const publicRequest = axios.create({
  baseURL: AppProperty.CLM_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default publicRequest;
