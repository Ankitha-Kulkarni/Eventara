import Navbar from "../components/Navbar";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Jost:wght@300;400;500&display=swap');
  :root {
    --paper:#FAF7F2; --paper2:#F3EFE8; --paper3:#EDE8DF;
    --ink:#1C1917; --ink2:#44403C; --muted:#A8A29E;
    --terra:#C4622D; --terra-light:rgba(196,98,45,0.09); --terra-dim:rgba(196,98,45,0.35);
    --shadow:rgba(28,25,23,0.07); --shadow-md:rgba(28,25,23,0.13);
  }
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  .h-root{background:var(--paper);color:var(--ink);min-height:100vh;font-family:'Jost',sans-serif;overflow-x:hidden}
  .hero{position:relative;height:92vh;display:flex;flex-direction:column;justify-content:flex-end;padding:0 8vw 10vh;overflow:hidden}
  .hero-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(0.6) brightness(0.72);transform:scale(1.06);animation:heroZoom 18s ease-in-out infinite alternate}
  @keyframes heroZoom{from{transform:scale(1.06)}to{transform:scale(1.0)}}
  .hero-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(250,247,242,0.96) 0%,rgba(250,247,242,0.5) 40%,rgba(250,247,242,0.04) 100%),linear-gradient(to right,rgba(250,247,242,0.25) 0%,transparent 60%)}
  .hero-overlay::before{content:'';position:absolute;left:8vw;top:0;bottom:0;width:1px;background:linear-gradient(to bottom,transparent 5%,var(--terra) 40%,transparent 95%);opacity:0.3}
  .hero-content{position:relative;z-index:2;max-width:720px;animation:fadeUp 0.9s 0.1s ease both}
  .hero-tag{font-size:10px;letter-spacing:0.35em;text-transform:uppercase;color:var(--terra);margin-bottom:22px;display:flex;align-items:center;gap:12px}
  .hero-tag::before{content:'';width:28px;height:1px;background:var(--terra);opacity:0.7}
  .hero-h1{font-family:'Playfair Display',serif;font-size:clamp(3rem,7vw,6.5rem);font-weight:400;line-height:0.95;letter-spacing:-0.02em;color:var(--ink);margin-bottom:28px}
  .hero-h1 em{font-style:italic;color:var(--terra)}
  .hero-sub{font-size:15px;font-weight:300;color:var(--ink2);line-height:1.8;margin-bottom:44px;max-width:420px}
  .hero-actions{display:flex;align-items:center;gap:24px}
  .btn-primary{display:inline-flex;align-items:center;gap:12px;padding:15px 36px;background:var(--terra);color:#FAF7F2;font-family:'Jost',sans-serif;font-size:11px;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;border:none;position:relative;overflow:hidden;transition:color 0.3s}
  .btn-primary::before{content:'';position:absolute;inset:0;background:var(--ink);transform:translateX(-101%);transition:transform 0.35s cubic-bezier(0.76,0,0.24,1)}
  .btn-primary:hover::before{transform:translateX(0)}
  .btn-primary span{position:relative;z-index:1}
  .btn-ghost-link{font-size:12px;font-weight:400;color:var(--ink2);letter-spacing:0.08em;text-decoration:none;border-bottom:1px solid var(--paper3);padding-bottom:3px;transition:color 0.2s,border-color 0.2s}
  .btn-ghost-link:hover{color:var(--terra);border-color:var(--terra-dim)}
  .scroll-hint{position:absolute;bottom:40px;right:8vw;z-index:2;display:flex;flex-direction:column;align-items:center;gap:10px;color:var(--muted);font-size:9px;letter-spacing:0.3em;text-transform:uppercase}
  .scroll-line{width:1px;height:56px;background:linear-gradient(to bottom,var(--terra) 0%,transparent 100%);animation:scrollDrop 2.4s ease-in-out infinite}
  @keyframes scrollDrop{0%{transform:scaleY(0);transform-origin:top;opacity:0}40%{transform:scaleY(1);transform-origin:top;opacity:1}60%{transform:scaleY(1);transform-origin:bottom;opacity:1}100%{transform:scaleY(0);transform-origin:bottom;opacity:0}}
  .marquee-wrap{border-top:1px solid var(--paper3);border-bottom:1px solid var(--paper3);overflow:hidden;padding:14px 0;background:var(--paper2)}
  .marquee-track{display:flex;animation:marquee 30s linear infinite;width:max-content}
  .marquee-item{display:flex;align-items:center;gap:32px;padding:0 52px;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:var(--muted);white-space:nowrap}
  .marquee-item::after{content:'✦';color:var(--terra);opacity:0.5;font-size:7px}
  @keyframes marquee{to{transform:translateX(-50%)}}
  .filter-row{display:flex;align-items:center;padding:0 8vw;overflow-x:auto;scrollbar-width:none;border-bottom:1px solid var(--paper3);background:var(--paper)}
  .filter-row::-webkit-scrollbar{display:none}
  .f-btn{padding:18px 26px;background:none;border:none;border-bottom:2px solid transparent;margin-bottom:-1px;color:var(--muted);font-family:'Jost',sans-serif;font-size:11px;font-weight:400;letter-spacing:0.12em;text-transform:uppercase;cursor:pointer;white-space:nowrap;transition:color 0.2s,border-color 0.2s}
  .f-btn:hover{color:var(--ink)}
  .f-btn.active{color:var(--terra);border-bottom-color:var(--terra)}
  .sections{padding:64px 8vw 80px;background:var(--paper)}
  .cat-row{margin-bottom:72px}
  .cat-header{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:32px}
  .cat-title{font-family:'Playfair Display',serif;font-size:2rem;font-weight:400;font-style:italic;color:var(--ink)}
  .cat-all{font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:var(--muted);text-decoration:none;border-bottom:1px solid transparent;transition:color 0.2s,border-color 0.2s;cursor:pointer}
  .cat-all:hover{color:var(--terra);border-bottom-color:var(--terra-dim)}
  .row-scroll{display:flex;gap:20px;overflow-x:auto;padding-bottom:12px;scrollbar-width:thin;scrollbar-color:var(--paper3) transparent}
  .row-scroll::-webkit-scrollbar{height:2px}
  .row-scroll::-webkit-scrollbar-thumb{background:var(--paper3)}
  .flat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:24px}
  .card-link{text-decoration:none;flex-shrink:0}
  .card{width:272px;background:#fff;border:1px solid var(--paper3);position:relative;overflow:hidden;transition:transform 0.35s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.35s,border-color 0.3s;box-shadow:0 2px 12px var(--shadow)}
  .flat-grid .card{width:100%}
  .card:hover{transform:translateY(-6px);box-shadow:0 16px 48px var(--shadow-md);border-color:var(--terra-dim)}
  .card-img-wrap{position:relative;height:200px;overflow:hidden}
  .card-img{width:100%;height:100%;object-fit:cover;filter:saturate(0.85);transition:transform 0.65s ease,filter 0.4s}
  .card:hover .card-img{transform:scale(1.07);filter:saturate(1.05)}
  .card-cat{position:absolute;top:14px;left:14px;padding:4px 11px;background:rgba(250,247,242,0.92);border:1px solid var(--paper3);font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:var(--terra);backdrop-filter:blur(6px)}
  .card-body{padding:20px 22px 24px}
  .card-date{font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:var(--terra);margin-bottom:8px;opacity:0.85}
  .card-title{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:400;color:var(--ink);line-height:1.3;margin-bottom:14px}
  .card-cta{display:flex;align-items:center;gap:7px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:var(--muted);transition:color 0.25s,gap 0.25s}
  .card:hover .card-cta{color:var(--terra);gap:12px}
  .card-line{position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(to right,var(--terra),transparent);transform:scaleX(0);transform-origin:left;transition:transform 0.4s ease}
  .card:hover .card-line{transform:scaleX(1)}
  .cat-row:first-child .row-scroll .card:first-child{width:380px}
  .cat-row:first-child .row-scroll .card:first-child .card-img-wrap{height:260px}
  .footer{border-top:1px solid var(--paper3);padding:28px 8vw;display:flex;align-items:center;justify-content:space-between;background:var(--paper2)}
  .footer-logo{font-family:'Playfair Display',serif;font-size:1.15rem;font-weight:400;font-style:italic;color:var(--terra)}
  .footer-note{font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted)}
  @keyframes fadeUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
