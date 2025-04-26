import { createProject } from "../services/project.service.js";

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