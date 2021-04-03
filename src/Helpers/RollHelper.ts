import { Frame } from "./Helpers";

export const firstRoll = (currentPlayerRolls: number[], frameIndex: number): number => {
  if (currentPlayerRolls) {
    return currentPlayerRolls[frameIndex]
  }

  return 0;
};

export const secondRoll = (currentPlayerRolls: number[], frameIndex: number): number => {
  if (currentPlayerRolls) {
    return currentPlayerRolls[frameIndex + 1]
  }
  return 0;
};

export const thirdRoll = (currentPlayerRolls: number[], frameIndex: number): number => {
  if (currentPlayerRolls) {
    return currentPlayerRolls[frameIndex + 2]
  }
  return 0;
};

export const frameScore = (currentPlayerRolls: number[], frameIndex: number): number => {
  return firstRoll(currentPlayerRolls, frameIndex) + secondRoll(currentPlayerRolls, frameIndex)
};

export const spareBonus = (currentPlayerRolls: number[], frameIndex: number) => {
  return thirdRoll(currentPlayerRolls, frameIndex)
};

export const strikeBonus = (currentPlayerRolls: number[], frameIndex: number) => {
  return secondRoll(currentPlayerRolls, frameIndex) + thirdRoll(currentPlayerRolls, frameIndex)
};

export const isStrike = (currentPlayerRolls: number[], frameIndex: number) => {
  return firstRoll(currentPlayerRolls, frameIndex) === 10
};

export const isSpare = (currentPlayerRolls: number[], frameIndex: number) => {
  return frameScore(currentPlayerRolls, frameIndex) === 10;
}

export const saveFrame = (
  currentPlayerRolls: number[],
  frameIndex: number,
  allScores: Frame[],
  leftBox: number | string,
  rightBox: number | string,
  score: number,
  pinsRemaining: number) => {
  if (allScores.length < 9) {
    allScores.push({
      extraBox: 0,
      leftBox,
      rightBox,
      totalScore: score,
      pinsRemaining
    });
  } else {
    const firstResult = firstRoll(currentPlayerRolls, frameIndex) === 10 ? "X" : firstRoll(currentPlayerRolls, frameIndex);
    const secondResult =
      secondRoll(currentPlayerRolls, frameIndex) === 10 ? "X" : isSpare(currentPlayerRolls, frameIndex) ? "/" : secondRoll(currentPlayerRolls, frameIndex);

    let thirdResult;
    if (thirdRoll(currentPlayerRolls, frameIndex) === 10) {
      thirdResult = "X";
    } else if (firstRoll(currentPlayerRolls, frameIndex) === 10 || firstRoll(currentPlayerRolls, frameIndex) + secondRoll(currentPlayerRolls, frameIndex) === 10) {
      thirdResult = thirdRoll(currentPlayerRolls, frameIndex);
    } else {
      thirdResult = "";
    }

    allScores.push({
      leftBox: firstResult,
      rightBox: secondResult,
      totalScore: score,
      pinsRemaining,
      extraBox: thirdResult
    });
  }
};