`;

function Card({ event, delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <Link to={`/events/${event._id}`} className="card-link">
      <div ref={ref} className="card" style={vis ? { animation: `fadeUp 0.55s ${delay}ms ease both` } : { opacity: 0 }}>
        <div className="card-img-wrap">
          <img src={event.image} className="card-img" alt={event.title}/>
          {event.category && <span className="card-cat">{event.category}</span>}
        </div>
        <div className="card-body">
          <p className="card-date">{event.date}</p>
          <h3 className="card-title">{event.title}</h3>
          <span className="card-cta">Reserve seats →</span>
        </div>
        <div className="card-line"/>
      </div>
    </Link>
  );
}

export default function Home() {
  const [events, setEvents] = useState([]);
  const [active, setActive] = useState(null);
  useEffect(() => { fetch("http://localhost:5000/events").then(r => r.json()).then(setEvents).catch(console.log); }, []);
  const categories = [...new Set(events.map(e => e.category))];
  const marqueeItems = ['Cinema','Live Music','Comedy','Theatre','Workshops','Exhibitions','Festivals','Dance'];
  return (
    <>
      <style>{CSS}</style>
      <div className="h-root">
        <Navbar/>
        <section className="hero">
          <img src="https://images.unsplash.com/photo-1505238680356-667803448bb6" className="hero-img" alt=""/>
          <div className="hero-overlay"/>
          <div className="hero-content">
            <p className="hero-tag">Curated experiences</p>
            <h1 className="hero-h1">Live the<br/><em>extraordinary</em></h1>
            <p className="hero-sub">Handpicked events — cinema, theatre, music, and more — presented with intention.</p>
            <div className="hero-actions">
              <Link to="/add-event" className="btn-primary"><span>Explore events</span><span>→</span></Link>
              <Link to="#events" className="btn-ghost-link">View calendar</Link>
            </div>
          </div>
          <div className="scroll-hint"><span>Scroll</span><div className="scroll-line"/></div>
        </section>
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[...marqueeItems,...marqueeItems].map((item,i)=><div key={i} className="marquee-item">{item}</div>)}
          </div>
        </div>
        <nav className="filter-row">
          <button className={`f-btn ${active===null?'active':''}`} onClick={()=>setActive(null)}>All</button>
          {categories.map(c=><button key={c} className={`f-btn ${active===c?'active':''}`} onClick={()=>setActive(c)}>{c}</button>)}
        </nav>
        <main className="sections" id="events">
          {active ? (
            <div className="flat-grid">
              {events.filter(e=>e.category===active).map((ev,i)=><Card key={ev._id} event={ev} delay={i*70}/>)}
            </div>
          ) : (
            categories.map(cat=>(
              <div key={cat} className="cat-row">
                <div className="cat-header">
                  <h2 className="cat-title">{cat}</h2>
                  <a href="#" className="cat-all" onClick={e=>{e.preventDefault();setActive(cat);}}>View all →</a>
                </div>
                <div className="row-scroll">
                  {events.filter(e=>e.category===cat).map((ev,i)=><Card key={ev._id} event={ev} delay={i*70}/>)}
                </div>
              </div>
            ))
          )}
        </main>
        <footer className="footer">
          <span className="footer-logo">Eventara</span>
          <span className="footer-note">✦ curated for the discerning</span>
        </footer>
      </div>
    </>
  );
}
