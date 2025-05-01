import axiosInstance from '../api/axiosInstance';

/**
 * Fetches the list of all banks from the backend API.
 *
 * @async
 * @function getBankList
 * @returns {Promise<Array>} A promise that resolves to an array of bank objects.
 * @throws {Error} If the API call fails.
 */
export const getBankList = async () => {
  try {
    const response = await axiosInstance.get('/banks');
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches bank details using a bank name and search code.
 *
 * @async
 * @function getBankBySearchCode
 * @param {string} bankName - The name of the bank (part of the URL path).
 * @param {string} searchCode - The search code to pass as a query parameter.
 * @returns {Promise<Object>} A promise that resolves to the bank details.
 * @throws {Error} If the API call fails.
 */
export const getBankBySearchCode = async (bankName, searchCode) => {
  try {
    const encodedBankName = encodeURIComponent(bankName); // Safe for URL path
    const response = await axiosInstance.get(`/banks/${encodedBankName}`, {
      params: {search: searchCode},
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Searches banks by query string.
 * @param {string} query - The text to search.
 * @returns {Promise<Array>} Matching bank list.
 */
export const searchBanks = async query => {
  try {
    const response = await axiosInstance.get(`/banks?search=${query}`);
    return response.data;
  } catch (error) {
    console.error('Failed to search banks:', error);
    throw error;
  }
};

/**
 * Verifies a bank's IFSC code by sending the bank name and IFSC code to the backend.
 *
 * @async
 * @function verifyBankIFSC
 * @param {string} bankName - The full name of the bank.
 * @param {string} ifscCode - The IFSC code to validate.
 * @returns {Promise<Object>} The response data containing bank details if validation is successful.
 * @throws {Error} If the API request fails or the IFSC code is invalid.
 */
export const verifyBankIFSC = async (bankName, ifscCode) => {
  try {
    const encodedBankName = encodeURIComponent(bankName);
    const response = await axiosInstance.get(
      `/banks/verify-ifsc?bankName=${encodedBankName}&ifscCode=${ifscCode}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error verifying IFSC code:', error);
    throw error;
  }
};
