import protobuf from "protobufjs";
import path from "path";

const root = await protobuf.load(path.resolve("src/proto/user.proto"));

export const UserList = root.lookupType("UserList");

export const encodeUsers = (users) => {
  const message = UserList.create({ users });
  return UserList.encode(message).finish();
};