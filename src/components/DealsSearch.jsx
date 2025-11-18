import { useEffect, useMemo, useState } from 'react'

function DealsSearch() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [q, setQ] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [minDiscount, setMinDiscount] = useState(20)
  const [brands, setBrands] = useState([])
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => { fetchBrands() }, [])

  async function fetchBrands() {
    try {
      const res = await fetch(`${baseUrl}/brands`)
      const data = await res.json()
      setBrands(data.items || [])
    } catch {}
  }

  async function search() {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (q) params.append('q', q)
      if (brand) params.append('brand', brand)
      if (category) params.append('category', category)
      if (minDiscount) params.append('min_discount', String(minDiscount))
      const res = await fetch(`${baseUrl}/deals?${params.toString()}`)
      const data = await res.json()
      setItems(data.items || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { search() }, [])

  const categories = ['Men','Women','Kids','Sportswear','Shoes','Accessories','Home']

  return (
    <section id="search" className="bg-zinc-950 py-6 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search brand, item or tag" className="col-span-2 rounded-lg bg-black/50 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none" />
            <select value={brand} onChange={e=>setBrand(e.target.value)} className="rounded-lg bg-black/50 border border-white/10 px-3 py-2 text-white">
              <option value="">All brands</option>
              {brands.map((b)=> <option key={b} value={b}>{b}</option>)}
            </select>
            <select value={category} onChange={e=>setCategory(e.target.value)} className="rounded-lg bg-black/50 border border-white/10 px-3 py-2 text-white">
              <option value="">All categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="flex items-center gap-2">
              <input type="number" value={minDiscount} onChange={e=>setMinDiscount(e.target.value)} className="w-24 rounded-lg bg-black/50 border border-white/10 px-3 py-2 text-white" />
              <span className="text-white/60 text-sm">% off min</span>
              <button onClick={search} className="ml-auto rounded-lg bg-white text-black font-semibold px-4 py-2">{loading? 'Searching…':'Search'}</button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(item => (
            <a key={item.id} href={item.url} target="_blank" rel="noreferrer" className="group rounded-xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition">
              {item.image && (
                <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
              )}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">{item.brand}</span>
                  {item.discount_percent != null && (
                    <span className="text-emerald-300 text-xs font-semibold">-{item.discount_percent}%</span>
                  )}
                </div>
                <h3 className="mt-1 text-white font-semibold line-clamp-2">{item.title}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-white text-lg font-bold">${item.price}</span>
                  {item.original_price && (
                    <span className="text-white/50 line-through">${item.original_price}</span>
                  )}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {item.tags?.slice(0,3).map((t,i)=> (
                    <span key={i} className="text-xs text-white/70 border border-white/10 rounded px-2 py-0.5">{t}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
          {items.length === 0 && !loading && (
            <div className="col-span-full text-center text-white/60">No deals found. Try different filters.</div>
          )}
        </div>
      </div>
    </section>
  )
}

export default DealsSearch
