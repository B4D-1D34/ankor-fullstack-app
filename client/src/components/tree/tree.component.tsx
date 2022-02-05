import React from 'react'
import { RegionsResponseObj, RegionsResponseObjModified } from '../../types'
import { getBranches } from '../branch/branch.component'

const Tree: React.FC<{ branches: RegionsResponseObj[] }> = ({ branches }) => {
  const nestingIndex: number = 0
  const branchesModified: RegionsResponseObjModified[] = branches.map((branch) => ({
    ...branch,
    path: branch.path.split('.'),
  }))

  return <div className="tree">{getBranches(branchesModified, nestingIndex)}</div>
}

export default Tree
