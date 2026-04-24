import protobuf from "protobufjs";

let root: any;
let UserList: any;

export const initProto = async () => {
  root = await protobuf.load("/proto/user.proto");
  UserList = root.lookupType("UserList");
};

export const decodeUsers = (buffer: ArrayBuffer) => {
  const bytes = new Uint8Array(buffer);
  const decoded = UserList.decode(bytes);
  return UserList.toObject(decoded, {
    longs: String,
    bytes: Buffer,
  });
};