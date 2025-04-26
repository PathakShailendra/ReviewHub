import React, { useState } from 'react'
import './createproject.css'
import axios from 'axios'

const CreateProject = () => {
  const [projectName, setProjectName] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3000/projects/create')
  }


  return (
    <main className="create-project">
      <section className="create-project-section">
        <form onSubmit={handleSubmit}>
          <input type="text" name='projectName' placeholder='Project Name' required
            onChange={(e) => setProjectName(e.target.value)} 
            value={projectName} 
          />
          <input type="submit" />
        </form>
      </section>
    </main>
  )
}

export default CreateProject