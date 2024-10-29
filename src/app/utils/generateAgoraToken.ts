// Function to generate Agora Token
import { RtcTokenBuilder, RtcRole } from 'agora-access-token';
import config from '../config';

export const generateAgoraToken = (
  channelName: string,
  uid: number,
  role: number,
) => {
  const appID = config.agora_app_id as string; // Ensure this is set
  const appCertificate = config.agora_app_certificate as string; // Ensure this is set

  const expirationTimeInSeconds = 3600; // Token validity duration in seconds
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  // Generate the token
  const token = RtcTokenBuilder.buildTokenWithUid(
    appID,
    appCertificate,
    channelName,
    uid,
    role,
    privilegeExpiredTs,
  );
  return token;
};
