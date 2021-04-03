import { useState } from "react"
import { Button, Form, } from "react-bootstrap"

export const PlayerForm = (props: { rolls: number[][]; AddPlayer: (playerName: string) => void }) => {
  const [player, setPlayer] = useState({ playerName: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer({ playerName: e.currentTarget.value })
  }

  return (
    <Form hidden={props.rolls[0]?.length > 0} onSubmit={(e) => {
      e.preventDefault();
      props.AddPlayer(player.playerName)
      setPlayer({ playerName: "" })
    }}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Enter new player"
          name="playerName"
          value={player.playerName}
          onChange={handleChange}
          style={{ width: "40%" }}
        />
      </Form.Group>

      <Button variant="dark" type="submit">Add Player</Button>
    </Form>
  );
}