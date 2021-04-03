import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap"
import { GameHeader } from "../Components/GameHeader"
import { PlayerForm } from "../Components/PlayerForm"
import { ScoreControl } from "../Components/ScoreControl"
import { checkWinner, Frame, pinsRemaining, Player, score } from "../Helpers/Helpers";
import { Scoreboard } from '../Components/Scoreboard';

interface GameState {
  players: Player[],
  currentPlayerIndex: number;
  rolls: number[][];
  gameOver: boolean
}

const initialState = {
  players: [],
  currentPlayerIndex: 0,
  rolls: [],
  gameOver: false,
};

export const Game = () => {
  // State
  const [gameState, setGameState] = useState<GameState>(initialState)
  const [winner, setWinner] = useState("");

  useEffect(() => {
    if (gameState.gameOver) {
      checkWinner(gameState.players, winner => setWinner(winner));
    }

  }, [gameState.gameOver, gameState.players])

  // Handlers

  const resetGame = () => {
    setGameState(initialState);
    setWinner("");
  }

  // handle storing score in game state (better solution Redux?)
  const saveScore = (playerId: string, frame: Frame[], currentPlayerId: number, isLastFrame: boolean) => {
    const playrs = [...gameState.players];
    const player = playrs.find(y => y.id === playerId);
    if (player) {
      player.frame = frame;
      player.currentFrameIndex++
    }

    let nextPlayerId = currentPlayerId

    // last frame. logic to give player extras rolls
    const extraRolls = frame[9].leftBox === "X" || frame[9].rightBox === "/";
    if (pinsRemaining(score(gameState.rolls, currentPlayerId)) === 10 && !(isLastFrame && !frame[9].extraBox && extraRolls)) {
      if (currentPlayerId < gameState.players.length - 1) {
        nextPlayerId = currentPlayerId + 1;
      } else {
        nextPlayerId = 0
      }
    }

    setGameState(
      {
        ...gameState,
        players: playrs,
        currentPlayerIndex: nextPlayerId,
        gameOver: isLastFrame && playrs.every(player => {
          if (extraRolls) {
            return !!player.frame[9].leftBox && !!player.frame[9].rightBox && !!player.frame[9].extraBox
          }
          return !!player.frame[9].leftBox && !!player.frame[9].rightBox
        })
      }
    )
  }

  // Add players to the games
  const addPlayer = (playerName: string) => {
    const player: Player = {
      id: uuidv4(),
      playerName: playerName,
      frame: [],
      currentFrameIndex: 0,
      winningTimes: 0
    }

    setGameState({
      ...gameState,
      players: [...gameState.players, player],
      rolls: [...gameState.rolls, []]
    })
  }
  return (
    <Container fluid>
      <Row>
        <Col>
          {gameState.gameOver && <h1>{"Winner: " + winner}</h1>}
          <Row>
            <Col sm={12}>

              <div style={{ display: "flex" }}>
                <GameHeader
                  playersIndex={gameState.currentPlayerIndex}
                  rolls={gameState.rolls}
                  playerName={gameState.players[gameState.currentPlayerIndex]?.playerName}
                  gameOver={gameState.gameOver}
                  resetGame={resetGame}
                />
              </div>

              <ScoreControl
                players={gameState.players}
                currentPlayerIndex={gameState.currentPlayerIndex}
                rolls={gameState.rolls}
                saveScore={saveScore}
                gameOver={gameState.gameOver} />
            </Col>
          </Row>

          <Row>
            <Col sm={12}>
              <Scoreboard players={gameState.players} />
            </Col>
          </Row>

          <Row>
            <Col sm={12}>
              <PlayerForm rolls={gameState.rolls} AddPlayer={addPlayer} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}