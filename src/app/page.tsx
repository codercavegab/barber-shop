import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-border bg-surface/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">
            Estudio &amp; Navaja
          </span>
          <nav className="flex items-center gap-6 text-sm font-medium text-muted">
            <span className="cursor-not-allowed opacity-60">Reservar</span>
            <span className="cursor-not-allowed opacity-60">Barberos</span>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-6 py-16 md:py-24">
        <section className="max-w-2xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Barbería
          </p>
          <h1 className="font-display text-4xl font-semibold leading-tight text-foreground md:text-5xl">
            Turnos claros, sin mensajes de por medio
          </h1>
          <p className="text-lg leading-relaxed text-muted">
            Elegí barbero, servicio y horario en un calendario que refleja la
            disponibilidad real. El esqueleto del proyecto ya está listo para
            conectar reglas de negocio y base de datos.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <span className="inline-flex items-center rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-muted">
              Calendario — próximo paso
            </span>
            <Link
              href="/api/health"
              className="inline-flex items-center rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Comprobar API
            </Link>
          </div>
        </section>

        <section className="grid gap-4 border-t border-border pt-12 md:grid-cols-3">
          {[
            {
              title: "Dominio",
              body: "Tipos y convenciones de tiempo en `src/domain`.",
            },
            {
              title: "Casos de uso",
              body: "`listAvailableSlots` en `src/application` (stub).",
            },
            {
              title: "Datos",
              body: "Prisma + PostgreSQL en `prisma/schema.prisma`.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
            >
              <h2 className="font-display text-lg font-semibold text-foreground">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted">
        TypeScript · Next.js · capas domain / application / infrastructure
      </footer>
    </div>
  );
}
