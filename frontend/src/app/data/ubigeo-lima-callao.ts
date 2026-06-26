// Datos de referencia para la cascada Departamento -> Distrito en el formulario
// de distritos. Incluye Lima (provincia de Lima) y la Provincia Constitucional
// del Callao completos. Cada distrito trae su zona y su codigo ubigeo (INEI)
// para autocompletar el formulario al seleccionarlo.

export interface DistritoInfo {
  nombre: string;
  zona: string;
  ubigeo: string;
}

export interface DepartamentoInfo {
  nombre: string;
  distritos: DistritoInfo[];
}

export const DEPARTAMENTOS: DepartamentoInfo[] = [
  {
    nombre: 'Lima',
    distritos: [
      { nombre: 'Lima (Cercado)', zona: 'Lima Centro', ubigeo: '150101' },
      { nombre: 'Ancón', zona: 'Lima Norte', ubigeo: '150102' },
      { nombre: 'Ate', zona: 'Lima Este', ubigeo: '150103' },
      { nombre: 'Barranco', zona: 'Lima Sur', ubigeo: '150104' },
      { nombre: 'Breña', zona: 'Lima Centro', ubigeo: '150105' },
      { nombre: 'Carabayllo', zona: 'Lima Norte', ubigeo: '150106' },
      { nombre: 'Chaclacayo', zona: 'Lima Este', ubigeo: '150107' },
      { nombre: 'Chorrillos', zona: 'Lima Sur', ubigeo: '150108' },
      { nombre: 'Cieneguilla', zona: 'Lima Este', ubigeo: '150109' },
      { nombre: 'Comas', zona: 'Lima Norte', ubigeo: '150110' },
      { nombre: 'El Agustino', zona: 'Lima Este', ubigeo: '150111' },
      { nombre: 'Independencia', zona: 'Lima Norte', ubigeo: '150112' },
      { nombre: 'Jesús María', zona: 'Lima Centro', ubigeo: '150113' },
      { nombre: 'La Molina', zona: 'Lima Este', ubigeo: '150114' },
      { nombre: 'La Victoria', zona: 'Lima Centro', ubigeo: '150115' },
      { nombre: 'Lince', zona: 'Lima Centro', ubigeo: '150116' },
      { nombre: 'Los Olivos', zona: 'Lima Norte', ubigeo: '150117' },
      { nombre: 'Lurigancho (Chosica)', zona: 'Lima Este', ubigeo: '150118' },
      { nombre: 'Lurín', zona: 'Lima Sur', ubigeo: '150119' },
      { nombre: 'Magdalena del Mar', zona: 'Lima Centro', ubigeo: '150120' },
      { nombre: 'Pueblo Libre', zona: 'Lima Centro', ubigeo: '150121' },
      { nombre: 'Miraflores', zona: 'Lima Centro', ubigeo: '150122' },
      { nombre: 'Pachacámac', zona: 'Lima Sur', ubigeo: '150123' },
      { nombre: 'Pucusana', zona: 'Lima Sur', ubigeo: '150124' },
      { nombre: 'Puente Piedra', zona: 'Lima Norte', ubigeo: '150125' },
      { nombre: 'Punta Hermosa', zona: 'Lima Sur', ubigeo: '150126' },
      { nombre: 'Punta Negra', zona: 'Lima Sur', ubigeo: '150127' },
      { nombre: 'Rímac', zona: 'Lima Centro', ubigeo: '150128' },
      { nombre: 'San Bartolo', zona: 'Lima Sur', ubigeo: '150129' },
      { nombre: 'San Borja', zona: 'Lima Centro', ubigeo: '150130' },
      { nombre: 'San Isidro', zona: 'Lima Centro', ubigeo: '150131' },
      { nombre: 'San Juan de Lurigancho', zona: 'Lima Este', ubigeo: '150132' },
      { nombre: 'San Juan de Miraflores', zona: 'Lima Sur', ubigeo: '150133' },
      { nombre: 'San Luis', zona: 'Lima Centro', ubigeo: '150134' },
      { nombre: 'San Martín de Porres', zona: 'Lima Norte', ubigeo: '150135' },
      { nombre: 'San Miguel', zona: 'Lima Centro', ubigeo: '150136' },
      { nombre: 'Santa Anita', zona: 'Lima Este', ubigeo: '150137' },
      { nombre: 'Santa María del Mar', zona: 'Lima Sur', ubigeo: '150138' },
      { nombre: 'Santa Rosa', zona: 'Lima Norte', ubigeo: '150139' },
      { nombre: 'Santiago de Surco', zona: 'Lima Centro', ubigeo: '150140' },
      { nombre: 'Surquillo', zona: 'Lima Centro', ubigeo: '150141' },
      { nombre: 'Villa El Salvador', zona: 'Lima Sur', ubigeo: '150142' },
      { nombre: 'Villa María del Triunfo', zona: 'Lima Sur', ubigeo: '150143' },
    ],
  },
  {
    nombre: 'Callao',
    distritos: [
      { nombre: 'Callao (Cercado)', zona: 'Callao', ubigeo: '070101' },
      { nombre: 'Bellavista', zona: 'Callao', ubigeo: '070102' },
      { nombre: 'Carmen de la Legua Reynoso', zona: 'Callao', ubigeo: '070103' },
      { nombre: 'La Perla', zona: 'Callao', ubigeo: '070104' },
      { nombre: 'La Punta', zona: 'Callao', ubigeo: '070105' },
      { nombre: 'Ventanilla', zona: 'Callao', ubigeo: '070106' },
      { nombre: 'Mi Perú', zona: 'Callao', ubigeo: '070107' },
    ],
  },
];

// Lista de zonas usada por el select de zona (se mantiene independiente para
// permitir ajustes manuales si hiciera falta).
export const ZONAS: string[] = [
  'Lima Centro',
  'Lima Norte',
  'Lima Sur',
  'Lima Este',
  'Callao',
  'Provincia',
];
