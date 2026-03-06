import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Jost:wght@300;400;500&display=swap');
  :root {
    --paper:#FAF7F2; --paper2:#F3EFE8; --paper3:#EDE8DF;
    --ink:#1C1917; --ink2:#44403C; --muted:#A8A29E;
    --terra:#C4622D; --terra-light:rgba(196,98,45,0.09); --terra-dim:rgba(196,98,45,0.35);
    --shadow:rgba(28,25,23,0.07); --shadow-md:rgba(28,25,23,0.13); --shadow-lg:rgba(28,25,23,0.2);
  }
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  .ep-root{background:var(--paper);color:var(--ink);min-height:100vh;font-family:'Jost',sans-serif;overflow-x:hidden}
  /* HERO */
  .ep-hero{position:relative;height:82vh;overflow:hidden}
  .ep-hero-img{width:100%;height:100%;object-fit:cover;filter:saturate(0.6) brightness(0.72);transform:scale(1.06);animation:heroZoom 20s ease-in-out infinite alternate}
  @keyframes heroZoom{from{transform:scale(1.06)}to{transform:scale(1.0)}}
  .ep-hero-grad{position:absolute;inset:0;background:linear-gradient(to top,var(--paper) 0%,rgba(250,247,242,0.55) 45%,rgba(250,247,242,0.05) 100%),linear-gradient(to right,rgba(250,247,242,0.3) 0%,transparent 65%)}
  .ep-hero-grad::after{content:'';position:absolute;left:8vw;top:0;bottom:0;width:1px;background:linear-gradient(to bottom,transparent 10%,var(--terra) 40%,transparent 90%);opacity:0.3}
  .ep-hero-content{position:absolute;bottom:64px;left:8vw;right:8vw;z-index:2;animation:fadeUp 0.9s 0.1s ease both}
  .ep-back{display:inline-flex;align-items:center;gap:10px;font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:var(--ink2);text-decoration:none;margin-bottom:32px;transition:color 0.2s}
  .ep-back:hover{color:var(--terra)}
  .ep-cat{display:inline-flex;align-items:center;gap:10px;font-size:9px;letter-spacing:0.35em;text-transform:uppercase;color:var(--terra);margin-bottom:18px}
  .ep-cat::before{content:'';width:18px;height:1px;background:var(--terra);opacity:0.7}
  .ep-title{font-family:'Playfair Display',serif;font-size:clamp(2.6rem,5.5vw,5rem);font-weight:400;line-height:1.0;letter-spacing:-0.01em;color:var(--ink);margin-bottom:22px;max-width:720px}
  .ep-meta-row{display:flex;align-items:center;flex-wrap:wrap}
  .ep-meta-pill{display:flex;align-items:center;gap:8px;font-size:11px;font-weight:300;color:var(--ink2);padding-right:22px;margin-right:22px;border-right:1px solid var(--paper3)}
  .ep-meta-pill:last-child{border-right:none}
  .ep-meta-pill .dot{width:3px;height:3px;background:var(--terra);border-radius:50%;flex-shrink:0}
  /* BODY */
  .ep-body{display:grid;grid-template-columns:1fr 340px;gap:72px;padding:72px 8vw;max-width:1300px}
  @media(max-width:900px){.ep-body{grid-template-columns:1fr;gap:44px}}
  .ep-section-tag{font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:var(--terra);margin-bottom:18px;display:flex;align-items:center;gap:12px}
  .ep-section-tag::after{content:'';flex:0 0 36px;height:1px;background:var(--terra);opacity:0.35}
  .ep-desc{font-family:'Playfair Display',serif;font-size:1.15rem;font-weight:400;line-height:1.9;color:var(--ink2);margin-bottom:52px;max-width:580px}
  .ep-actions{display:flex;gap:12px;flex-wrap:wrap}
  .btn-book{display:inline-flex;align-items:center;gap:13px;padding:15px 36px;background:var(--terra);color:#FAF7F2;font-family:'Jost',sans-serif;font-size:11px;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;border:none;cursor:pointer;position:relative;overflow:hidden;transition:color 0.3s}
  .btn-book::before{content:'';position:absolute;inset:0;background:var(--ink);transform:translateX(-101%);transition:transform 0.35s cubic-bezier(0.76,0,0.24,1)}
  .btn-book:hover{color:var(--paper)}
  .btn-book:hover::before{transform:translateX(0)}
  .btn-book span{position:relative;z-index:1}
  .btn-book-inner{position:relative;z-index:1;display:flex;align-items:center;gap:12px;transition:gap 0.2s}
  .btn-book:hover .btn-book-inner{gap:18px}
  .btn-ghost{display:inline-flex;align-items:center;padding:15px 22px;background:none;border:1px solid var(--paper3);color:var(--ink2);font-family:'Jost',sans-serif;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;cursor:pointer;transition:border-color 0.25s,color 0.25s}
  .btn-ghost:hover{border-color:var(--terra-dim);color:var(--ink)}
  .btn-del{display:inline-flex;align-items:center;padding:15px 22px;background:none;border:1px solid rgba(180,80,50,0.2);color:rgba(180,80,50,0.6);font-family:'Jost',sans-serif;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;cursor:pointer;transition:border-color 0.25s,color 0.25s}
  .btn-del:hover{border-color:var(--terra-dim);color:var(--terra)}
  /* INFO CARD */
  .ep-card{background:#fff;border:1px solid var(--paper3);padding:36px 32px;position:sticky;top:100px;align-self:start;box-shadow:0 4px 24px var(--shadow);animation:fadeUp 0.8s 0.3s ease both;position:relative;overflow:hidden}
  .ep-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(to right,var(--terra),transparent);opacity:0.6}
  .ep-card-header{font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:400;font-style:italic;color:var(--ink);margin-bottom:28px;padding-bottom:22px;border-bottom:1px solid var(--paper3)}
  .ep-stat{display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid var(--paper2);font-size:12px}
  .ep-stat:last-of-type{border-bottom:none}
  .ep-stat-k{color:var(--muted);letter-spacing:0.05em}
  .ep-stat-v{color:var(--ink);font-weight:400}
  .ep-stat-v.terra{color:var(--terra);font-family:'Playfair Display',serif;font-size:1.2rem;font-style:italic}
  .avail-section{margin:24px 0}
  .avail-labels{display:flex;justify-content:space-between;font-size:9px;letter-spacing:0.15em;text-transform:uppercase;color:var(--muted);margin-bottom:10px}
  .avail-track{height:2px;background:var(--paper3);border-radius:1px;overflow:hidden}
  .avail-fill{height:100%;background:var(--terra);border-radius:1px;transition:width 0.8s cubic-bezier(0.34,1.56,0.64,1)}
  .ep-card .btn-book{width:100%;justify-content:center;margin-top:24px}
  /* LOADING */
  .ep-loading{background:var(--paper);min-height:100vh;display:flex;align-items:center;justify-content:center}
  .ep-loading p{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:400;font-style:italic;color:var(--muted);animation:pulseOp 1.8s ease-in-out infinite}
  @keyframes pulseOp{0%,100%{opacity:0.25}50%{opacity:1}}
  /* MODALS */
  .modal-bg{position:fixed;inset:0;background:rgba(28,25,23,0.5);display:flex;align-items:center;justify-content:center;z-index:200;padding:20px;animation:fadeIn 0.3s ease}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  .modal{background:var(--paper);border:1px solid var(--paper3);padding:48px;width:100%;max-width:620px;max-height:90vh;overflow-y:auto;box-shadow:0 32px 80px var(--shadow-lg);animation:modalIn 0.4s cubic-bezier(0.34,1.56,0.64,1);position:relative}
  .modal::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(to right,var(--terra),transparent);opacity:0.6}
  @keyframes modalIn{from{opacity:0;transform:translateY(28px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
  .modal-close{position:absolute;top:20px;right:24px;background:none;border:none;color:var(--muted);font-size:18px;cursor:pointer;transition:color 0.2s;line-height:1}
  .modal-close:hover{color:var(--ink)}
  .modal-tag{font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:var(--terra);margin-bottom:10px}
  .modal-title{font-family:'Playfair Display',serif;font-size:1.9rem;font-weight:400;color:var(--ink);margin-bottom:36px;line-height:1.15}
  .screen-wrap{margin-bottom:36px;text-align:center}
  .screen-bar{height:1px;width:55%;margin:0 auto 10px;background:linear-gradient(to right,transparent,var(--paper3),transparent)}
  .screen-label{font-size:8px;letter-spacing:0.35em;text-transform:uppercase;color:var(--muted)}
  .seat-grid{display:grid;grid-template-columns:repeat(8,1fr);gap:8px;margin-bottom:28px}
  .seat{aspect-ratio:1;border-radius:3px 3px 1px 1px;cursor:pointer;transition:transform 0.2s,background 0.2s,box-shadow 0.2s;position:relative}
  .seat::after{content:'';position:absolute;bottom:0;left:15%;right:15%;height:2px;border-radius:0 0 2px 2px;background:rgba(28,25,23,0.1)}
  .seat.avail{background:rgba(196,98,45,0.08);border:1px solid rgba(196,98,45,0.2)}
  .seat.avail:hover{background:rgba(196,98,45,0.2);border-color:rgba(196,98,45,0.45);transform:translateY(-3px);box-shadow:0 6px 16px rgba(196,98,45,0.15)}
  .seat.sel{background:var(--terra);border:1px solid var(--terra);transform:translateY(-4px);box-shadow:0 8px 20px rgba(196,98,45,0.3)}
  .seat.taken{background:var(--paper2);border:1px solid var(--paper3);cursor:not-allowed;opacity:0.5}
  .seat-legend{display:flex;gap:24px;justify-content:center;margin-bottom:32px}
  .legend-item{display:flex;align-items:center;gap:8px;font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted)}
  .legend-swatch{width:13px;height:13px;border-radius:2px}
  .price-block{border-top:1px solid var(--paper3);padding-top:24px;margin-bottom:28px}
  .price-row{display:flex;justify-content:space-between;font-size:12px;color:var(--muted);margin-bottom:10px}
  .price-total{display:flex;justify-content:space-between;align-items:baseline;margin-top:18px;padding-top:18px;border-top:1px solid var(--paper3)}
  .price-total-label{font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted)}
  .price-total-amount{font-family:'Playfair Display',serif;font-size:2.1rem;font-weight:400;font-style:italic;color:var(--terra)}
  .modal-actions{display:flex;gap:12px}
  .btn-confirm{flex:1;padding:15px;background:var(--terra);color:#FAF7F2;font-family:'Jost',sans-serif;font-size:11px;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;border:none;cursor:pointer;position:relative;overflow:hidden;transition:color 0.3s}
  .btn-confirm::before{content:'';position:absolute;inset:0;background:var(--ink);transform:translateX(-101%);transition:transform 0.35s cubic-bezier(0.76,0,0.24,1)}
  .btn-confirm:hover:not(:disabled){color:var(--paper)}
  .btn-confirm:hover:not(:disabled)::before{transform:translateX(0)}
  .btn-confirm:disabled{opacity:0.4}
  .btn-confirm-inner{position:relative;z-index:1}
  .btn-cancel{padding:15px 22px;background:none;border:1px solid var(--paper3);color:var(--muted);font-family:'Jost',sans-serif;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;cursor:pointer;transition:border-color 0.2s,color 0.2s}
  .btn-cancel:hover{border-color:var(--terra-dim);color:var(--ink)}
  /* DELETE MODAL */
  .del-modal{background:var(--paper);border:1px solid var(--paper3);padding:48px;width:100%;max-width:420px;text-align:center;box-shadow:0 32px 80px var(--shadow-lg);animation:modalIn 0.35s ease;position:relative}
  .del-modal::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(to right,#b84a2a,transparent);opacity:0.5}
  .del-icon{font-size:2rem;margin-bottom:18px;color:var(--terra);opacity:0.5}
  .del-title{font-family:'Playfair Display',serif;font-size:1.9rem;font-weight:400;color:var(--ink);margin-bottom:12px}
  .del-sub{font-size:13px;font-weight:300;color:var(--muted);line-height:1.7;margin-bottom:32px}
  .del-actions{display:flex;gap:12px;justify-content:center}
  .btn-del-confirm{padding:14px 28px;background:rgba(184,74,42,0.9);color:#fff;font-family:'Jost',sans-serif;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;border:1px solid rgba(196,98,45,0.3);cursor:pointer;transition:background 0.2s}
  .btn-del-confirm:hover{background:#b84a2a}
  /* TOAST */
  .toast{position:fixed;bottom:40px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:12px;background:#fff;border:1px solid var(--paper3);border-left:2px solid var(--terra);box-shadow:0 8px 32px var(--shadow-md);padding:15px 26px;z-index:300;font-size:12px;letter-spacing:0.05em;color:var(--ink);animation:toastIn 0.4s ease,toastOut 0.4s 3.5s ease forwards;white-space:nowrap}
  .toast-dot{width:6px;height:6px;background:var(--terra);border-radius:50%;animation:blink 1.5s ease-in-out infinite}
  @keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(14px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
  @keyframes toastOut{to{opacity:0;transform:translateX(-50%) translateY(8px)}}
  @keyframes blink{0%,100%{opacity:0.4}50%{opacity:1}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
`;

export default function EventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [showSeats, setShowSeats] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showDel, setShowDel] = useState(false);
  const [booked, setBooked] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const ticketPrice = event?.price || 200;
  const totalSeats = event?.seats?.length || 0;
  const bookedCount = event?.seats?.filter(Boolean).length || 0;
  const availCount = totalSeats - bookedCount;

  useEffect(() => {
    fetch(`http://localhost:5000/events/${id}`).then(r => r.json()).then(setEvent).catch(console.log);
  }, [id]);

  const handleOpenBooking = () => {
    if (!localStorage.getItem("token")) { navigate("/login"); return; }
    setShowSeats(true);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/events/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", ...(token && { "Authorization": `Bearer ${token}` }) },
      });
      if (res.ok) { navigate("/"); }
      else {
        setShowDel(false);
        setDeleteError("Delete failed — make sure you're logged in.");
        setTimeout(() => setDeleteError(""), 4200);
      }
    } catch {
      setShowDel(false);
      setDeleteError("Network error. Please try again.");
      setTimeout(() => setDeleteError(""), 4200);
    }
  };

  const toggleSeat = (i) => {
    if (event.seats[i]) return;
    setSelectedSeats(p => p.includes(i) ? p.filter(s => s !== i) : [...p, i]);
  };

  const handleBooking = async () => {
    const res = await fetch(`http://localhost:5000/events/book/${id}`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seats: selectedSeats }),
    });
    const data = await res.json();
    setEvent(data); setSelectedSeats([]); setShowSeats(false);
    setBooked(true); setTimeout(() => setBooked(false), 4200);
  };

  if (!event) return (
    <>
      <style>{CSS}</style>
      <div className="ep-loading"><p>Loading experience…</p></div>
    </>
  );

  const availPct = totalSeats > 0 ? (availCount / totalSeats) * 100 : 0;

  return (
    <>
      <style>{CSS}</style>
      <div className="ep-root">
        <Navbar/>

        {/* HERO */}
        <section className="ep-hero">
          <img src={event.image} className="ep-hero-img" alt={event.title}/>
          <div className="ep-hero-grad"/>
          <div className="ep-hero-content">
            <Link to="/" className="ep-back">← All events</Link>
            <p className="ep-cat">{event.category || 'Event'}</p>
            <h1 className="ep-title">{event.title}</h1>
            <div className="ep-meta-row">
              <span className="ep-meta-pill"><span className="dot"/>{event.date}</span>
              {event.location && <span className="ep-meta-pill"><span className="dot"/>{event.location}</span>}
              <span className="ep-meta-pill"><span className="dot"/>₹{ticketPrice} per seat</span>
              <span className="ep-meta-pill"><span className="dot"/>{availCount} seats left</span>
            </div>
          </div>
        </section>

        {/* BODY */}
        <div className="ep-body">
          <div>
            <p className="ep-section-tag">About this event</p>
            <p className="ep-desc">{event.description}</p>
            <div className="ep-actions">
              <button className="btn-book" onClick={handleOpenBooking}>
                <span className="btn-book-inner"><span>Reserve seats</span><span>→</span></span>
              </button>
              <Link to={`/edit-event/${event._id}`} className="btn-ghost">Edit</Link>
              <button className="btn-del" onClick={() => setShowDel(true)}>Delete</button>
            </div>
          </div>

          <div className="ep-card" style={{position:'sticky',top:'100px',alignSelf:'start'}}>
            <p className="ep-card-header">Event details</p>
            <div className="ep-stat"><span className="ep-stat-k">Date</span><span className="ep-stat-v">{event.date}</span></div>
            <div className="ep-stat"><span className="ep-stat-k">Category</span><span className="ep-stat-v">{event.category||'—'}</span></div>
            {event.location && <div className="ep-stat"><span className="ep-stat-k">Location</span><span className="ep-stat-v">{event.location}</span></div>}
            <div className="ep-stat"><span className="ep-stat-k">Price</span><span className="ep-stat-v terra">₹{ticketPrice}</span></div>
            <div className="ep-stat"><span className="ep-stat-k">Available</span><span className="ep-stat-v">{availCount} / {totalSeats}</span></div>
            <div className="avail-section">
              <div className="avail-labels"><span>Seats</span><span>{Math.round(availPct)}% available</span></div>
              <div className="avail-track"><div className="avail-fill" style={{width:`${availPct}%`}}/></div>
            </div>
            <button className="btn-book" style={{width:'100%',justifyContent:'center'}} onClick={handleOpenBooking}>
              <span className="btn-book-inner"><span>Reserve seats</span><span>→</span></span>
            </button>
          </div>
        </div>

        {/* SEAT MODAL */}
        {showSeats && (
          <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&(setShowSeats(false),setSelectedSeats([]))}>
            <div className="modal">
              <button className="modal-close" onClick={()=>{setShowSeats(false);setSelectedSeats([]);}}>✕</button>
              <p className="modal-tag">✦ Select your seats</p>
              <h2 className="modal-title">{event.title}</h2>
              <div className="screen-wrap">
                <div className="screen-bar"/>
                <p className="screen-label">Screen</p>
              </div>
              <div className="seat-grid">
                {(event.seats||[]).map((s,i)=>{
                  const isSel=selectedSeats.includes(i);
                  return <div key={i} onClick={()=>toggleSeat(i)} className={`seat ${s?'taken':isSel?'sel':'avail'}`} title={s?'Booked':isSel?'Selected':'Available'}/>;
                })}
              </div>
              <div className="seat-legend">
                <div className="legend-item"><div className="legend-swatch" style={{background:'rgba(196,98,45,0.08)',border:'1px solid rgba(196,98,45,0.2)'}}/>Available</div>
                <div className="legend-item"><div className="legend-swatch" style={{background:'var(--terra)'}}/>Selected</div>
                <div className="legend-item"><div className="legend-swatch" style={{background:'var(--paper2)',border:'1px solid var(--paper3)'}}/>Booked</div>
              </div>
              <div className="price-block">
                <div className="price-row"><span>Seats selected</span><span>{selectedSeats.length}</span></div>
                <div className="price-row"><span>Price per seat</span><span>₹{ticketPrice}</span></div>
                <div className="price-total">
                  <span className="price-total-label">Total amount</span>
                  <span className="price-total-amount">₹{(selectedSeats.length*ticketPrice).toLocaleString()}</span>
                </div>
              </div>
              <div className="modal-actions">
                <button className="btn-cancel" onClick={()=>{setShowSeats(false);setSelectedSeats([]);}}>Cancel</button>
                <button className="btn-confirm" onClick={handleBooking} disabled={selectedSeats.length===0}>
                  <span className="btn-confirm-inner">Confirm booking →</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DELETE MODAL */}
        {showDel && (
          <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&setShowDel(false)}>
            <div className="del-modal">
              <div className="del-icon">◌</div>
              <h3 className="del-title">Delete event?</h3>
              <p className="del-sub">This action is permanent. All booking data for this event will be lost.</p>
              <div className="del-actions">
                <button className="btn-cancel" onClick={()=>setShowDel(false)}>Cancel</button>
                <button className="btn-del-confirm" onClick={handleDelete}>Delete permanently</button>
              </div>
            </div>
          </div>
        )}

        {booked && <div className="toast"><div className="toast-dot"/>Seats reserved successfully</div>}
        {deleteError && <div className="toast" style={{borderLeftColor:'#b84a2a'}}><div className="toast-dot" style={{background:'#b84a2a'}}/>{deleteError}</div>}
      </div>
    </>
  );
}
