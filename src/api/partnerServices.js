import axiosInstance from '../api/axiosInstance';

/**
 * Fetches the list of all partners from the backend.
 *
 * @returns {Promise<Array>} A promise that resolves to the array of partners.
 * @throws Will throw an error if the API call fails.
 */
export const fetchPartnersList = async () => {
  try {
    const response = await axiosInstance.get('/partners');
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches the partner details for a specific partner ID from the backend.
 *
 * @param {string} partnerId - The unique ID of the partner to be fetched.
 * @returns {Promise<Object>} A promise that resolves to the partner details.
 * @throws Will throw an error if the API call fails.
 */
export const fetchPartnerById = async partnerId => {
  try {
    const response = await axiosInstance.get(`/partners/${partnerId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Creates a new partner by sending partner details to the backend.
 *
 * @param {Object} partnerData - The data object containing all partner fields.
 * @returns {Promise<Object>} A promise that resolves to the created partner's response.
 * @throws Will throw an error if the API call fails.
 */
export const createPartner = async partnerData => {
  try {
    const response = await axiosInstance.post('/partners', partnerData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Updates a partner's details by their ID.
 *
 * @param {Object} partnerData - The updated partner data to be sent to the server.
 * @param {string|number} partnerId - The unique identifier of the partner to update.
 * @returns {Promise<Object>} The updated partner data from the server response.
 * @throws {Error} Throws an error if the request fails.
 */
export const updatePartnerById = async (partnerData, partnerId) => {
  try {
    const response = await axiosInstance.put(
      `/partners/${partnerId}`,
      partnerData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
