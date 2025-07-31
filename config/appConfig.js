import "dotenv/config";

const conf = {
  port: process.env.PORT,
  url: process.env.URL,
  sessionSecret: process.env.SESSION_SECRET,
};

export default conf;
