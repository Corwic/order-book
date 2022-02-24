/* eslint-disable no-undef */
import organizeInitialData from "../store/organizeInitialData";
import data from "./data";

const { bids, asks } = organizeInitialData(data);

describe("organizeInitialData", () => {
  test("should return bid prices in descending order", () => {
    // console.log("bids", bids[0], ">", bids[24], bids[0] > bids[24]);
    expect(bids[0] > bids[24]).toBe(true);
  });
  test("should return ask prices in ascending order", () => {
    // console.log("asks", asks[0], "<", asks[24], asks[0] < asks[24]);
    expect(asks[0] < asks[24]).toBe(true);
  });
});
