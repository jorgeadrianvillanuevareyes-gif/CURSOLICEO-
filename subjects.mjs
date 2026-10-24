export const HISTORY='Historia de México e Historia Universal';
export const SUBJECTS=[HISTORY,'Matemáticas','Español','Física','Química','Biología','Geografía','Habilidad verbal','Habilidad matemática','General'];
export function normalizeSubject(subject=''){const value=subject.normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase();return ['historia','historia de mexico','historia universal','historia de mexico e historia universal','historia de mexico y universal'].includes(value)?HISTORY:subject;}
