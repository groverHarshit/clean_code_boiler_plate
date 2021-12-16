const bcrypt = require('bcryptjs');

const passwordService = () => {
  const password = (user) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(user.password, salt);

    return hash;
  };

  const convertPassword = (password) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  };
  
  const comparePassword = (pw, hash) => (
    bcrypt.compareSync(pw, hash)
  );

  return {
    password,
    convertPassword,
    comparePassword,
  };
};

module.exports = passwordService();
