import crypto from "crypto";
export const generateUniqueFilename = () => {
  const timestamp = new Date().getTime();
  const randomString = crypto.randomBytes(8).toString("hex");
  return `${timestamp}_${randomString}`;
};
