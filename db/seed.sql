-- Initial data that mirrors the current TEAM constant in index.html.
-- IDs are explicit so the frontend can map 1:1 with the existing app data.

insert into public.paises (id, nombre, flag, initials) values
  (1, 'Chile', '🇨🇱', 'CL'),
  (2, 'Argentina', '🇦🇷', 'AR'),
  (3, 'Colombia', '🇨🇴', 'CO'),
  (4, 'México', '🇲🇽', 'MX')
on conflict (id) do nothing;

insert into public.usuarios (id, name, role, pais_id) values
  (1, 'Ariel G.', 'CEO', 1),
  (2, 'Valentina R.', 'Producto', 1),
  (3, 'Diego M.', 'Desarrollo', 2),
  (4, 'Camila F.', 'CS', 3),
  (5, 'Matías L.', 'Desarrollo', 1),
  (6, 'Sofía P.', 'Diseño', 4),
  (7, 'Andrés C.', 'Ventas', 3),
  (8, 'Isabella T.', 'CS', 2),
  (9, 'Lucas H.', 'Desarrollo', 1),
  (10, 'Martina V.', 'Marketing', 4),
  (11, 'Felipe O.', 'Operaciones', 1),
  (12, 'Gabriela N.', 'Finanzas', 2),
  (13, 'Sebastián A.', 'Desarrollo', 3),
  (14, 'Catalina B.', 'RRHH', 1),
  (15, 'Pablo E.', 'Ventas', 4),
  (16, 'Natalia S.', 'CS', 1),
  (17, 'Rodrigo J.', 'Desarrollo', 2),
  (18, 'Alejandra U.', 'Producto', 3),
  (19, 'Tomás I.', 'Infraestructura', 1),
  (20, 'Daniela Q.', 'Diseño', 4),
  (21, 'Ignacio W.', 'Desarrollo', 1),
  (22, 'Florencia K.', 'CS', 2),
  (23, 'Cristóbal Z.', 'Ventas', 3),
  (24, 'María José X.', 'Marketing', 4)
on conflict (id) do nothing;

insert into public.figuritas (id, user_id, foto_path) values
  (1, 1, ''),
  (2, 2, ''),
  (3, 3, ''),
  (4, 4, ''),
  (5, 5, ''),
  (6, 6, ''),
  (7, 7, ''),
  (8, 8, ''),
  (9, 9, ''),
  (10, 10, ''),
  (11, 11, ''),
  (12, 12, ''),
  (13, 13, ''),
  (14, 14, ''),
  (15, 15, ''),
  (16, 16, ''),
  (17, 17, ''),
  (18, 18, ''),
  (19, 19, ''),
  (20, 20, ''),
  (21, 21, ''),
  (22, 22, ''),
  (23, 23, ''),
  (24, 24, '')
on conflict (id) do nothing;
