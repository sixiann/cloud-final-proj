import axios from 'axios';
import { getUser } from '../../service/AuthService';

const getUsername = () => {
  const user = getUser();
  if (user) {
    return user.username;
  } else {
    return '';
  }
}



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

// // PUT saved startup
// const updateSavedStartup = async (startupId, updatedData) => {
//   try {
//     const response = await axios.put(`${API_BASE_URL}/api/startups/${startupId}`, updatedData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };


// PUT saved startup
const updateSavedInvestor = async (investorId) => {
  // const navigate = useNavigate();

  try {
    const apiurl = 'https://i0npk9dvld.execute-api.us-east-1.amazonaws.com/public/users/update'
    const body = {
      username: getUsername(),
      feature: 'saved_investors',
      values: investorId
    }
    console.log("bodddyyy ", body)
    const response = await axios.post(apiurl, body);

    return;
  } catch (error) {
    throw error;
  }
};

export {
  // getFilteredInvestors,
  updateSavedInvestor,
};
