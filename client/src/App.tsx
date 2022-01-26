import React, { useEffect, useState } from 'react'

import { RegionsResponseObj } from './types'
// import { startMirage } from './server-mock'
import Tree from './components/tree/tree.component'

if (process.env.NODE_ENV === 'development') {
  // startMirage()
}

function App() {
  const [regions, setRegions] = useState<RegionsResponseObj[]>([])

  useEffect(() => {
    fetch('http://192.168.99.100:8080/api/regions')
      .then((res) => res.json())
      .then((data) => {
        setRegions(data)
      })
  }, [])

  return <div className="App">{regions.length ? <Tree branches={regions} /> : <h2>Loading...</h2>}</div>
}

export default App
