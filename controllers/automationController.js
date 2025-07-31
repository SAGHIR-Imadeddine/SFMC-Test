import axios from "axios";
import sfmc from "../config/sfmcConfig.js";

export const getAutomations = async (req, res) => {
  const { access_token, expires_at, tssd } = req.session;
  console.log(req.session);

  if (!access_token || Date.now() >= expires_at)
    return res
      .status(401)
      .send(
        `<h1>Token expired. Please log in again.</h1><a href="/auth/login">Login with SFMC</a>`
      );

  try {
    const response = await axios.get(
      `https://${
        tssd || sfmc.myTssd
      }.rest.marketingcloudapis.com/automation/v1/automations`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const automationsData = {
      page: response.data.page,
      pageSize: response.data.pageSize,
      count: response.data.count,
      automations: response.data.items,
    };

    res.render("../views/automations.ejs", automationsData);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send("Failed to fetch data extensions.");
  }
};
