import { Player } from "../Helpers/Helpers"
import { Frame } from "./Frame"

export const Scoreboard = (props: { players: Player[] }) => {
  const players = props.players

  return (
    <div className="player-board">
      {players.length > 0 &&
        players.map((player) => (
          <div className="score-board" key={player.id}>
            <div className="frame-name" key={player.id}>
              <div className="player-name">{player.playerName}</div>
              <div className="player-name">{player.winningTimes}</div>
            </div>

            {Array.from(Array(10).keys()).map((i) =>
              <Frame
                key={i}
                frameNumber={i + 1}
                leftBox={player.frame[i]?.leftBox}
                rightBox={player.frame[i]?.rightBox}
                extraBox={player.frame[i]?.extraBox}
                score={player.frame[i]?.totalScore}
              />
            )}
          </div>
        ))
      }
    </div>
  )
}