
import React from 'react';
import { ProjectCategory } from '../types';

interface QuickGuideProps {
  category: ProjectCategory;
}

const QuickGuide: React.FC<QuickGuideProps> = ({ category }) => {
  const guides: Record<string, string[]> = {
    gcp: [
      "Inicia sesión en Google Cloud Console con la CUENTA ANTIGUA.",
      "Ve a IAM y Administración > IAM.",
      "Haz clic en 'Añadir' e introduce el email de tu CUENTA NUEVA.",
      "Asigna el rol de 'Propietario' a la cuenta nueva.",
      "Acepta la invitación en el correo de la cuenta nueva.",
      "Opcional: Elimina el acceso de la cuenta antigua desde la nueva."
    ],
    firebase: [
      "Entra en Firebase Console con la CUENTA ANTIGUA.",
      "Selecciona tu proyecto.",
      "Ve a 'Usuarios y permisos' en la configuración del proyecto.",
      "Haz clic en 'Añadir miembro' y añade tu CUENTA NUEVA con rol 'Propietario'.",
      "Confirma desde el email de la cuenta nueva.",
      "A partir de ahora podrás ver el proyecto en ambas consolas."
    ],
    drive: [
      "Abre el archivo/carpeta en la CUENTA ANTIGUA.",
      "Haz clic en 'Compartir' y añade tu CUENTA NUEVA.",
      "Una vez compartido, vuelve a 'Compartir'.",
      "Cambia el permiso de la cuenta nueva a 'Transferir propiedad' (solo en web).",
      "La cuenta nueva recibirá la propiedad total."
    ],
    apps_script: [
      "Abre el editor de Apps Script con la CUENTA ANTIGUA.",
      "Copia el código o utiliza la función 'Compartir' de Google Drive.",
      "Si está vinculado a un documento, transfiere la propiedad del documento.",
      "Para scripts independientes, compártelo y crea una copia con la cuenta nueva."
    ],
    general: [
      "La mayoría de servicios de Google funcionan añadiendo administradores.",
      "Busca siempre la sección 'Configuración', 'Permisos' o 'Acceso'.",
      "Asegúrate de que la cuenta nueva tenga el rol más alto (Owner/Admin).",
      "Verifica la facturación si el proyecto consume recursos de pago."
    ]
  };

  const steps = guides[category.id] || guides.general;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-lg bg-${category.color}-50 text-2xl`}>
          {category.icon}
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-lg">Guía: {category.name}</h3>
          <p className="text-gray-500 text-sm">Pasos críticos para la transferencia</p>
        </div>
      </div>

      <div className="space-y-4">
        {steps.map((step, idx) => (
          <div key={idx} className="flex gap-4 group">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">
                {idx + 1}
              </div>
              {idx !== steps.length - 1 && (
                <div className="w-px h-full bg-gray-100 mt-1"></div>
              )}
            </div>
            <p className="text-sm text-gray-600 leading-relaxed pt-1 group-hover:text-gray-900 transition-colors">
              {step}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-100 flex gap-3">
        <span className="text-amber-600">⚠️</span>
        <p className="text-xs text-amber-800 font-medium">
          Importante: Algunos recursos pueden tardar hasta 24 horas en reflejar los cambios de propiedad completamente.
        </p>
      </div>
    </div>
  );
};

export default QuickGuide;
