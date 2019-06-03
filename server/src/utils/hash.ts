import { createHash } from "crypto";

const hashPassword = (password: string): string => {
  return createHash("sha256")
    .update(password)
    .digest("base64");
};

export { hashPassword };
