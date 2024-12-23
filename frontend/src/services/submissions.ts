import axios from 'axios';

const API_ROOT = 'http://localhost:5000/api';
const API_VERSION = '/v1';
const SUBMISSIONS_SUFFIX = '/tournament-submissions';
const API_URL = `${API_ROOT}${API_VERSION}${SUBMISSIONS_SUFFIX}`;

export const createTournamentSubmission = async (newSubmission: any) => {
    try {
        const response = await axios.post(API_URL, newSubmission);
        if (response.data.success) {
            return response.data;
        } else {
            return { success: false, message: response.data.message || 'Error from backend.' };
        }
    } catch (err: any) {
        console.error(err);
        return { success: false, message: err.response?.data?.message || 'Error from backend.' };
    }
}