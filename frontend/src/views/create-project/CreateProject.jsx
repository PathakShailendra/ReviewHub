import React, { useState } from 'react'
import './createproject.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateProject = () => {
  const [projectName, setProjectName] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3000/projects/create', {
      projectName: projectName
    }).then(() => {
      navigate('/')
    })
  }

  return (
    <main className="create-project">
      <div className="create-project-container">
        <section className="create-project-section">
          <div className="create-project-header">
            <h1>Create New Project</h1>
            <p>Enter a name for your new project to get started</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="projectName">Project Name</label>
              <input 
                type="text" 
                id="projectName"
                name="projectName" 
                placeholder="Enter project name..." 
                required
                onChange={(e) => setProjectName(e.target.value)} 
                value={projectName || ''} 
              />
            </div>
            
            <div className="button-group">
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => navigate('/')}
              >
                Cancel
              </button>
              <button type="submit" className="submit-button">
                Create Project
              </button>
            </div>
          </form>
          
          <div className="create-project-footer">
            <div className="project-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default CreateProject