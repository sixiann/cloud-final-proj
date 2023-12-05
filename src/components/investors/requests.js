import axios from 'axios';

const API_BASE_URL = 'https://api.example.com';

// GET companies based on search
// const getCompaniesBasedOnSearch = async (searchQuery) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/api/companies?search=${searchQuery}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// GET companies based on industry
const getFilteredCompanies = async (searchQuery, industryId, investorId, stage) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/
      companies
      ?search=${searchQuery}
      ?industry=${industryId}
      ?investor=${investorId}
      ?stage=${stage}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// // GET companies based on industry
// const getCompaniesBasedOnIndustry = async (industryId) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/api/companies?industry=${industryId}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// // GET companies based on investors
// const getCompaniesBasedOnInvestors = async (investorId) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/api/companies?investor=${investorId}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// // GET companies based on stage
// const getCompaniesBasedOnStage = async (stage) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/api/companies?stage=${stage}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// PUT saved startup
const updateSavedStartup = async (startupId, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/startups/${startupId}`, updatedData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  getFilteredCompanies,
  // getCompaniesBasedOnSearch,
  // getCompaniesBasedOnIndustry,
  // getCompaniesBasedOnInvestors,
  // getCompaniesBasedOnStage,
  updateSavedStartup,
};
