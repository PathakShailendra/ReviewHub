import React from 'react'
import './home.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();

  return (
    <main className='home'>
      <section className='home-section'>
        <button onClick={() => navigate('/create-project')}>Create Project</button>
      </section>
    </main>
  )
}

export default Home