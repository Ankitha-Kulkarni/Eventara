import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Jost:wght@300;400;500&display=swap');
  :root{--paper:#FAF7F2;--paper2:#F3EFE8;--paper3:#EDE8DF;--ink:#1C1917;--ink2:#44403C;--muted:#A8A29E;--terra:#C4622D;--terra-dim:rgba(196,98,45,0.35);--shadow:rgba(28,25,23,0.07);--shadow-md:rgba(28,25,23,0.13)}
  .nav{position:fixed;top:0;left:0;right:0;z-index:50;height:68px;display:flex;align-items:center;justify-content:space-between;padding:0 6vw;font-family:'Jost',sans-serif;transition:background 0.35s,box-shadow 0.35s;background:transparent}
  .nav.scrolled{background:rgba(250,247,242,0.94);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);box-shadow:0 1px 0 var(--paper3),0 4px 24px var(--shadow)}
  .nav-logo{font-family:'Playfair Display',serif;font-size:1.35rem;font-weight:400;font-style:italic;color:var(--terra);text-decoration:none;display:flex;align-items:center;gap:7px;letter-spacing:0.02em;transition:opacity 0.2s}
  .nav-logo:hover{opacity:0.75}
  .nav-logo-mark{font-style:normal;font-size:0.5rem;animation:spin 14s linear infinite;display:inline-block}
  @keyframes spin{to{transform:rotate(360deg)}}
  .nav-links{display:flex;align-items:center;gap:32px;list-style:none}
  @media(max-width:640px){.nav-links{display:none}}
  .nav-link{font-size:11px;font-weight:400;letter-spacing:0.18em;text-transform:uppercase;color:var(--ink2);text-decoration:none;position:relative;padding-bottom:3px;transition:color 0.2s}
  .nav-link::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:var(--terra);transition:width 0.3s cubic-bezier(0.76,0,0.24,1)}
  .nav-link:hover{color:var(--ink)}
  .nav-link:hover::after{width:100%}
  .nav-link.active{color:var(--terra)}
  .nav-link.active::after{width:100%}
  .nav-cta{font-size:11px;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;color:#FAF7F2;text-decoration:none;padding:9px 22px;background:var(--terra);display:inline-flex;align-items:center;gap:8px;position:relative;overflow:hidden;transition:color 0.3s}
  .nav-cta::before{content:'';position:absolute;inset:0;background:var(--ink);transform:translateX(-101%);transition:transform 0.3s cubic-bezier(0.76,0,0.24,1)}
  .nav-cta:hover::before{transform:translateX(0)}
  .nav-cta span{position:relative;z-index:1}
  .nav-user{display:flex;align-items:center;gap:14px}
  .nav-username{font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:var(--ink2);display:flex;align-items:center;gap:6px}
  .nav-user-dot{width:5px;height:5px;background:var(--terra);border-radius:50%;animation:blink 2.2s ease-in-out infinite}
  @keyframes blink{0%,100%{opacity:0.35}50%{opacity:1}}
  .nav-logout{font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:var(--muted);background:none;border:none;cursor:pointer;padding-bottom:2px;position:relative;transition:color 0.2s}
  .nav-logout::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:var(--muted);transition:width 0.3s}
  .nav-logout:hover{color:var(--ink)}
  .nav-logout:hover::after{width:100%}
  .nav-ham{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:4px}
  @media(max-width:640px){.nav-ham{display:flex}}
  .nav-ham span{width:22px;height:1px;background:var(--ink2);display:block;transition:all 0.3s}
  .nav-ham.open span:nth-child(1){transform:translateY(6px) rotate(45deg);background:var(--terra)}
  .nav-ham.open span:nth-child(2){opacity:0}
  .nav-ham.open span:nth-child(3){transform:translateY(-6px) rotate(-45deg);background:var(--terra)}
  .nav-drawer{position:fixed;top:68px;left:0;right:0;z-index:49;background:rgba(250,247,242,0.97);backdrop-filter:blur(16px);border-bottom:1px solid var(--paper3);padding:32px 6vw 40px;display:flex;flex-direction:column;gap:0;box-shadow:0 12px 40px var(--shadow-md);animation:drawerIn 0.3s ease}
  @keyframes drawerIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
  .drawer-link{font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:var(--ink2);text-decoration:none;padding:20px 0;border-bottom:1px solid var(--paper3);transition:color 0.2s;background:none;border-left:none;border-right:none;font-family:'Jost',sans-serif;cursor:pointer;text-align:left}
  .drawer-link:last-child{border-bottom:none}
  .drawer-link:hover,.drawer-link.active{color:var(--terra)}
  .nav-spacer{height:68px}
`;

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const user = (() => { try { return JSON.parse(localStorage.getItem("user")); } catch { return null; } })();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const logout = () => { localStorage.removeItem("user"); localStorage.removeItem("token"); window.location.href = "/login"; };
  const active = (p) => location.pathname === p ? 'active' : '';

  return (
    <>
      <style>{CSS}</style>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="nav-logo">
          <span className="nav-logo-mark">✦</span>
          Eventara
        </Link>
        <ul className="nav-links">
          <li><Link to="/" className={`nav-link ${active('/')}`}>Home</Link></li>
          {!user && <li><Link to="/login" className={`nav-link ${active('/login')}`}>Sign in</Link></li>}
          {!user && <li><Link to="/register" className="nav-cta"><span>Join free</span><span>→</span></Link></li>}
          {user && <li><Link to="/add-event" className="nav-cta"><span>+ New event</span></Link></li>}
          {user && (
            <li className="nav-user">
              <span className="nav-username"><span className="nav-user-dot"/>{user.name?.split(' ')[0] || 'Member'}</span>
              <button className="nav-logout" onClick={logout}>Leave</button>
            </li>
          )}
        </ul>
        <button className={`nav-ham ${open ? 'open' : ''}`} onClick={() => setOpen(o => !o)}>
          <span/><span/><span/>
        </button>
      </nav>
      {open && (
        <div className="nav-drawer">
          <Link to="/" className={`drawer-link ${active('/')}`}>Home</Link>
          {!user && <Link to="/login" className={`drawer-link ${active('/login')}`}>Sign in</Link>}
          {!user && <Link to="/register" className={`drawer-link ${active('/register')}`}>Create account</Link>}
          {user && <Link to="/add-event" className={`drawer-link ${active('/add-event')}`}>+ New event</Link>}
          {user && <button className="drawer-link" onClick={logout}>Sign out</button>}
        </div>
      )}
      <div className="nav-spacer"/>
    </>
  );
}
