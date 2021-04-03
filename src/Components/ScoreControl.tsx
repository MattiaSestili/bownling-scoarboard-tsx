import { Button } from "react-bootstrap";
import { Frame, pinsRemaining, Player, roll, score } from "../Helpers/Helpers"

interface ScoreControlProps {
  rolls: number[][];
  currentPlayerIndex: number;
  players: Player[];
  saveScore: (playerId: string, score: Frame[], currentPlayerId: number, isLastFrame: boolean) => void;
  gameOver: boolean;
}

export const ScoreControl = (props: ScoreControlProps) => {
  const frames = pinsRemaining(score(props.rolls, props.currentPlayerIndex)) + 1;
  const controls: JSX.Element[] = [];

  if (props.rolls.length > 0 && !props.gameOver) {
    for (let i = 0; i < frames; i++) {
      controls.push(<Button
        key={i}
        className="roll"
        variant="dark"
        onClick={() =>
          roll(
            i,
            props.rolls,
            props.currentPlayerIndex,
            props.players,
            props.saveScore
          )
        }
      >
        {i}
      </Button>);
    }
  }

  return <div>{controls}</div>
}