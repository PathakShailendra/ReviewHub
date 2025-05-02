import React, { useEffect, useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  function navigateToProject(projectId) {
    navigate(`/project/${projectId}`);
  }

  useEffect(() => {
    axios.get("http://localhost:3000/projects/get-all").then((response) => {
      setProjects(response.data.data);
    });
  }, []);

  return (
    <main className="home">
      <section className="home-section">
        <button onClick={() => navigate("/create-project")}>
          Create Project
        </button>

        {projects.length === 0 ? (
          <div>
            <p>No Projects Created</p>
          </div>
        ) : (
          <div className="projects">
            {projects.map((project, index) => {
              return (
                <div
                  onClick={() => {
                    navigateToProject(project._id);
                  }}
                  key={index}
                  className="project"
                >
                  <h2>{project.name}</h2>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
