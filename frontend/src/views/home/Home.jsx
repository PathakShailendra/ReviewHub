import React from 'react'
import './home.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();

  return (
    <main className='home'>
      <section className='home-section'>
        <button onClick={() => navigate('/create-project')}>Create Project</button>

        <div className='projects'>
          <div className='project'>
            <h2>Project 1</h2>
            <p>Description of project 1</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home