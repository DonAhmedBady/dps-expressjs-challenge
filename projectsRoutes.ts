import { Router } from 'express';

import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from './projectController';

const router = Router();

router.post('/projects', createProject); 
router.get('/projects', getProjects); 
router.get('/projects/:id', getProjectById); 
router.put('/projects/:id', updateProject); 
router.delete('/projects/:id', deleteProject); 


// Additional routes for update/delete
export default router;
