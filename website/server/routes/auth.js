const express = require("express");
const router = express.Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");

const TwitchSession = require("../models/TwitchSession");
const User = require("../models/User");

router.post("/", async (req, res) => {
  const { code } = req.body;

  try {
    const tokenResponse = await axios.post(
      "https://id.twitch.tv/oauth2/token",
      null,
      {
        params: {
          client_id: process.env.TWITCH_CLIENT_ID,
          client_secret: process.env.TWITCH_CLIENT_SECRET,
          code,
          grant_type: "authorization_code",
          redirect_uri: process.env.TWITCH_REDIRECT_URI,
        },
      },
    );

    const { access_token, refresh_token } = tokenResponse.data;

    const userResponse = await axios.get("https://api.twitch.tv/helix/users", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Client-Id": process.env.TWITCH_CLIENT_ID,
      },
    });

    const userData = userResponse.data.data[0];

    const checkFollow = await axios.get(
      "https://api.twitch.tv/helix/channels/followed",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Client-Id": process.env.TWITCH_CLIENT_ID,
        },
        params: {
          user_id: userData.id,
          broadcaster_id: process.env.TWITCH_TARGET_CHANNEL_ID,
        },
      },
    );

    const checkSubscriber = await axios.get(
      "https://api.twitch.tv/helix/subscriptions/user",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Client-Id": process.env.TWITCH_CLIENT_ID,
        },
        params: {
          user_id: userData.id,
          broadcaster_id: process.env.TWITCH_TARGET_CHANNEL_ID,
        },
      },
    );

    const isFollowing = true;
    const isSubscriber = checkSubscriber.data.data.length > 0;

    const user = await User.findOne({ twitchId: userData.id });

    const canClaimBonus = isFollowing && (!user || !user.claimedFollowBonus);

    const setQuery = {
      username: userData.display_name,
      profileImageUrl: userData.profile_image_url,
      isFollowing: isFollowing,
      isSubscriber: isSubscriber,
      lastLogin: new Date(),
    };

    if (canClaimBonus) {
      setQuery.claimedFollowBonus = true;
    }

    await User.updateOne(
      { twitchId: userData.id },
      {
        $inc: { coins: canClaimBonus ? 300 : 0 },
        $set: setQuery,
        ...(canClaimBonus && {
          $push: {
            coinsHistory: {
              amount: 300,
              reason: "Follow Bonus",
              date: new Date(),
            },
          },
        }),
      },
      { upsert: true },
    );

    await TwitchSession.updateOne(
      { twitchId: userData.id },
      {
        $set: {
          accessToken: access_token,
          refreshToken: refresh_token,
          updatedAt: new Date(),
        },
      },
      { upsert: true },
    );

    const sessionToken = jwt.sign(
      { twitchId: userData.id },
      process.env.JWT_SECRET,
      { expiresIn: "30m" },
    );

    res.send({ sessionToken });
  } catch (error) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

module.exports = router;
