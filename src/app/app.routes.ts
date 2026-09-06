import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'students',
    loadComponent: () => import('./students/students').then((m) => m.Students),
  },
  {
    path: 'teachers',
    loadComponent: () => import('./management/management').then((m) => m.Management),
    data: {
      title: 'Teachers',
      icon: '👨‍🏫',
      description: 'Manage teaching staff and contact details.',
    },
  },
  {
    path: 'classes',
    loadComponent: () => import('./management/management').then((m) => m.Management),
    data: {
      title: 'Classes',
      icon: '🏫',
      description: 'Organize classes and assigned homeroom teachers.',
    },
  },
  {
    path: 'subjects',
    loadComponent: () => import('./management/management').then((m) => m.Management),
    data: {
      title: 'Subjects',
      icon: '📚',
      description: 'Manage the subjects taught at your school.',
    },
  },
  {
    path: 'attendance',
    loadComponent: () => import('./management/management').then((m) => m.Management),
    data: {
      title: 'Attendance',
      icon: '📅',
      description: 'Review daily attendance and absence records.',
    },
  },
  {
    path: 'exams',
    loadComponent: () => import('./management/management').then((m) => m.Management),
    data: {
      title: 'Exams',
      icon: '📝',
      description: 'Plan examinations and track student results.',
    },
  },
  {
    path: 'fees',
    loadComponent: () => import('./management/management').then((m) => m.Management),
    data: { title: 'Fees', icon: '💰', description: 'Track payments and outstanding school fees.' },
  },
  {
    path: 'settings',
    loadComponent: () => import('./management/management').then((m) => m.Management),
    data: {
      title: 'Settings',
      icon: '⚙️',
      description: 'Configure your school management system.',
    },
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
