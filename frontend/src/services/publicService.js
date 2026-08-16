import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

/**
 * Fetch public school overview and statistics from MongoDB backend
 */
export const fetchPublicInfo = async () => {
  try {
    const res = await axios.get(`${API_BASE}/public/info`);
    return res.data?.data || null;
  } catch (err) {
    console.warn('Backend fetchPublicInfo failed, using local fallback:', err.message);
    return null;
  }
};

/**
 * Fetch public teachers / faculty members from MongoDB backend
 */
export const fetchPublicTeachers = async () => {
  try {
    const res = await axios.get(`${API_BASE}/public/teachers`);
    return res.data?.data || [];
  } catch (err) {
    console.warn('Backend fetchPublicTeachers failed, using local fallback:', err.message);
    return [];
  }
};

/**
 * Fetch public notices from MongoDB backend
 */
export const fetchPublicNotices = async () => {
  try {
    const res = await axios.get(`${API_BASE}/public/notices`);
    return res.data?.data || [];
  } catch (err) {
    console.warn('Backend fetchPublicNotices failed, using local fallback:', err.message);
    return [];
  }
};

/**
 * Submit online admission inquiry to MongoDB backend
 */
export const submitAdmissionInquiry = async (inquiryData) => {
  try {
    const res = await axios.post(`${API_BASE}/public/admission-inquiry`, inquiryData);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to submit admission inquiry');
  }
};

/**
 * Submit public contact message to MongoDB backend
 */
export const submitContactInquiry = async (contactData) => {
  try {
    const res = await axios.post(`${API_BASE}/public/contact-inquiry`, contactData);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to submit contact message');
  }
};
