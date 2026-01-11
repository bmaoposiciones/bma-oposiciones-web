
import { SubscriptionTier } from './types';

export const TOPICS = [
  // --- CONOCIMIENTOS GENERALES (BLOQUE I) ---
  { 
    id: 'L1', 
    title: 'TEMA 1: La Constitución Española de 1978', 
    category: 'LEGISLATIVO', 
    description: 'Características y estructura. Título Preliminar. Título I: Derechos y Deberes Fundamentales. Título VIII: Organización Territorial del Estado.', 
    isFree: true,
    textContent: `CONSTITUCIÓN ESPAÑOLA DE 1978

PREÁMBULO
La Nación española, deseando establecer la justicia, la libertad y la seguridad y promover el bien de cuantos la integran, en uso de su soberanía, proclama su voluntad de...

TÍTULO PRELIMINAR (Artículos 1 al 9)
Art. 1: España se constituye en un Estado social y democrático de Derecho, que propugna como valores superiores de su ordenamiento jurídico la libertad, la justicia, la igualdad y el pluralismo político. La soberanía nacional reside en el pueblo español. La forma política del Estado español es la Monarquía parlamentaria.
Art. 2: La Constitución se fundamenta en la indisoluble unidad de la Nación española, patria común e indivisible de todos los españoles...
Art. 3: El castellano es la lengua española oficial del Estado...
Art. 4: La bandera de España está formada por tres franjas horizontales, roja, amarilla y roja...
Art. 5: La capital del Estado es la villa de Madrid.

TÍTULO I. DE LOS DERECHOS Y DEBERES FUNDAMENTALES (Artículos 10 al 55)
Capítulo Primero. De los españoles y los extranjeros.
Capítulo Segundo. Derechos y libertades.
Sección 1.ª De los derechos fundamentales y de las libertades públicas (Arts 15-29).
Sección 2.ª De los derechos y deberes de los ciudadanos (Arts 30-38).
Capítulo Tercero. De los principios rectores de la política social y económica.
Capítulo Cuarto. De las garantías de las libertades y derechos fundamentales.
Capítulo Quinto. De la suspensión de los derechos y libertades.

TÍTULO VIII. DE LA ORGANIZACIÓN TERRITORIAL DEL ESTADO (Artículos 137 al 158)
Capítulo Primero. Principios generales.
Art. 137: El Estado se organiza territorialmente en municipios, en provincias y en las Comunidades Autónomas que se constituyan. Todas estas entidades gozan de autonomía para la gestión de sus respectivos intereses.
Capítulo Segundo. De la Administración Local (Municipios y Provincias).
Capítulo Tercero. De las Comunidades Autónomas.
...`
  },
  { 
    id: 'L2', 
    title: 'TEMA 2: Estatuto de Autonomía de la CV', 
    category: 'LEGISLATIVO', 
    description: 'Título I. La Comunitat Valenciana. Titulo VIII. La administración local.', 
    isFree: true 
  },
  { 
    id: 'L3', 
    title: 'TEMA 3: Ley 7/1985 de Bases del Régimen Local', 
    category: 'LEGISLATIVO', 
    description: 'Título II. El Municipio. Capítulo II. Organización. Título II. Capítulo III. Competencias. Título III La Provincia. Capítulo I. Organización. Título III. Capítulo II. Competencias.', 
    isFree: true 
  },
  { 
    id: 'L4', 
    title: 'TEMA 4: Ley 8/2010 de Régimen Local de la CV', 
    category: 'LEGISLATIVO', 
    description: 'Título I. Capítulo IV. Organización del gobierno y la administración de los municipios. Título I. Capítulo V. Competencias. Título II. La provincia.', 
    isFree: false, 
    weekIndex: 1 
  },
  { 
    id: 'L5', 
    title: 'TEMA 5: Prevención de Riesgos Laborales (Ley 31/1995)', 
    category: 'LEGISLATIVO', 
    description: 'Capítulo I. Objeto, ámbito de aplicación y definiciones. Capítulo III. Derechos y obligaciones. Capítulo IV. Servicios de Prevención. Capítulo V. Consulta y participación de los trabajadores.', 
    isFree: false, 
    weekIndex: 2 
  },
  { 
    id: 'L6', 
    title: 'TEMA 6: Estatuto Básico del Empleado Público', 
    category: 'LEGISLATIVO', 
    description: 'Real Decreto legislativo 5/2015: Título II. Clases de personal al servicio de las Administraciones Públicas. Título III. Derechos y deberes. Capítulos 1, 2 y 3. Código de Conducta. Título V Ordenación de la actividad profesional. Título VI. Situaciones administrativas.', 
    isFree: false 
  },
  { 
    id: 'L7', 
    title: 'TEMA 7: Ley 4/2021 de la Función Pública Valenciana', 
    category: 'LEGISLATIVO', 
    description: 'Título III. Personal al servicio de las administraciones públicas. Título IV. Estructura y ordenación del empleo público.', 
    isFree: false 
  },
  { 
    id: 'L8', 
    title: 'TEMA 8: Ley 53/1984 de Incompatibilidades', 
    category: 'LEGISLATIVO', 
    description: 'Ámbito de aplicación del personal al servicio de las Administraciones Públicas. La responsabilidad civil, penal y administrativa del empleado público en el ejercicio de sus funciones.', 
    isFree: false 
  },
  { 
    id: 'L9', 
    title: 'TEMA 9: Derecho Administrativo', 
    category: 'LEGISLATIVO', 
    description: 'Las fuentes del derecho administrativo. La jerarquía de las fuentes. La ley. Las disposiciones del Ejecutivo con fuerza de ley: Decreto-ley y Decreto legislativo. El reglamento: concepto, clases y límites. Otras fuentes.', 
    isFree: false 
  },
  { 
    id: 'L10', 
    title: 'TEMA 10: Hacienda Pública y Administración Tributaria', 
    category: 'LEGISLATIVO', 
    description: 'El sistema fiscal español. Principios impositivos en la Constitución Española. Los principales impuestos y sus características. La Hacienda Pública Estatal, Autonómica y Local.', 
    isFree: false 
  },
  { 
    id: 'L11', 
    title: 'TEMA 11: Informática Básica', 
    category: 'LEGISLATIVO', 
    description: 'Conceptos fundamentales de hardware y software. Sistemas de almacenamiento de datos. Sistemas Operativos. Procesadores de texto.', 
    isFree: false 
  },
  
  // --- TEMARIO ESPECÍFICO (BLOQUE II) ---
  { id: 'T1', title: 'TEMA 1: Geografía de la Comunitat Valenciana', category: 'IVASPE', description: 'Relieve, vegetación, climatología, ríos y vías de comunicación. Riesgos geográficos.', isFree: true },
  { id: 'T2', title: 'TEMA 2: Organización y funcionamiento de Bomberos CV', category: 'IVASPE', description: 'Zonas Operativas y Parques de la Comunitat Valenciana.', isFree: true },
  { id: 'T3', title: 'TEMA 3: Ley 7/2011 de Servicios SPEIS CV', category: 'IVASPE', description: 'Ley de la Generalitat de los Servicios de Prevención, Extinción de Incendios y Salvamento.', isFree: false },
  { id: 'T4', title: 'TEMA 4: Técnicas Gráficas y Cartografía', category: 'IVASPE', description: 'Sistemas de proyección, curvas de nivel, mapas topográficos y GPS.', isFree: false },
  { id: 'T5', title: 'TEMA 5: Escalas y Unidades de Medida', category: 'IVASPE', description: 'Concepto, cálculo y sistema internacional: superficie, volumen, fuerza, presión.', isFree: false },
  { id: 'T6', title: 'TEMA 6: Hidráulica Técnica', category: 'IVASPE', description: 'Hidrostática e hidrodinámica. Bombas contra-incendios, aspiraciones y cavitación.', isFree: false },
  { id: 'T7', title: 'TEMA 7: Comunicaciones y Red COMDES', category: 'IVASPE', description: 'Bandas, frecuencias y equipos TETRA. Protocolos de movilización.', isFree: false },
  { id: 'T8', title: 'TEMA 8: Vehículos de los Servicios de Bomberos', category: 'IVASPE', description: 'Clasificación, nomenclatura, dotación y conducción de emergencia.', isFree: false },
  { id: 'T9', title: 'TEMA 9: Equipamiento Operativo y Herramientas', category: 'IVASPE', description: 'Material de corte, excarcelación, elevación. Motosierras.', isFree: false },
  { id: 'T10', title: 'TEMA 10: Equipos de Protección Individual (EPI)', category: 'IVASPE', description: 'Categorización, marcado CE. Protección respiratoria y ERA.', isFree: false },
  { id: 'T11', title: 'TEMA 11: Normas Específicas en PRL', category: 'IVASPE', description: 'Seguridad y salud en equipos de trabajo y señalización (RD 1215/1997, RD 485/1997).', isFree: false },
  { id: 'T12', title: 'TEMA 12: Teoría del Fuego y la Materia', category: 'IVASPE', description: 'Química y física del incendio. Tipos de combustión y transmisión de calor.', isFree: false },
  { id: 'T13', title: 'TEMA 13: Mecanismos de Extinción y Sistemas', category: 'IVASPE', description: 'Agentes extintores. RIPCI (RD 513/2017). Hidrantes y BIEs.', isFree: false },
  { id: 'T14', title: 'TEMA 14: Incendios de Interior', category: 'IVASPE', description: 'Flashover, Backdraft, ventilación y técnicas de manejo de lanzas.', isFree: false },
  { id: 'T15', title: 'TEMA 15: Intervención en Incendios Urbanos', category: 'IVASPE', description: 'Sistemática de actuación y buceo en humo.', isFree: false },
  { id: 'T16', title: 'TEMA 16: Incendios Industriales', category: 'IVASPE', description: 'Establecimientos industriales y uso de espumas técnicas.', isFree: false },
  { id: 'T17', title: 'TEMA 17: Incendios en Túneles', category: 'IVASPE', description: 'Características específicas y técnicas de intervención en infraestructuras subterráneas.', isFree: false },
  { id: 'T18', title: 'TEMA 18: Ventilación de Incendios', category: 'IVASPE', description: 'Principios básicos y métodos de ventilación táctica.', isFree: false },
  { id: 'T19', title: 'TEMA 19: Incendio Forestal', category: 'IVASPE', description: 'Comportamiento del fuego forestal. Protocolo OCELA y medios terrestres/aéreos.', isFree: false },
  { id: 'T20', title: 'TEMA 20: Rescates en Altura', category: 'IVASPE', description: 'Cuerdas, nudos, anclajes y trauma de suspensión.', isFree: false },
  { id: 'T21', title: 'TEMA 21: Rescates en Accidentes de Tráfico', category: 'IVASPE', description: 'Excarcelación, vehículos híbridos y seguridad activa/pasiva.', isFree: false },
  { id: 'T22', title: 'TEMA 22: Otros Rescates (Agua y Animales)', category: 'IVASPE', description: 'Salvamento en riadas e intervención con animales y enjambres.', isFree: false },
  { id: 'T23', title: 'TEMA 23: Liberación en Ascensores y Maquinaria', category: 'IVASPE', description: 'Procedimientos de rescate en ascensores y escaleras mecánicas.', isFree: false },
  { id: 'T24', title: 'TEMA 24: Intervenciones Sanitarias en Emergencias', category: 'IVASPE', description: 'Soporte vital básico, triaje y RCP.', isFree: false },
  { id: 'T25', title: 'TEMA 25: Psicología de Emergencias', category: 'IVASPE', description: 'Primeros auxilios psicológicos y atención a víctimas.', isFree: false },
  { id: 'T26', title: 'TEMA 26: Edificaciones e Instalaciones', category: 'IVASPE', description: 'Esfuerzos, patologías estructurales e inspección de edificios.', isFree: false },
  { id: 'T27', title: 'TEMA 27: Código Técnico CTE-DBSI', category: 'IVASPE', description: 'Evacuación de ocupantes y resistencia al fuego.', isFree: false },
  { id: 'T28', title: 'TEMA 28: Sistemas de Detección y Extinción', category: 'IVASPE', description: 'Rociadores, detectores y columnas secas.', isFree: false },
  { id: 'T29', title: 'TEMA 29: Patología y Consolidación de Edificios', category: 'IVASPE', description: 'Apeos, apuntalamientos y rescate en estructuras colapsadas.', isFree: false },
  { id: 'T30', title: 'TEMA 30: Riesgo Eléctrico', category: 'IVASPE', description: 'Medidas de seguridad y efectos de la electricidad.', isFree: false },
  { id: 'T31', title: 'TEMA 31: Materias Peligrosas', category: 'IVASPE', description: 'Clasificación ADR, descontaminación y mitigación.', isFree: false },
  { id: 'T32', title: 'TEMA 32: Riesgo Radiológico', category: 'IVASPE', description: 'Protección radiológica y equipos de medida.', isFree: false },
  { id: 'T33', title: 'TEMA 33: Instalaciones de Gases Combustibles', category: 'IVASPE', description: 'Propiedades del gas natural y GLP. Emergencias.', isFree: false },

  // --- PROTOCOLOS ALICANTE (BASADO EN ANEXO II DECRETO 163/2019) ---
  { 
    id: 'P1', 
    title: 'TEMA 1: Callejero término municipal de Alicante', 
    category: 'ALICANTE_PROTOCOL', 
    description: 'Conocimiento exhaustivo del término municipal de Alicante.', 
    isFree: false 
  },
  { 
    id: 'P2', 
    title: 'TEMA 2: Funciones por categoría y tareas del SPEIS', 
    category: 'ALICANTE_PROTOCOL', 
    description: 'Funciones por categoría y tareas del personal operativo del SPEIS.', 
    isFree: false 
  },
  { 
    id: 'P3', 
    title: 'TEMA 3: Protocolo de movilización de recursos', 
    category: 'ALICANTE_PROTOCOL', 
    description: 'Sistemática oficial de despacho y movilización de recursos en el municipio.', 
    isFree: false 
  },
  { 
    id: 'P4', 
    title: 'TEMA 4: Plan Territorial de Emergencia de Alicante', 
    category: 'ALICANTE_PROTOCOL', 
    description: 'Estructura y operatividad del Plan Territorial de Emergencia del Municipio de Alicante.', 
    isFree: false 
  },
  { 
    id: 'P5', 
    title: 'TEMA 5: Procedimientos de actuación del SPEIS: básicos', 
    category: 'ALICANTE_PROTOCOL', 
    description: 'Protocolos básicos operativos de intervención.', 
    isFree: false 
  },
  { 
    id: 'P6', 
    title: 'TEMA 6: Procedimientos de actuación del SPEIS: incendios', 
    category: 'ALICANTE_PROTOCOL', 
    description: 'Protocolos específicos para intervenciones en incendios.', 
    isFree: false 
  },
  { 
    id: 'P7', 
    title: 'TEMA 7: Procedimientos de actuación del SPEIS: rescates', 
    category: 'ALICANTE_PROTOCOL', 
    description: 'Sistemática oficial de actuación en situaciones de rescate.', 
    isFree: false 
  },
  { 
    id: 'P8', 
    title: 'TEMA 8: Procedimientos de actuación del SPEIS: altura', 
    category: 'ALICANTE_PROTOCOL', 
    description: 'Técnicas y procedimientos de trabajo en entornos verticales.', 
    isFree: false 
  },
  { 
    id: 'P9', 
    title: 'TEMA 9: Procedimientos de actuación del SPEIS: sanitarios', 
    category: 'ALICANTE_PROTOCOL', 
    description: 'Soporte vital y asistencia sanitaria inicial en siniestros.', 
    isFree: false 
  },
  { 
    id: 'P10', 
    title: 'TEMA 10: Plan de actuación frente a inundaciones', 
    category: 'ALICANTE_PROTOCOL', 
    description: 'Plan de actuación municipal frente al riesgo de inundaciones. Estructura y operatividad.', 
    isFree: false 
  },
  { 
    id: 'P11', 
    title: 'TEMA 11: Plan de actuación frente a riesgo sísmico', 
    category: 'ALICANTE_PROTOCOL', 
    description: 'Plan de actuación municipal frente al riesgo sísmico. Estructura y operatividad.', 
    isFree: false 
  },
];

