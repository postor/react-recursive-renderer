import { FC } from "react"
import Container, { RecursiveProps } from "../lib"

const Ul: FC<RecursiveProps> = ({ getChildrenNodes, val, i, depth }) => {
  let childNodes = getChildrenNodes()
  if (!childNodes.length) return <button
    onClick={() => console.log({ val, depth, i })}
  >{val}</button>
  return <><button style={{ color: 'red' }} onClick={() =>
    console.log({ val, depth, i })}  >{val}</button>
    <ul>{childNodes.map((x, i) => <li key={i}>{x}</li>)}</ul></>
}

const Index = () => {
  return (<Container
    Component={Ul}
    getChildrenProps={({ val }) => {
      return new Array(3).fill(0).map((x, i) => ({
        val: val * 10 + i + 1
      }))
    }}
    depthLimit={3}
    rootProps={{ val: 1 }} />)
}

export default Index