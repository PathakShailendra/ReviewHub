import React from 'react'
import './createproject.css'

const CreateProject = () => {
  return (
    <main className="create-project">
      <section className="create-project-section">
        <form>
          <input type="text" name='projectName' placeholder='Project Name' required />
          <input type="submit" />
        </form>
      </section>
    </main>
  )
}

export default CreateProject