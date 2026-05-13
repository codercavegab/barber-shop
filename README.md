# Barbería — reservas

Aplicación web en **TypeScript** (Next.js App Router) para reservar turnos por barbero, con capas **domain / application / infrastructure** y **PostgreSQL** vía Prisma.

## Requisitos

- Node.js 20+
- PostgreSQL (local o gestionado)

## Configuración

1. Copiá el ejemplo de entorno y ajustá la URL:

   ```bash
   copy .env.example .env
   ```

2. Creá la base y aplicá el esquema (elegí uno):

   ```bash
   npm run db:migrate
   ```

   o, solo para desarrollo rápido sin historial de migraciones:

   ```bash
   npm run db:push
   ```

3. Arrancá el servidor de desarrollo:

   ```bash
   npm run dev
   ```

- Sitio: [http://localhost:3000](http://localhost:3000)
- Salud API: [http://localhost:3000/api/health](http://localhost:3000/api/health)

## Estructura principal

| Ruta | Rol |
|------|-----|
| `src/app/` | UI y rutas API (presentación) |
| `src/domain/` | Tipos y reglas de dominio |
| `src/application/` | Casos de uso (p. ej. `listAvailableSlots`) |
| `src/infrastructure/` | Prisma y futuros adaptadores |
| `prisma/schema.prisma` | Modelo de datos |

## Scripts

- `npm run db:generate` — regenera el cliente Prisma
- `npm run db:migrate` — migraciones en desarrollo
- `npm run db:push` — sincroniza esquema sin migración
- `npm run db:studio` — interfaz visual de la base
