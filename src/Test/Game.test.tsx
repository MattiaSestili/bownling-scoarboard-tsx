import { Frame, pinsRemaining } from "../Helpers/Helpers";

describe("Bowling score", () => {
  it("should return 7 pins if the first throw hits 3 pins", () => {
    const score: Frame[] = [
      {
        leftBox: 3,
        totalScore: 0,
        pinsRemaining: 7,
        extraBox: 0,
        rightBox: 0
      },
    ];
    expect(pinsRemaining(score)).toEqual(7);
  });

  it("should return 10 pins if the first throw hits 10 pins", () => {
    const score: Frame[] = [
      {
        leftBox: 10,
        totalScore: 0,
        pinsRemaining: 10,
        rightBox: 0,
        extraBox: 0
      },
    ];
    expect(pinsRemaining(score)).toEqual(10);
  });

  it("should return 10 pins if a second throw is played", () => {
    const score: Frame[] = [
      {
        leftBox: 3,
        rightBox: 5,
        totalScore: 8,
        pinsRemaining: 10,
        extraBox: 0
      },
    ];
    expect(pinsRemaining(score)).toEqual(10);
  });

  // TODO Improve test scoring calculation..
  // it("1st frame should if strike and second frame is spare should return 20", () => {
  //   const rolls = [[10], [7, 3]];
  //   const result: Frame[] = [{ leftBox: "", rightBox: "X", totalScore: 20, extraBox: 0, pinsRemaining: 10 }]
  //   expect(score(rolls, 0)).toEqual(result);
  // });
});