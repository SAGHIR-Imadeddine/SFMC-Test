import axios from "axios";
import sfmc from "../config/sfmcConfig.js";

export const login = (req, res) => {
  const authUrl = `${
    sfmc.authDomain
  }/v2/authorize?response_type=code&client_id=${
    sfmc.clientId
  }&redirect_uri=${encodeURIComponent(sfmc.redirectUri)}`;
  res.redirect(authUrl);
};

export const callback = async (req, res) => {
  const { code, tssd } = req.query;
  //if (!code || !tssd) return res.send("Missing code or tssd");
  try {
    const response = await axios.post(
      `https://${tssd || sfmc.myTssd}.auth.marketingcloudapis.com/v2/token`,
      {
        grant_type: "authorization_code",
        client_id: sfmc.clientId,
        client_secret: sfmc.clientSecret,
        redirect_uri: sfmc.redirectUri,
        code,
      }
    );

    const { access_token, expires_in } = response.data;
    console.log(response.data);

    req.session.access_token = access_token;
    req.session.tssd = tssd;
    req.session.expires_at = Date.now() + expires_in * 1000;
    console.log(req.session.access_token);

    res.redirect(`/automations`);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send("Failed to retrieve access token.");
  }
};
