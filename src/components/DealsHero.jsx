function DealsHero() {
  const EMBED_URL = import.meta.env.VITE_3D_EMBED_URL // e.g. Sketchfab/Spline public embed

  return (
    <section className="relative min-h-[78vh] overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* Animated backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-fuchsia-600/20 blur-3xl animate-pulse" />
        <div className="absolute top-40 -right-10 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" style={{animationDuration:'4s'}} />
        <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl animate-pulse" style={{animationDuration:'6s'}} />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          {/* Copy */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Live deals updating in real-time
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Hunt epic deals.
              <br />
              Walk into savings.
            </h1>
            <p className="mt-4 text-white/70 text-base sm:text-lg max-w-xl">
              Explore fashion and sportswear discounts from your favorite brands. Filter by category, brand, and minimum % off — then jump straight to the shop.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#search" className="rounded-lg bg-white text-black font-semibold px-5 py-2.5 hover:bg-white/90 transition">Start searching</a>
              <a href="/test" className="rounded-lg border border-white/15 px-5 py-2.5 text-white/80 hover:text-white hover:border-white/30 transition">System status</a>
            </div>

            {/* Mini stats */}
            <div className="mt-8 grid grid-cols-3 max-w-md gap-4 text-center">
              {[
                {k:'Brands', v:'50+'},
                {k:'Categories', v:'20+'},
                {k:'Top savings', v:'70%+'},
              ].map((s)=> (
                <div key={s.k} className="rounded-lg border border-white/10 bg-white/5 px-3 py-3">
                  <div className="text-xl font-bold">{s.v}</div>
                  <div className="text-xs text-white/60">{s.k}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 3D / visual pane */}
          <div className="relative">
            <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur overflow-hidden shadow-[0_0_80px_-20px_rgba(168,85,247,0.35)]">
              <div className="aspect-[16/10] w-full">
                {EMBED_URL ? (
                  <iframe
                    title="3D Mall Walk"
                    src={EMBED_URL}
                    className="h-full w-full"
                    allow="autoplay; fullscreen; xr-spatial-tracking"
                    allowFullScreen
                    loading="lazy"
                  />
                ) : (
                  <div className="relative h-full w-full grid place-items-center bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.06),transparent_35%)]">
                    <div className="absolute inset-0 opacity-20" style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize:'24px 24px'}} />
                    <div className="relative text-center px-6">
                      <div className="mx-auto mb-3 h-14 w-14 rounded-xl bg-white/10 grid place-items-center">
                        <span className="animate-ping inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      </div>
                      <h3 className="text-xl font-semibold">Add a 3D walking scene</h3>
                      <p className="mt-2 text-white/70 text-sm max-w-md">
                        Drop in a public Spline or Sketchfab embed URL via VITE_3D_EMBED_URL to show a character walking into a mall.
                      </p>
                      <div className="mt-4 text-xs text-white/60">
                        Example (Sketchfab): https://sketchfab.com/models/…/embed
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Floating badge */}
              <div className="pointer-events-none absolute -right-2 -top-2 rounded-xl bg-emerald-400 text-emerald-950 text-xs font-bold px-3 py-1 rotate-6 shadow">
                New
              </div>
            </div>
            {/* Parallax floor */}
            <div className="mt-4 h-20 w-full rounded-xl border border-white/10 bg-[linear-gradient(transparent,rgba(0,0,0,0.6)),repeating-linear-gradient(90deg,rgba(255,255,255,0.06)_0_2px,transparent_2px_40px)]" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default DealsHero
