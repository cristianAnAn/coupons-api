// utils/responseDto.js
function createResponse({ result = null, message = '', isSuccess = true }) {
  return {
    isSuccess,
    message,
    result
  };
}

module.exports = createResponse;
