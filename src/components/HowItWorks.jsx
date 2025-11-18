function HowItWorks() {
  const steps = [
    { title: 'Get a quote', desc: 'Enter your staking asset, amount, and desired coverage.' },
    { title: 'Pay premium', desc: 'Lock in coverage by paying the premium in USD (mocked for demo).' },
    { title: 'Stay protected', desc: 'We monitor slashing/downtime events. If triggered, you can file a claim.' },
  ]

  return (
    <section id="how" className="bg-black py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">How it works</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/80">
              <div className="text-white text-lg font-semibold">{i+1}. {s.title}</div>
              <p className="mt-2 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks