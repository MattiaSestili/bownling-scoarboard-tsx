import { faRedo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Col, Form } from "react-bootstrap"
import { pinsRemaining, score } from "../Helpers/Helpers"

export const GameHeader = (props: {
  playerName: string;
  playersIndex: number;
  rolls: number[][];
  gameOver: boolean;
  resetGame: () => void
}) => {
  const restartGame = () => {
    props.resetGame();
  }

  if (props.gameOver) {
    return null;
  }

  return (
    <>
      <Col>
        <Form.Group>
          <Button variant="dark" onClick={restartGame}>
            <FontAwesomeIcon icon={faRedo} />
          </Button>
        </Form.Group>
      </Col>

      <Col>
        <h4>{`Current Players: ${props.playerName ?? ""}`}</h4>
      </Col>

      <Col>
        <h4>{`Remaining pins: ${pinsRemaining(score(props.rolls, props.playersIndex))}`}</h4>
      </Col>
    </>
  )
}