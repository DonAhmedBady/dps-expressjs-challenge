export interface Project {
    id: number;
    name: string;
    description?: string;
  }
  
export interface Report {
    id: number;
    projectid: number;
    text: string;
  }
  