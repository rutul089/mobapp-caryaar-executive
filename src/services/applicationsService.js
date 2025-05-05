import axiosInstance from '../networking/axiosInstance';

/**
 * Fetches all loan applications.
 *
 * @async
 * @function fetchLoanApplications
 * @returns {Promise<Object[]>} Array of loan applications
 * @throws Will throw an error if the request fails
 */
export const fetchLoanApplications = async () => {
  try {
    const response = await axiosInstance.get('/loan-applications/');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch loan applications:', error);
    throw error;
  }
};

/**
 * Fetches a specific loan application by ID.
 *
 * @async
 * @function fetchLoanApplicationById
 * @param {string} id - The ID of the loan application
 * @returns {Promise<Object>} Loan application details
 * @throws Will throw an error if the request fails
 */
export const fetchLoanApplicationById = async id => {
  try {
    const response = await axiosInstance.get(`/loan-applications/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch loan application with ID ${id}:`, error);
    throw error;
  }
};
