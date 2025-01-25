import config from "../../config";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { createToken } from "./user.utils";

const createUserIntoDB = async (payload: TUser) => {
  const user = await User.create(payload);

  const jwtPayload = {
    email: payload.email,
    role: payload.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwtAccessSecret as string,
    // config.jwtAccessExpiresIn as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwtRefreshSecret as string,
    // config.jwtRefreshExpiresIn as string,
  );

  return {
    user,
    accessToken,
    refreshToken,
  };
};

export const UserServices = {
  createUserIntoDB,
};
