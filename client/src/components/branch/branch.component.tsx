import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ArrowIcon from '../../icons/arrow-right.svg'
import ObjectIcon from '../../icons/object.svg'
import { RegionsResponseObj } from '../../types'
import './branch.css'

export const getBranches = (branches: RegionsResponseObj[], nestingIndex: number): ReturnType<typeof Branch>[] => {
  const parentBranchesIdxs = Array.of(...new Set(branches.map((branch) => branch.path.split('.')[nestingIndex])))

  return parentBranchesIdxs.map((parentIdx) => {
    const parentBranch = branches.find(
      (branch) => branch.path.split('.')[nestingIndex] === parentIdx && !branch.path.split('.')[nestingIndex + 1]
    )!
    const branchChildren = branches.filter(
      (branch) => branch.path.split('.')[nestingIndex] === parentIdx && branch.path.split('.')[nestingIndex + 1]
    )
    return (
      <Branch
        key={parentBranch?.id || uuidv4()}
        name={parentBranch?.name || 'node_is_missing'}
        children={branchChildren}
        nestingIndex={nestingIndex + 1}
      />
    )
  })
}

const Branch: React.FC<{
  name: string
  children: RegionsResponseObj[]
  nestingIndex: number
}> = ({ name, children, nestingIndex }) => {
  const [isExposed, setIsExposed] = useState(true)

  const handleExpose = () => {
    setIsExposed(!isExposed)
  }
  return (
    <div className="branch">
      <div className="branch-heading" onClick={handleExpose}>
        <div className={`branch-heading-icon ${isExposed ? 'exposed' : ''}`}>
          <ArrowIcon />
        </div>
        <div className="branch-heading-icon">
          <ObjectIcon />
        </div>
        <p>{name}</p>
      </div>
      {children.length && isExposed ? (
        <div className="branch-children">{getBranches(children, nestingIndex)}</div>
      ) : null}
    </div>
  )
}

export default Branch
