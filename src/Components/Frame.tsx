export const Frame = (props: {
  frameNumber: number | string,
  leftBox: number | string,
  rightBox: number | string,
  extraBox: number | string,
  score: number | string,
}) => {
  return (
    <div className="frame">
      <div className="frame-number">{props.frameNumber}</div>
      <div className="frame-score">
        <div className="box left">{props.leftBox || null}</div>
        <div className="box right">{props.rightBox || null}</div>
        <div className="box extra">{props.extraBox}</div>
      </div>
      <div className="score-update">{!isNaN(props.score as number) && props.score}</div>
    </div>
  )
}