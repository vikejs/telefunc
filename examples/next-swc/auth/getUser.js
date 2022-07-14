export { getUser }

function getUser(req) {
  // Fake implementation. A real implementation would, for example, use `req.headers.cookie` to retrieve the logged-in user.
  return {
    id: 0,
    name: 'Elisabeth'
  }
}
