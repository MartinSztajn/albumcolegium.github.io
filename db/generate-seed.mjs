import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const LAMINAS_DIR = path.join(ROOT, 'laminas');
const OUTPUT_PATH = path.join(ROOT, 'db', 'seed.sql');

const COUNTRIES = [
  { id: 1, nombre: 'Chile', flag: '🇨🇱', initials: 'CL' },
  { id: 2, nombre: 'Argentina', flag: '🇦🇷', initials: 'AR' },
  { id: 3, nombre: 'Colombia', flag: '🇨🇴', initials: 'CO' },
  { id: 4, nombre: 'México', flag: '🇲🇽', initials: 'MX' },
];

const ROLES = [
  'CEO',
  'Producto',
  'Desarrollo',
  'CS',
  'Desarrollo',
  'Diseño',
  'Ventas',
  'CS',
  'Desarrollo',
  'Marketing',
  'Operaciones',
  'Finanzas',
  'Desarrollo',
  'RRHH',
  'Ventas',
  'CS',
  'Desarrollo',
  'Producto',
  'Infraestructura',
  'Diseño',
  'Desarrollo',
  'CS',
  'Ventas',
  'Marketing',
];

function escapeSql(value) {
  return String(value).replace(/'/g, "''");
}

function readLaminaFiles() {
  return fs
    .readdirSync(LAMINAS_DIR)
    .filter(file => file.toLowerCase().endsWith('.png'))
    .sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));
}

function buildSql(files) {
  const lines = [];

  lines.push('-- Auto-generated from laminas/*.png');
  lines.push('-- Run this after db/schema.sql.');
  lines.push('');
  lines.push('insert into public.paises (id, nombre, flag, initials) values');
  lines.push(
    COUNTRIES.map((country, idx) => {
      const suffix = idx === COUNTRIES.length - 1 ? '' : ',';
      return `  (${country.id}, '${escapeSql(country.nombre)}', '${escapeSql(country.flag)}', '${escapeSql(country.initials)}')${suffix}`;
    }).join('\n'),
  );
  lines.push('on conflict (id) do update set');
  lines.push('  nombre = excluded.nombre,');
  lines.push('  flag = excluded.flag,');
  lines.push('  initials = excluded.initials;');
  lines.push('');
  lines.push('insert into public.usuarios (id, name, role, pais_id, login_name, login_password, lamina_path) values');
  lines.push(
    files.map((file, index) => {
      const baseName = file.slice(0, -4);
      const role = ROLES[index % ROLES.length];
      const countryId = COUNTRIES[(index) % COUNTRIES.length].id;
      const suffix = index === files.length - 1 ? '' : ',';
      return `  (${index + 1}, '${escapeSql(baseName)}', '${escapeSql(role)}', ${countryId}, '${escapeSql(baseName)}', '${escapeSql(baseName)}', 'laminas/${escapeSql(file)}')${suffix}`;
    }).join('\n'),
  );
  lines.push('on conflict (id) do update set');
  lines.push('  name = excluded.name,');
  lines.push('  role = excluded.role,');
  lines.push('  pais_id = excluded.pais_id,');
  lines.push('  login_name = excluded.login_name,');
  lines.push('  login_password = excluded.login_password,');
  lines.push('  lamina_path = excluded.lamina_path;');
  lines.push('');
  lines.push('insert into public.figuritas (id, user_id, foto_path) values');
  lines.push(
    files.map((file, index) => {
      const suffix = index === files.length - 1 ? '' : ',';
      return `  (${index + 1}, ${index + 1}, 'laminas/${escapeSql(file)}')${suffix}`;
    }).join('\n'),
  );
  lines.push('on conflict (id) do update set');
  lines.push('  user_id = excluded.user_id,');
  lines.push('  foto_path = excluded.foto_path;');
  lines.push('');

  return lines.join('\n');
}

const files = readLaminaFiles();

if (!files.length) {
  throw new Error(`No PNG files found in ${LAMINAS_DIR}`);
}

fs.writeFileSync(OUTPUT_PATH, `${buildSql(files)}\n`);
console.log(`Wrote ${OUTPUT_PATH} with ${files.length} usuarios/figuritas.`);