export const PRICING_PLANS = [
  {
    tier: SubscriptionTier.FREE,
    name: 'Plan Gratuito',
    price: '0€',
    description: 'Prueba la plataforma.',
    features: ['3 Temas Legislación', '2 Temas Específicos', '1 Test por tema', 'Acceso limitado']
  },
  {
    tier: SubscriptionTier.BASIC,
    name: 'Mensual Basic',
    price: '49€/mes',
    description: 'Opositor autodidacta.',
    features: ['Temario progresivo', 'Tests ilimitados', 'Sin Simulacros', 'Sin Protocolos']
  },
  {
    tier: SubscriptionTier.PROTOCOLOS,
    name: 'Pack Protocolos',
    price: '285€/anual',
    description: 'Especialización anual.',
    features: ['11 Protocolos GVA', 'Tema explicativo', 'Tests ilimitados', 'Visualización total']
  },
  {
    tier: SubscriptionTier.BASIC_PROTOCOLOS,
    name: 'BASIC + PROTOCOLOS',
    price: '70€/mes',
    description: 'Formación guiada.',
    features: ['4 Temas Específicos/mes', '1 Protocolo/mes', 'Tests obligatorios', 'Formación completa 12m']
  },
  {
    tier: SubscriptionTier.PREMIUM,
    name: 'Premium Total',
    price: '700€/Anual',
    description: 'Opción más profesional.',
    features: ['TODO desbloqueado día 1', 'Sin bloqueos progresivos', 'Simulacros completos', 'Pago Único'],
    highlight: true
  }
];
