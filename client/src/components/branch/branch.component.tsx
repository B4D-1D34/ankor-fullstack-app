import React, { useState } from 'react'
import ArrowIcon from '../../icons/arrow-right.svg'
import ObjectIcon from '../../icons/object.svg'
import { RegionsResponseObjModified } from '../../types'
import './branch.css'

export const getBranches = (
  branches: RegionsResponseObjModified[],
  nestingIndex: number
): ReturnType<typeof Branch>[] => {
  //деление всех полученных веток на родительские и дочерние
  const { parentBranches, childBranches } = branches.reduce(
    (
      acc: {
        parentBranches: RegionsResponseObjModified[]
        childBranches: { [refBranch: string]: RegionsResponseObjModified[] }
      },
      branch
    ) =>
      branch.path.length === nestingIndex + 1
        ? { ...acc, parentBranches: [...acc.parentBranches, branch] }
        : {
            ...acc,
            childBranches: {
              ...acc.childBranches,
              [branch.path[nestingIndex]]: [...(acc.childBranches[branch.path[nestingIndex]] || []), branch],
            },
          },
    { parentBranches: [], childBranches: {} }
  )

  //создание копии объекта дочерних веток для проверки edge case при котором у веток не хватает родителей
  const missingChildBranches = Object.assign<{}, { [string: string]: any }>({}, childBranches)

  //вычеркивание из копии веток имеющих родителей
  parentBranches.forEach((branch) =>
    missingChildBranches[branch.path[nestingIndex]] ? (missingChildBranches[branch.path[nestingIndex]] = null) : true
  )

  const missingChildBranchesKeys = Object.keys(missingChildBranches)

  //если ветки без родителей остались условие выполняется
  if (missingChildBranchesKeys.some((key) => missingChildBranches[key])) {
    //инициализация массива вне цикла, чтобы не получить О(n^2)
    const path = Array(nestingIndex + 1)

    //создание недостающих родителей-заглушек, чтобы ветки-сироты тоже отобразились
    missingChildBranchesKeys.forEach((key) => {
      if (missingChildBranches[key]) {
        path[nestingIndex] = key
        parentBranches.push({
          path: path,
          id: `${nestingIndex}_${missingChildBranches[key][0].path}`,
          name: 'node_is_missing',
        })
      }
    })
  }

  return parentBranches.map((branch) => (
    <Branch
      key={branch.id}
      name={branch.name}
      children={childBranches[branch.path[nestingIndex]] || []}
      nestingIndex={nestingIndex + 1}
    />
  ))
}

const Branch: React.FC<{
  name: string
  children: RegionsResponseObjModified[]
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
