import React from 'react'
import { RegionsResponseObj } from '../../types'
import { getBranches } from '../branch/branch.component'

const Tree: React.FC<{ branches: RegionsResponseObj[] }> = ({ branches }) => {
  const nestingIndex: number = 0

  return <div className="tree">{getBranches(branches, nestingIndex)}</div>
}

export default Tree
