export default () => ({
  jwtSecret: process.env.JWTKEY,
  jwtExpToken: process.env.TOKEN_EXPIRATION,
});
