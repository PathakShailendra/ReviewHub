import { createProject, getAllProjects } from "../services/project.service.js";

export async function createProjectController(req, res) {
    try {
        const { projectName } = req.body;
        const project = await createProject(projectName);
        return res.status(201).json({ 
            status : "success",
            data : project,
         });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function getAllProjectsController(req, res) {
    const projects = await getAllProjects();

    return res.status(200).json({
        status: "success",
        data: projects,
    });
}