const generateToken = () => {
  let token = '';
const string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
for (let i = 0; i < 16; i += 1) {
  token += string.charAt(Math.floor(Math.random() * string.length));
}
return token;
};

module.exports = generateToken;