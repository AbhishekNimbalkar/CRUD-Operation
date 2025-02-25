import React, { useEffect } from 'react'
import { getPost } from './api/Postapi'
import Posts from './components/Posts'

const App = () => {

  
  return (
    <div className='px-10 py-5'>
      <Posts/>
    </div>
  )
}

export default App
