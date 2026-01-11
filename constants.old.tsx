
import React from 'react';
import { ProjectCategory } from './types';

export const CATEGORIES: ProjectCategory[] = [
  { id: 'gcp', name: 'Google Cloud Platform', icon: '☁️', color: 'blue' },
  { id: 'firebase', name: 'Firebase', icon: '🔥', color: 'orange' },
  { id: 'drive', name: 'Google Drive / Docs', icon: '📁', color: 'green' },
  { id: 'apps_script', name: 'Apps Script', icon: '📜', color: 'indigo' },
  { id: 'general', name: 'Otros Proyectos', icon: '🔧', color: 'gray' },
];

export const SYSTEM_PROMPT = `Actúa como un experto sénior en infraestructura de Google. 
Tu misión es ayudar al usuario a transferir o importar proyectos desde una cuenta de Google a otra.
Dependiendo del tipo de proyecto (GCP, Firebase, Drive), los pasos varían.
- Para GCP: Explica cómo añadir la nueva cuenta como Propietario (IAM) y luego eliminar la antigua si es necesario.
- Para Firebase: Similar a GCP, pero menciona la consola de Firebase.
- Para Drive: Explica cómo compartir y luego transferir la propiedad.
Responde siempre en español de forma profesional y clara.`;
