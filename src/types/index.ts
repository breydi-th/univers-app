export type Role = 'student' | 'teacher' | 'admin';

export interface School {
  id: string;
  name: string;
  domain: string;
  logo_url: string;
  primary_color: string;
  secondary_color: string;
}

export interface User {
  id: string;
  school_id: string;
  role: Role;
  login_id?: string;
  email?: string;
  password?: string;
  name: string;
  class_id?: string;
}

export interface Class {
  id: string;
  school_id: string;
  name: string;
  level: string;
}

export interface Course {
  id: string;
  school_id: string;
  class_id: string;
  teacher_id: string;
  title: string;
  description: string;
  video_url: string;
  created_at: string;
}

export interface Assignment {
  id: string;
  school_id: string;
  class_id: string;
  teacher_id: string;
  title: string;
  description: string;
  due_date: string;
}

export interface Submission {
  id: string;
  assignment_id: string;
  student_id: string;
  content: string;
  submitted_at: string;
  grade?: number;
}
