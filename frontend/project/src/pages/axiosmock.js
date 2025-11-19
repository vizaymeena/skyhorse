// src/mockAxios.js
const mockAxios = {
  get: (url) => {
    console.log('Mock GET:', url);
    return Promise.resolve({ 
      data: [],
      status: 200 
    });
  },
  
  post: (url, data) => {
    console.log('Mock POST:', url, data);
    return Promise.resolve({ 
      data: { id: 1, ...data },
      status: 201 
    });
  },
  
  put: (url, data) => {
    console.log('Mock PUT:', url, data);
    return Promise.resolve({ 
      data: { id: 1, ...data },
      status: 200 
    });
  },
  
  delete: (url) => {
    console.log('Mock DELETE:', url);
    return Promise.resolve({ 
      data: { message: 'Deleted successfully' },
      status: 200 
    });
  }
};

export default mockAxios;