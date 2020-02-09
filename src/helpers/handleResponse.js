export function handleResponse(response) {
  const { errors = [] } = response;

  if (errors.length > 0) {
    console.log('errors', errors);
    return Promise.reject(errors);
  }

  return Promise.resolve(response);
}
