import axiosInstance from '../networking/axiosInstance';

/**
 * Fetches partners filtered by onboarding status, with pagination.
 *
 * @async
 * @function fetchPartnersByStatus
 * @param {string} status - The onboarding status to filter partners.
 * @param {number} [page=1] - Page number for pagination.
 * @param {number} [limit=10] - Number of results per page.
 * @returns {Promise<Object>} Resolves with a list of filtered partners.
 * @throws {Error} Throws error if the API request fails.
 */
export const fetchPartnersByStatus = async (status, page = 1, limit = 10) => {
  try {
    const response = await axiosInstance.get('/partners', {
      params: {onboardingStatus: status, page, limit},
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches the partner details for a specific partner ID from the backend.
 *
 * @async
 * @function fetchPartnerById
 * @param {string} partnerId - The unique ID of the partner to be fetched.
 * @returns {Promise<Object>} Resolves with partner details if successful.
 * @throws {Error} Throws error if the API request fails.
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
 * Searches for partners using a keyword with optional pagination and status filter.
 *
 * @async
 * @function searchPartnersByKeyword
 * @param {string} search - Keyword used to search partners.
 * @param {number} [page=1] - Page number for pagination.
 * @param {number} [limit=10] - Number of results per page.
 * @param {string|null} [status=null] - Optional onboarding status filter.
 * @returns {Promise<Object>} Resolves with a list of matched partners.
 * @throws {Error} Throws error if the API request fails.
 */
export const searchPartnersByKeyword = async (
  search,
  page = 1,
  limit = 10,
  status = null,
) => {
  try {
    const params = {search, page, limit};
    if (status) {
      params.onboardingStatus = status;
    }
    const response = await axiosInstance.get('/partners', {params});
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Creates a new partner by sending partner details to the backend.
 *
 * @async
 * @function createPartner
 * @param {Object} partnerData - The data object containing all required partner fields.
 * @returns {Promise<Object>} Resolves with the newly created partner's data.
 * @throws {Error} Throws error if the API request fails.
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
 * Updates an existing partner's details by their ID.
 *
 * @async
 * @function updatePartnerById
 * @param {Object} partnerData - Updated partner data.
 * @param {string|number} partnerId - The unique ID of the partner to update.
 * @returns {Promise<Object>} Resolves with updated partner data from the backend.
 * @throws {Error} Throws error if the API request fails.
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
