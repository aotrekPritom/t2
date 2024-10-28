import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), ',.env') });

export default {
  port: process.env.PORT,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  access_token_expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
  refresh_token_expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN,
  agora_app_id: process.env.AGORA_APP_ID,
  agora_app_certificate: process.env.AGORA_APP_CERTIFICATE,
  agora_channel_expiry: process.env.AGORA_CHANNEL_EXPIRY,
};
