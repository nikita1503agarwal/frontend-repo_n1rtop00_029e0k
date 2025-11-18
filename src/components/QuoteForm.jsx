import { useMemo, useState } from 'react'

const assets = ['ETH','SOL','ATOM','ADA','AVAX','DOT','MATIC','BNB','Other']

function QuoteForm() {
  const [email, setEmail] = useState('')
  const [asset, setAsset] = useState('ETH')
  const [amount, setAmount] = useState('')
  const [usdValue, setUsdValue] = useState('')
  const [coverage, setCoverage] = useState(70)
  const [days, setDays] = useState(90)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const premium = useMemo(() => {
    const v = parseFloat(usdValue || '0')
    const c = parseFloat(coverage || '0') / 100
    // Simple model: base rate 2.5% of covered value pro-rated by days/365
    const baseRate = 0.025
    const proRate = (days || 0) / 365
    return Math.max(0, +(v * c * baseRate * proRate).toFixed(2))
  }, [usdValue, coverage, days])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setResult(null)
    setLoading(true)
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const payload = {
        email,
        asset,
        amount_staked: parseFloat(amount),
        usd_value: parseFloat(usdValue),
        coverage_percent: parseFloat(coverage),
        duration_days: parseInt(days, 10),
        premium_usd: premium,
        status: 'active'
      }
      const res = await fetch(`${baseUrl}/policies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const data = await res.json()
      setResult({ id: data.id, premium: premium })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="quote" className="relative z-10 py-16 bg-black">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Instant Quote</h2>
          <p className="text-white/70 mt-1">Enter your staking details to generate a premium and create a policy.</p>

          <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className="block text-sm text-white/80 mb-1">Email</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required placeholder="you@domain.com" className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30" />
            </div>
            <div className="col-span-1">
              <label className="block text-sm text-white/80 mb-1">Asset</label>
              <select value={asset} onChange={e=>setAsset(e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30">
                {assets.map(a=> <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div className="col-span-1">
              <label className="block text-sm text-white/80 mb-1">Amount staked (units)</label>
              <input value={amount} onChange={e=>setAmount(e.target.value)} type="number" min="0" step="any" required className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30" />
            </div>
            <div className="col-span-1">
              <label className="block text-sm text-white/80 mb-1">USD value</label>
              <input value={usdValue} onChange={e=>setUsdValue(e.target.value)} type="number" min="0" step="any" required className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30" />
            </div>
            <div className="col-span-1">
              <label className="block text-sm text-white/80 mb-1">Coverage %</label>
              <input value={coverage} onChange={e=>setCoverage(e.target.value)} type="number" min="1" max="100" className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30" />
            </div>
            <div className="col-span-1">
              <label className="block text-sm text-white/80 mb-1">Duration (days)</label>
              <input value={days} onChange={e=>setDays(e.target.value)} type="number" min="7" max="365" className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30" />
            </div>

            <div className="col-span-1 sm:col-span-2 mt-2 flex items-center justify-between">
              <p className="text-white/80">Estimated premium: <span className="font-semibold text-white">${premium}</span></p>
              <button disabled={loading} className="rounded-lg bg-white text-black font-semibold px-6 py-2 disabled:opacity-60">
                {loading ? 'Creating…' : 'Create Policy'}
              </button>
            </div>
          </form>

          {result && (
            <div className="mt-4 rounded-lg border border-emerald-400/30 bg-emerald-500/10 p-4 text-emerald-100">
              Policy created. ID: <span className="font-mono">{result.id}</span> • Premium: ${result.premium}
            </div>
          )}
          {error && (
            <div className="mt-4 rounded-lg border border-red-400/30 bg-red-500/10 p-4 text-red-100">
              {error}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default QuoteForm