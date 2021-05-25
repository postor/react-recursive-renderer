import { FC, ReactElement } from 'react'

export interface RecursiveProps {
  [key: string]: any,
  getChildrenNodes?: () => ReactElement[],
  depth?: number,
  i?: number
}

interface Props {
  Component: FC<RecursiveProps> | any,
  getChildrenProps: (props?: any) => any[],
  rootProps?: any
  depthLimit: number,
  getKey?: (props?: any, i?: number) => any,
}

export const Container: FC<Props> = ({
  Component,
  getChildrenProps,
  rootProps,
  depthLimit = 10,
  getKey = (props, i) => i
}) => {
  let getChildNodes = (props, depth = depthLimit) => {
    if (depthLimit >= 0 && depth >= depthLimit) return []
    return getChildrenProps(props).map((x, i) => <Component
      key={getKey(x, i)} {...x} i={i} depth={depth + 1}
      getChildrenNodes={() => getChildNodes(x, depth + 1)} />)
  }
  return <Component {...rootProps} depth={0} i={0}
    getChildrenNodes={() => getChildNodes(rootProps, 0)} />
}