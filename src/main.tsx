import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const navItems = [
  ['inicio', 'Inicio'], ['sobre-mi', 'Sobre mí'], ['perfil', 'Perfil'], ['diagnostico', 'Diagnóstico'], ['ruta', 'Ruta']
]

function Icon({ name }: { name: 'arrow' | 'mail' | 'pin' | 'layers' | 'cloud' | 'terminal' | 'database' | 'menu' }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  const paths: Record<string, React.ReactNode> = {
    arrow: <><path d="M5 12h13"/><path d="m13 6 6 6-6 6"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    layers: <><path d="m12 3 8 4-8 4-8-4 8-4Z"/><path d="m4 12 8 4 8-4"/><path d="m4 17 8 4 8-4"/></>,
    cloud: <><path d="M17.5 19H9a6 6 0 1 1 5.7-7.9A4.5 4.5 0 1 1 17.5 19Z"/></>,
    terminal: <><path d="m4 17 6-5-6-5"/><path d="M12 19h8"/></>,
    database: <><ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5"/><path d="M5 12v7c0 1.7 3.1 3 7 3s7-1.3 7-3v-7"/></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>
  }
  return <svg {...common}>{paths[name]}</svg>
}

function App() {
  const [active, setActive] = useState('inicio')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible') }), { threshold: .12 })
    elements.forEach(el => observer.observe(el))
    const onScroll = () => {
      const current = navItems.find(([id]) => { const el = document.getElementById(id); return el && window.scrollY >= el.offsetTop - 150 })
      if (current) setActive(current[0])
    }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll()
    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [])

  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }

  return <div className="site-shell">
    <header className="nav-wrap"><nav className="nav container">
      <button className="brand" onClick={() => go('inicio')} aria-label="Ir al inicio"><span>CE</span><strong>Portafolio<span className="brand-dot">.</span></strong></button>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>{navItems.map(([id, label]) => <button key={id} className={active === id ? 'active' : ''} onClick={() => go(id)}>{label}</button>)}</div>
      <button className="nav-cta" onClick={() => go('contacto')}>Hablemos <Icon name="arrow" /></button>
      <button className="menu-btn" onClick={() => setMenuOpen(v => !v)} aria-label="Abrir menú"><Icon name="menu" /></button>
    </nav></header>

    <main>
      <section id="inicio" className="hero section-dark"><div className="grid-glow"/><div className="container hero-grid">
        <div className="hero-copy" data-reveal><div className="eyebrow"><span className="pulse"/> PORTAFOLIO PROFESIONAL · 2026</div><h1>Infraestructura que<br/><em>hace posible</em> el futuro.</h1><p className="hero-lead">Ingeniería Informática con mirada estratégica hacia la nube, la automatización y los sistemas que nunca dejan de funcionar.</p><div className="hero-actions"><button className="button button-primary" onClick={() => go('sobre-mi')}>Conocer mi perfil <Icon name="arrow" /></button><button className="text-link" onClick={() => go('ruta')}>Ver mi proyección <span>↗</span></button></div><div className="hero-meta"><div><span>01</span><b>Infraestructura</b></div><div><span>02</span><b>Cloud & DevOps</b></div><div><span>03</span><b>Visión crítica</b></div></div></div>
        <div className="hero-visual" data-reveal><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="portrait-frame"><img src="/images/portrait.jpg" alt="Retrato profesional de Carlos Eduardo Delgado Idrobo"/><div className="portrait-tag"><span className="status-dot"/> Disponible para aprender</div></div><div className="vertical-label">CARLOS EDUARDO DELGADO IDROBO</div></div>
      </div><div className="scroll-cue"><span>DESPLAZA PARA EXPLORAR</span><i/></div></section>

      <section id="sobre-mi" className="section section-paper"><div className="container about-grid"><div className="section-index" data-reveal>01 <span>Sobre mí</span></div><div className="about-visual" data-reveal><div className="about-visual-top"><span>PERFIL EN CONSTRUCCIÓN</span><b>CE / 2026</b></div><div className="about-visual-main"><span>ANALIZAR</span><span>RESOLVER</span><span>EVOLUCIONAR</span></div><div className="about-visual-bottom"><Icon name="terminal"/><span>Curiosidad técnica<br/>con propósito humano.</span></div></div><div className="about-copy" data-reveal><p className="kicker">Más allá del código</p><h2>Construir sistemas también es <em>entender personas.</em></h2><p>Soy estudiante de Ingeniería Informática enfocado en la gestión, soporte y evolución de la infraestructura tecnológica. Me apasiona comprender la base operativa que sostiene las aplicaciones modernas y los servicios en la nube.</p><p>Mi forma de aprender combina curiosidad técnica, pensamiento analítico y una actitud de adaptación rápida frente a nuevos retos. Cada incidente es una oportunidad para encontrar una solución más clara, segura y eficiente.</p><div className="signature">Carlos Eduardo <span>·</span> Ingeniero en formación</div></div></div></section>

      <section id="perfil" className="section profile-section"><div className="container"><div className="section-heading" data-reveal><div><p className="kicker">02 · Fundamentos</p><h2>Un perfil con base<br/><em>técnica y propósito.</em></h2></div><p>La infraestructura es el escenario invisible donde sucede todo lo digital. Mi objetivo es aprender a diseñarlo para que sea confiable, escalable y humano.</p></div><div className="profile-cards"><article className="feature-card dark-card" data-reveal><div className="card-icon"><Icon name="layers"/></div><span className="card-number">01</span><h3>El rol que me inspira</h3><p>El Ingeniero en Infraestructura provee la plataforma tecnológica sobre la cual se ejecutan todos los servicios digitales.</p><a onClick={() => go('diagnostico')}>Explorar mi diagnóstico <Icon name="arrow"/></a></article><article className="feature-card" data-reveal><div className="card-icon blue-icon"><Icon name="cloud"/></div><span className="card-number">02</span><h3>Mi enfoque profesional</h3><p>Diseño, soporte y optimización de arquitecturas de sistemas en la nube y entornos críticos, como el sector bancario.</p><div className="pill-row"><span>AWS</span><span>Azure</span><span>DevOps</span></div></article><article className="feature-card" data-reveal><div className="card-icon coral-icon"><Icon name="terminal"/></div><span className="card-number">03</span><h3>Lo que ya practico</h3><p>Competencias iniciales en Docker y Postman, con una mirada orientada a la automatización y la resolución eficiente de incidentes.</p><div className="pill-row"><span>Docker</span><span>Postman</span><span>APIs</span></div></article></div></div></section>

      <section id="diagnostico" className="section diagnosis-section"><div className="container"><div className="section-heading compact" data-reveal><div><p className="kicker">03 · Autodiagnóstico</p><h2>Donde estoy hoy,<br/><em>hacia dónde voy.</em></h2></div><p>Un mapa honesto entre mis fortalezas actuales y las capacidades que quiero convertir en dominio profesional.</p></div><div className="diagnosis-grid"><div className="strengths" data-reveal><div className="diag-title"><span className="diag-dot green"/> Fortalezas actuales <b>01—04</b></div>{['Manejo práctico inicial de Docker y Postman.','Inclinación por la administración de bases de datos.','Capacidad de rápida adaptabilidad.','Enfoque en la resolución de problemas lógicos.'].map((item,i)=><div className="diag-item" key={item}><span>0{i+1}</span><p>{item}</p><i>↗</i></div>)}</div><div className="gaps" data-reveal><div className="diag-title"><span className="diag-dot coral"/> Brechas a desarrollar <b>01—04</b></div>{['Arquitectura avanzada en AWS y Azure.','Infraestructura como Código con Terraform.','Orquestación masiva con Kubernetes.','Inglés técnico y conversacional C1/C2.'].map((item,i)=><div className="diag-item" key={item}><span>0{i+1}</span><p>{item}</p><i>↗</i></div>)}</div></div><div className="market-table" data-reveal><div className="table-intro"><p className="kicker">El mercado pide</p><h3>Herramientas para<br/>hacerlo realidad.</h3></div><div className="table-rows">{[['Áreas de desempeño','Bases de datos SQL/NoSQL · Soporte de alto nivel · Cloud/On-premise · Sector financiero'],['Herramientas clave','Docker · Podman · Postman · Kubernetes · Terraform'],['Certificaciones objetivo','Cisco CCNA · AWS SysOps / Solutions Architect · Oracle DBA'],['Rango salarial promedio','$5.000.000 — $7.000.000 COP']].map(([a,b])=><div className="table-row" key={a}><span>{a}</span><b>{b}</b></div>)}</div></div></div></section>

      <section id="ruta" className="section roadmap-section section-dark"><div className="container"><div className="section-heading roadmap-heading" data-reveal><div><p className="kicker">04 · Plan estratégico</p><h2>La ruta se construye<br/><em>paso a paso.</em></h2></div><p>Un plan de aprendizaje con acciones concretas para pasar de los fundamentos a la arquitectura de sistemas críticos.</p></div><div className="roadmap" data-reveal>{[['01','Fundamentos Cloud','Iniciar con AWS Cloud Practitioner o Azure Fundamentals y practicar inglés técnico.'],['02','Laboratorios de automatización','Construir proyectos integrando Docker, Podman, Postman y scripts con Terraform.'],['03','Habilidades que conectan','Trabajar comunicación efectiva, equipo y liderazgo en proyectos universitarios.'],['04','Comunidad y criterio','Participar en semilleros de redes/sistemas distribuidos y comunidades DevOps.']].map(([n,t,d],i)=><div className="road-item" key={n}><div className="road-node">{n}</div><div className="road-content"><p>FASE {n}</p><h3>{t}</h3><span>{d}</span></div>{i<3 && <div className="road-line"/>}</div>)}</div></div></section>

      <section id="contacto" className="section pitch-section"><div className="container pitch-grid"><div data-reveal><p className="kicker">05 · Presentación profesional</p><h2>La próxima conversación<br/>empieza <em>aquí.</em></h2><p className="pitch-lead">“Es un gusto presentarles a Carlos Eduardo Delgado Idrobo. Se proyecta hacia la Ingeniería Informática con una visión muy clara: convertirse en un Ingeniero en Infraestructura especializado en la gestión y optimización de entornos tecnológicos críticos.”</p><button className="button button-primary" onClick={() => window.location.href='mailto:eduardoidrobo122@gmail.com'}>Conectar conmigo <Icon name="mail" /></button></div><div className="contact-card" data-reveal><div className="contact-top"><span>CE</span><span className="available"><i/> En formación activa</span></div><h3>Carlos Eduardo<br/><em>Delgado Idrobo</em></h3><div className="contact-detail"><Icon name="pin"/><span>Popayán, Cauca, Colombia</span></div><div className="contact-detail"><Icon name="mail"/><span>eduardoidrobo122@gmail.com</span></div><div className="contact-footer"><span>Ingeniería Informática</span><b>↗</b></div></div></div></section>
    </main><footer><div className="container footer-inner"><span>© 2026 Carlos Eduardo Delgado Idrobo</span><span>Hecho con intención · Infraestructura & visión</span><button onClick={() => go('inicio')}>Volver arriba ↑</button></div></footer>
  </div>
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
