const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the provided partition key", () => {
    const event = {
      partitionKey: "partition-key",
    };
    const result = deterministicPartitionKey(event);
    expect(result).toBe("partition-key");
  });

  it("Returns hash based event data", () => {
    const event = {
      data: "event",
      message: "hello world",
    };
    const expectedHash =
      "4141f0ede9584ae74e4ebf2ee43c6afee4e03e4078d2554d23f56961e3717d5e24c93076fd535876b4100de6650c65497538fa3233d000fa6382cbb9b6f671f4";
    const result = deterministicPartitionKey(event);
    expect(result).toBe(expectedHash);
  });

  it("Handles non-string partition key input", () => {
    const event = {
      partitionKey: true,
    };
    const expectedResult = "true";
    const result = deterministicPartitionKey(event);
    expect(result).toBe(expectedResult);
  });

  it("Partition key if it exceeds max length", () => {
    const key = "M".repeat(257);
    const expectedHash =
      "8ea259ba605fd3ca753c7821e36d5178bae63e18321155b1d3c6e55dec96f19976eb57832f3595f29174a9e8c91183b4873c8acd244e5702ada74e153a70ac18";
    const event = {
      partitionKey: key,
    };
    const result = deterministicPartitionKey(event);
    expect(result).toBe(expectedHash);
  });

  it("Returns Hash of length 128 even when given a string of length 99999", () => {
    const input = "M".repeat(99999);
    const result = deterministicPartitionKey(input);
    expect(result.length).toEqual(128);
  });
});
