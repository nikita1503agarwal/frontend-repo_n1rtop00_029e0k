import DealsHero from './components/DealsHero'
import DealsSearch from './components/DealsSearch'

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <DealsHero />
      <DealsSearch />
      <footer className="bg-black/80 border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">© {new Date().getFullYear()} DealRunner. Find more, spend less.</p>
          <a href="/test" className="text-white/60 hover:text-white text-sm">System status</a>
        </div>
      </footer>
    </div>
  )
}

export default App