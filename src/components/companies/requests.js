import axios from 'axios';

// GET companies based on industry
const getFilteredCompanies = async (searchQuery, industryId, employeeCount, region, funding) => {
  // console.log("filters   : ", searchQuery, industryId, employeeCount, region, funding)
  try {
    const requestBody = {
      searchQuery: searchQuery,
      category_list: !industryId.length ? [] :[industryId],
      employee_count: employeeCount,
      region: region,
      total_funding: funding
    };

    const url = 'https://i0npk9dvld.execute-api.us-east-1.amazonaws.com/public/companies';

    axios.post(url, requestBody)
      .then(response => {
        // console.log('Response:', response.data);
        console.log("IN AXIOS   :  ", response.data.body)
        return response.data.body;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  } catch (error) {
    throw error;
  }
};

// PUT saved startup
const updateSavedStartup = async (startupId, updatedData) => {
  try {
    // const response = await axios.put(`${API_BASE_URL}/api/startups/${startupId}`, updatedData);
    // return response.data;
    return;
  } catch (error) {
    throw error;
  }
};

export {
  getFilteredCompanies,
  updateSavedStartup,
};
