function setLoggedInUserId(req, userID) {
    req.session.loggedInUserId = userID;
  }

  function getLoggedInUserId(req) {
    return req.session.loggedInUserId;
  }

module.exports = { setLoggedInUserId, getLoggedInUserId };