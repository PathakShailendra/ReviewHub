import React, { useEffect, useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  function navigateToProject(projectId, projectName) {
    navigate(`/project/${projectId}`, { state: { name: projectName } });
  }

  useEffect(() => {
    axios.get("http://localhost:3000/projects/get-all").then((response) => {
      setProjects(response.data.data);
    });
  }, []);

  return (
    <main className="home">
      <section className="home-section">
        <div className="header">
          <h1>Your Projects</h1>
          <button className="new-project-btn" onClick={() => navigate("/create-project")}>
            <span>+</span> New Project
          </button>
        </div>
        
        <div className="projects-container">
          {projects.length === 0 ? (
            <div className="empty-state">
              <p>No Projects Created</p>
            </div>
          ) : (
            <div className="projects">
              {projects.map((project, index) => {
                return (
                  <div
                    onClick={() => {
                      navigateToProject(project._id, project.name);
                    }}
                    key={index}
                    className="project"
                  >
                    <div className="project-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                    </div>
                    <h2>{project.name}</h2>
                    <div className="project-view">View Project</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;