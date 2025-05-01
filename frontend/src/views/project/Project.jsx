import React from "react";
import { useParams } from "react-router-dom";

const Project = () => {
  const params = useParams();

  return (
    <main>
        <section>
            <div className="chat"></div>
            <div className="code"></div>
            <div className="review"></div>
        </section>
    </main>
  )
};

export default Project;
