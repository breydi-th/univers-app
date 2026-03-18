import { School, User, Class, Course, Assignment, Submission } from '../types';

export const mockSchools: School[] = [
  {
    id: 's1',
    name: 'Univers School',
    domain: 'univers',
    logo_url: 'https://api.dicebear.com/7.x/initials/svg?seed=US&backgroundColor=3b82f6',
    primary_color: '#3b82f6',
    secondary_color: '#1d4ed8',
  },
  {
    id: 's2',
    name: 'Horizon College',
    domain: 'horizon',
    logo_url: 'https://api.dicebear.com/7.x/initials/svg?seed=HC&backgroundColor=10b981',
    primary_color: '#10b981',
    secondary_color: '#047857',
  },
];

export const mockClasses: Class[] = [
  { id: 'c1', school_id: 's1', name: '7ème A', level: '7eme année' },
  { id: 'c2', school_id: 's1', name: 'NS1 B', level: 'NS1' },
  { id: 'c3', school_id: 's2', name: '8ème C', level: '8eme année' },
];

export const mockUsers: User[] = [
  // Univers School Users
  { id: 'u1', school_id: 's1', role: 'student', login_id: 'eleve1', password: 'password', name: 'Jean Dupont', class_id: 'c1' },
  { id: 'u2', school_id: 's1', role: 'teacher', login_id: 'prof1', password: 'password', name: 'Marie Curie' },
  { id: 'u3', school_id: 's1', role: 'admin', email: 'admin@univers.com', password: 'password', name: 'Direction Univers' },
  // Horizon College Users
  { id: 'u4', school_id: 's2', role: 'student', login_id: 'eleve2', password: 'password', name: 'Alice Martin', class_id: 'c3' },
  { id: 'u5', school_id: 's2', role: 'teacher', login_id: 'prof2', password: 'password', name: 'Albert Einstein' },
  { id: 'u6', school_id: 's2', role: 'admin', email: 'admin@horizon.com', password: 'password', name: 'Direction Horizon' },
];

export const mockCourses: Course[] = [
  {
    id: 'course1',
    school_id: 's1',
    class_id: 'c1',
    teacher_id: 'u2',
    title: 'Introduction aux Mathématiques',
    description: 'Les bases de l\'algèbre et de la géométrie.',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    created_at: new Date().toISOString(),
  },
];

export const mockAssignments: Assignment[] = [
  {
    id: 'a1',
    school_id: 's1',
    class_id: 'c1',
    teacher_id: 'u2',
    title: 'Devoir de Mathématiques 1',
    description: 'Résoudre les équations de la page 42.',
    due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockSubmissions: Submission[] = [];
