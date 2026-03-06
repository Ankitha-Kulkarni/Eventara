import Navbar from "../components/Navbar";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Jost:wght@300;400;500&display=swap');
  :root{--paper:#FAF7F2;--paper2:#F3EFE8;--paper3:#EDE8DF;--ink:#1C1917;--ink2:#44403C;--muted:#A8A29E;--terra:#C4622D;--terra-light:rgba(196,98,45,0.09);--terra-dim:rgba(196,98,45,0.35);--shadow:rgba(28,25,23,0.07);--shadow-md:rgba(28,25,23,0.13);--shadow-lg:rgba(28,25,23,0.2)}
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  .ed-root{background:var(--paper);color:var(--ink);min-height:100vh;font-family:'Jost',sans-serif;overflow-x:hidden}
  .ed-hero{position:relative;height:82vh;overflow:hidden}
  .ed-hero-img{width:100%;height:100%;object-fit:cover;filter:saturate(0.6) brightness(0.72);transform:scale(1.06);animation:heroZoom 20s ease-in-out infinite alternate}
  @keyframes heroZoom{from{transform:scale(1.06)}to{transform:scale(1.0)}}
  .ed-hero-grad{position:absolute;inset:0;background:linear-gradient(to top,var(--paper) 0%,rgba(250,247,242,0.55) 45%,rgba(250,247,242,0.04) 100%),linear-gradient(to right,rgba(250,247,242,0.25) 0%,transparent 65%)}
  .ed-hero-grad::after{content:'';position:absolute;left:8vw;top:0;bottom:0;width:1px;background:linear-gradient(to bottom,transparent 10%,var(--terra) 40%,transparent 90%);opacity:0.3}
  .ed-hero-content{position:absolute;bottom:64px;left:8vw;right:8vw;z-index:2;animation:fadeUp 0.9s 0.1s ease both}
  .ed-back{display:inline-flex;align-items:center;gap:10px;font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:var(--ink2);text-decoration:none;margin-bottom:32px;transition:color 0.2s}
  .ed-back:hover{color:var(--terra)}
  .ed-cat{display:inline-flex;align-items:center;gap:10px;font-size:9px;letter-spacing:0.35em;text-transform:uppercase;color:var(--terra);margin-bottom:18px}
  .ed-cat::before{content:'';width:18px;height:1px;background:var(--terra);opacity:0.7}
  .ed-title{font-family:'Playfair Display',serif;font-size:clamp(2.6rem,5.5vw,5rem);font-weight:400;line-height:1.0;color:var(--ink);margin-bottom:22px;max-width:720px}
  .ed-meta-row{display:flex;align-items:center;flex-wrap:wrap}
  .ed-meta-pill{display:flex;align-items:center;gap:8px;font-size:11px;font-weight:300;color:var(--ink2);padding-right:22px;margin-right:22px;border-right:1px solid var(--paper3)}
  .ed-meta-pill:last-child{border-right:none}
  .ed-meta-pill .dot{width:3px;height:3px;background:var(--terra);border-radius:50%;flex-shrink:0}
  .ed-body{display:grid;grid-template-columns:1fr 340px;gap:72px;padding:72px 8vw;max-width:1300px}
  @media(max-width:900px){.ed-body{grid-template-columns:1fr;gap:44px}}
  .ed-section-tag{font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:var(--terra);margin-bottom:18px;display:flex;align-items:center;gap:12px}
  .ed-section-tag::after{content:'';flex:0 0 36px;height:1px;background:var(--terra);opacity:0.35}
  .ed-desc{font-family:'Playfair Display',serif;font-size:1.15rem;font-weight:400;line-height:1.9;color:var(--ink2);margin-bottom:52px;max-width:580px}
  .ed-highlights{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--paper3);border:1px solid var(--paper3);margin-bottom:56px;animation:fadeUp 0.7s 0.4s ease both}
  .ed-highlight{background:#fff;padding:26px 22px;position:relative;transition:background 0.2s}
  .ed-highlight:hover{background:var(--paper2)}
  .ed-highlight::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(to right,var(--terra),transparent);transform:scaleX(0);transform-origin:left;transition:transform 0.4s ease}
  .ed-highlight:hover::before{transform:scaleX(1)}
  .ed-highlight-icon{font-size:1rem;margin-bottom:10px;color:var(--terra);opacity:0.7}
  .ed-highlight-label{font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted);margin-bottom:7px}
  .ed-highlight-val{font-family:'Playfair Display',serif;font-size:1.05rem;font-weight:400;color:var(--ink);line-height:1.3}
  .ed-card{background:#fff;border:1px solid var(--paper3);padding:36px 32px;position:sticky;top:100px;align-self:start;box-shadow:0 4px 24px var(--shadow);animation:fadeUp 0.8s 0.3s ease both;position:relative;overflow:hidden}
  .ed-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(to right,var(--terra),transparent);opacity:0.6}
  .ed-card-title{font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:400;font-style:italic;color:var(--ink);margin-bottom:28px;padding-bottom:22px;border-bottom:1px solid var(--paper3)}
  .ed-info-row{display:flex;justify-content:space-between;align-items:flex-start;padding:13px 0;border-bottom:1px solid var(--paper2);font-size:12px;gap:16px}
  .ed-info-row:last-of-type{border-bottom:none;margin-bottom:28px}
  .ed-info-k{color:var(--muted);letter-spacing:0.05em;flex-shrink:0}
  .ed-info-v{color:var(--ink);text-align:right;font-weight:300;line-height:1.5}
  .ed-info-v.terra{color:var(--terra);font-family:'Playfair Display',serif;font-size:1.25rem;font-style:italic}
  .btn-attend{width:100%;padding:16px;background:var(--terra);color:#FAF7F2;font-family:'Jost',sans-serif;font-size:11px;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:13px;position:relative;overflow:hidden;transition:color 0.3s;margin-bottom:12px}
  .btn-attend::before{content:'';position:absolute;inset:0;background:var(--ink);transform:translateX(-101%);transition:transform 0.35s cubic-bezier(0.76,0,0.24,1)}
  .btn-attend:hover:not(:disabled){color:var(--paper)}
  .btn-attend:hover:not(:disabled)::before{transform:translateX(0)}
  .btn-attend:disabled{opacity:0.7}
  .btn-attend-inner{position:relative;z-index:1;display:flex;align-items:center;gap:12px;transition:gap 0.2s}
  .btn-attend:hover:not(:disabled) .btn-attend-inner{gap:18px}
  .btn-save{width:100%;padding:13px;background:none;border:1px solid var(--paper3);color:var(--muted);font-family:'Jost',sans-serif;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;cursor:pointer;transition:border-color 0.25s,color 0.25s}
  .btn-save:hover{border-color:var(--terra-dim);color:var(--ink)}
  .toast{position:fixed;bottom:40px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:12px;background:#fff;border:1px solid var(--paper3);border-left:2px solid var(--terra);box-shadow:0 8px 32px var(--shadow-md);padding:15px 26px;z-index:300;font-size:12px;letter-spacing:0.05em;color:var(--ink);animation:toastIn 0.4s ease,toastOut 0.4s 3.5s ease forwards;white-space:nowrap}
  .toast-dot{width:6px;height:6px;background:var(--terra);border-radius:50%;animation:blink 1.5s ease-in-out infinite}
  @keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(14px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
  @keyframes toastOut{to{opacity:0;transform:translateX(-50%) translateY(8px)}}
  @keyframes blink{0%,100%{opacity:0.4}50%{opacity:1}}
  .ed-loading{background:var(--paper);min-height:100vh;display:flex;align-items:center;justify-content:center}
  .ed-loading-text{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:400;font-style:italic;color:var(--muted);animation:pulseOp 1.8s ease-in-out infinite}
  @keyframes pulseOp{0%,100%{opacity:0.25}50%{opacity:1}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
`;

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [saved, setSaved] = useState(false);
  const [attending, setAttending] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/events/${id}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(setEvent).catch(console.log);
  }, [id]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 4200); };

  if (!event) return (
    <>
      <style>{CSS}</style>
      <div className="ed-loading"><p className="ed-loading-text">Loading experience…</p></div>
    </>
  );

  return (
    <>
      <style>{CSS}</style>
      <div className="ed-root">
        <Navbar/>
        <section className="ed-hero">
          <img src={event.image} className="ed-hero-img" alt={event.title}/>
          <div className="ed-hero-grad"/>
          <div className="ed-hero-content">
            <Link to="/" className="ed-back">← All events</Link>
            <p className="ed-cat">{event.category||'Event'}</p>
            <h1 className="ed-title">{event.title}</h1>
            <div className="ed-meta-row">
              <span className="ed-meta-pill"><span className="dot"/>{event.date}</span>
              {event.location&&<span className="ed-meta-pill"><span className="dot"/>{event.location}</span>}
              {event.category&&<span className="ed-meta-pill"><span className="dot"/>{event.category}</span>}
            </div>
          </div>
        </section>

        <div className="ed-body">
          <div>
            <p className="ed-section-tag">About this event</p>
            <p className="ed-desc">{event.description||"No description available for this event."}</p>
            <div className="ed-highlights">
              <div className="ed-highlight">
                <div className="ed-highlight-icon">◷</div>
                <p className="ed-highlight-label">Date</p>
                <p className="ed-highlight-val">{event.date}</p>
              </div>
              <div className="ed-highlight">
                <div className="ed-highlight-icon">◈</div>
                <p className="ed-highlight-label">Category</p>
                <p className="ed-highlight-val">{event.category||'—'}</p>
              </div>
              <div className="ed-highlight">
                <div className="ed-highlight-icon">◎</div>
                <p className="ed-highlight-label">Location</p>
                <p className="ed-highlight-val">{event.location||'TBA'}</p>
              </div>
            </div>
          </div>

          <div className="ed-card" style={{position:'sticky',top:'100px',alignSelf:'start'}}>
            <p className="ed-card-title">Event details</p>
            <div className="ed-info-row"><span className="ed-info-k">Date</span><span className="ed-info-v">{event.date}</span></div>
            <div className="ed-info-row"><span className="ed-info-k">Category</span><span className="ed-info-v">{event.category||'—'}</span></div>
            <div className="ed-info-row"><span className="ed-info-k">Location</span><span className="ed-info-v">{event.location||'Not specified'}</span></div>
            {event.price&&<div className="ed-info-row"><span className="ed-info-k">Price</span><span className="ed-info-v terra">₹{event.price}</span></div>}
            <button className="btn-attend" onClick={()=>{setAttending(true);showToast("You're attending this event");}} disabled={attending}>
              <span className="btn-attend-inner"><span>{attending?'Attending ✦':'Attend event'}</span>{!attending&&<span>→</span>}</span>
            </button>
            <button className="btn-save" onClick={()=>{setSaved(s=>!s);showToast(saved?'Removed from saved':'Saved to your list');}}>
              {saved?'✦ Saved to your list':'+ Save event'}
            </button>
          </div>
        </div>

        {toast && <div className="toast"><div className="toast-dot"/>{toast}</div>}
      </div>
    </>
  );
}
