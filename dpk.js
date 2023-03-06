const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const createHash = (key) =>
  crypto.createHash("sha3-512").update(key).digest("hex");

const stringifyObj = (obj) => JSON.stringify(obj);

exports.deterministicPartitionKey = (event) => {
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  let candidate = event.partitionKey || createHash(stringifyObj(event));

  if (typeof candidate !== "string") {
    candidate = stringifyObj(candidate);
  }

  return candidate.length > MAX_PARTITION_KEY_LENGTH
    ? createHash(candidate)
    : candidate;
};
