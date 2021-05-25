import { FC, useState } from "react"
import Container from "../lib"
import { RecursiveProps } from "../lib/Container"

const Box: FC<RecursiveProps> = ({ getChildrenNodes, width, depth }) => <div
  style={{
    width: width, height: width, position: 'absolute',
    bottom: `-1px`, right: `-1px`, boxSizing: 'border-box',
    border: `1px solid hsl(${depth * 15 % 256},100%, 50%)`
  }}
>{getChildrenNodes()}</div>


const Index = () => {
  let [width, setWidth] = useState(200)
  let [min, setMin] = useState(5)
  let [percent, setPercent] = useState(0.9)
  return (<>
    <p>
      <input type="range" value={width} min={1} max={800}
        onChange={e => setWidth(parseInt(e.target.value))} />
      <label>width(px)</label>
    </p>
    <p>
      <input type="range" value={min} min={1} max={width - 1}
        onChange={e => setMin(parseInt(e.target.value))} />
      <label>min (px)</label>
    </p>
    <p>
      <input type="range" value={percent * 100} min={5} max={99}
        onChange={e => setPercent(parseInt(e.target.value) / 100)} />
      <label>percent</label>
    </p>
    <div
      style={{ width: width, height: width, position: 'relative' }}
    >
      <Container
        Component={Box}
        getChildrenProps={({ width = 0 }) => {
          let v1 = width * percent
          if (v1 < min) return []
          return [{ width: v1 }]
        }}
        depthLimit={-1}
        rootProps={{ width }} />

    </div>
  </>)
}

export default Index