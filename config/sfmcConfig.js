import "dotenv/config";

const sfmc = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
  myTssd: process.env.MY_TSSD,
  authDomain: process.env.AUTH_DOMAIN,
  scopes: process.env.SCOPES,
};

export default sfmc;
