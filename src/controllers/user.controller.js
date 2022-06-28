exports.allAccess = (_req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (_req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (_req, res) => {
  res.status(200).send("Admin Content.");
};

exports.postBoard = (_req, res) => {
  res.status(200).send("post Content.");
};
