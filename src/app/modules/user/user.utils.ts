import jwt, { JwtPayload } from "jsonwebtoken";

export const createToken = (
  jwtPayload: { email: string; role: string },
  secret: string,
  expiresIn: string | number = "20h", // Default expiresIn if not provided
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn: expiresIn as string | number,
  });
};

export const verifyToken = (token: string, secret: string): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};
