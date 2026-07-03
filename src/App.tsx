import ErrorBoundary from './components/ErrorBoundary'
import NotFound from './components/NotFound'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Resume from './components/sections/Resume'
import Contact from './components/sections/Contact'

export default function App() {
  // single-page site — anything but "/" is a 404 (vercel.json rewrites all paths here)
  if (window.location.pathname !== '/') {
    return <NotFound />
  }

  return (
    <ErrorBoundary>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </ErrorBoundary>
  )
}
