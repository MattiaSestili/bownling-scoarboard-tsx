import { firstRoll, frameScore, isSpare, isStrike, saveFrame, secondRoll, spareBonus, strikeBonus } from "./RollHelper";

export type Player = {
  id: string;
  playerName: string;
  frame: Frame[];
  currentFrameIndex: number
  winningTimes: number;
}

export type Frame = {
  leftBox: number | string,
  rightBox: number | string,
  totalScore: number,
  pinsRemaining: number,
  extraBox: number | string,
}

//count the number of pins knocked down
export const roll = (
  pins: number,
  rolls: number[][],
  currentPlayerIndex: number,
  players: Player[],
  saveScore: (playerId: string, score: Frame[], currentPlayerId: number, isLastFrame: boolean) => void,
) => {
  const currentPlayerFrame = rolls[currentPlayerIndex];
  const currentPlayer = players[currentPlayerIndex];
  let currentFrameIdx = currentPlayer.currentFrameIndex;
  currentPlayerFrame[currentFrameIdx] = pins;
  const frame = score(rolls, currentPlayerIndex);
  const isLastFrame = !!frame[9]?.leftBox;
  saveScore(currentPlayer.id, frame, currentPlayerIndex, isLastFrame);
}

export const pinsRemaining = (score: Frame[]): number => {
  const allScores = score;
  let pinsRemaining = 10;
  allScores.forEach((frame) => {
    if (frame.pinsRemaining !== null && !isNaN(frame.pinsRemaining)) {
      pinsRemaining = frame.pinsRemaining;
    }
  });
  return pinsRemaining;
}

//counting score after a roll
export const score = (rolls: number[][], currentPlayerIndex: number): Frame[] => {
  let allScores: Frame[] = [];
  let score = 0;
  let frameIndex = 0;
  const currentPlayerRolls = rolls[currentPlayerIndex];

  // logic of score counting
  for (let i = 0; i < 10; i++) {
    if (isStrike(currentPlayerRolls, frameIndex)) {
      score += 10 + strikeBonus(currentPlayerRolls, frameIndex);
      saveFrame(currentPlayerRolls, frameIndex, allScores, "", "X", score, 10);
      frameIndex++;
    } else if (isSpare(currentPlayerRolls, frameIndex)) {
      score += 10 + spareBonus(currentPlayerRolls, frameIndex);
      const firstR = firstRoll(currentPlayerRolls, frameIndex);
      saveFrame(currentPlayerRolls, frameIndex, allScores, firstR, "/", score, 10);
      frameIndex += 2;
    } else {
      score += frameScore(currentPlayerRolls, frameIndex);
      const firstR = firstRoll(currentPlayerRolls, frameIndex);
      const secondR = secondRoll(currentPlayerRolls, frameIndex);
      const pinsRemaining = secondR !== undefined ? 10 : 10 - firstR;
      saveFrame(currentPlayerRolls, frameIndex, allScores, firstR, secondR, score, pinsRemaining);
      frameIndex += 2;
    }
  }

  return allScores;
}


export const checkWinner = (players: Player[], countingWins: (winner: string) => void) => {
  const finalScores = players.map((player) => player.frame[9]?.totalScore);
  const winningScore = Math.max.apply(Math, finalScores as number[]);

  if (winningScore) {
    const winner = players.filter((player) => player.frame[9].totalScore === winningScore);
    return countingWins(winner[0].playerName);
  }
}