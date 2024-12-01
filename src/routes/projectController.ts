import { Request, Response } from 'express';
import { db } from '../services/db.service';
import { Project } from '../models/model';

// CREATE a new project
export const createProject = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const database = await db();
  try {
    const result = await database.run(
      'INSERT INTO projects (name, description) VALUES (?, ?)',
      [name, description]
    );
    res.status(201).json({ id: result.lastID, name, description });
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error });
  }
};

// READ all projects
export const getProjects = async (req: Request, res: Response) => {
  const database = await db();
  try {
    const projects = await database.all<Project[]>('SELECT * FROM projects');
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
};

// READ a single project by ID
export const getProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const database = await db();
  try {
    const project = await database.get<Project>('SELECT * FROM projects WHERE id = ?', [id]);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error });
  }
};

// UPDATE a project by ID
export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const database = await db();
  try {
    const result = await database.run(
      'UPDATE projects SET name = ?, description = ? WHERE id = ?',
      [name, description, id]
    );
    if (result.changes === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error });
  }
};

// DELETE a project by ID
export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const database = await db();
  try {
    const result = await database.run('DELETE FROM projects WHERE id = ?', [id]);
    if (result.changes === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error });
  }
};
