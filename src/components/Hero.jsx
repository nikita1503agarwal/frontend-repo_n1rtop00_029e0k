import Spline from '@splinetool/react-spline';

function Hero() {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/44zrIZf-iQZhbQNQ/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      {/* Gradient overlay for readability (doesn't block Spline interactions) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 flex flex-col items-center text-center">
        <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
          New • On-chain staking coverage
        </span>
        <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_24px_rgba(255,255,255,0.25)]">
          Insure Your Crypto Staking
        </h1>
        <p className="mt-4 max-w-2xl text-base sm:text-lg text-white/80">
          Protect against slashing, validator downtime, and depeg events. Simple premiums, transparent claims, instant quotes.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a href="#quote" className="inline-flex items-center justify-center rounded-lg bg-white text-black font-semibold px-6 py-3 shadow hover:opacity-90 transition">
            Get Instant Quote
          </a>
          <a href="#how" className="inline-flex items-center justify-center rounded-lg bg-white/10 text-white px-6 py-3 border border-white/20 hover:bg-white/15 transition">
            How it works
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero;