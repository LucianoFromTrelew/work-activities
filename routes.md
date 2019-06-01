## Activity

- GET /api/activity[?keyword[]] => 200, <Activity>[]
  - Devuelve lista de actividades. Permite filtrar por keywords
- GET /api/activity/{id} => 200, <Activity>
  - Devuelve una actividad
- POST /api/activity `{ title, description, tags[], geolocation{} }` => 201, <Activity>
  - Crea actividad
- DELETE /api/activity/{id} => 204
  - Elimina actividad
- PUT /api/activity/{id} => 200, `{ title, description, tags[], geolocation{} }` => 200, <Activity>
  - Actualiza actividad
- DELETE /api/activity/{id}/tags/{tag} => 204
  - Elimina una etiqueta de una actividad

## Tags

- GET /api/tag => 200, String[]
  - Devuelve lista de etiquetas
- GET /api/tag/{tag} => 200, `{ tag: "...", activities: [{...}, {...}] }`
  - Devuelve una etiqueta y las actividades que tienen esa etiqueta
- DELETE /api/tag/{tag}[?cascade] => 204
  - Elimina una etiqueta. Permite eliminar todas las actividades que contengan esa etiqueta
