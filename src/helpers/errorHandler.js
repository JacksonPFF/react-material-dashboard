export default (error) => {
  if (error.response) {
    const { response } = error;
    if (response.statusText !== 'OK') {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        localStorage.removeItem('user');
        // location.reload(true);
      }
    }
    const errorMessage = response.data.message || response.statusText;
    return Promise.reject(errorMessage);
  }
  return Promise.reject(error);
}
