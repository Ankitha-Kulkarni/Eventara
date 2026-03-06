// EditEvent.jsx — Light Theme
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";

const SHARED_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Jost:wght@300;400;500&display=swap');
  :root{--paper:#FAF7F2;--paper2:#F3EFE8;--paper3:#EDE8DF;--ink:#1C1917;--ink2:#44403C;--muted:#A8A29E;--terra:#C4622D;--terra-light:rgba(196,98,45,0.09);--terra-dim:rgba(196,98,45,0.35);--shadow:rgba(28,25,23,0.07);--shadow-md:rgba(28,25,23,0.13)}
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  .fe-root{background:var(--paper);color:var(--ink);min-height:100vh;font-family:'Jost',sans-serif;overflow-x:hidden}
  .fe-page{position:relative;display:grid;grid-template-columns:1fr 1fr;min-height:calc(100vh - 68px)}
  @media(max-width:860px){.fe-page{grid-template-columns:1fr}}
  /* PREVIEW */
  .fe-preview{position:sticky;top:0;height:calc(100vh - 68px);overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end;padding:0 0 60px 8vw}
  @media(max-width:860px){.fe-preview{display:none}}
  .fe-preview-img-wrap{position:absolute;inset:0;z-index:0}
  .fe-preview-img{width:100%;height:100%;object-fit:cover;filter:saturate(0.55) brightness(0.75);transition:opacity 0.6s}
  .fe-preview-empty{width:100%;height:100%;background:var(--paper2);display:flex;align-items:center;justify-content:center}
  .fe-preview-empty-text{font-family:'Playfair Display',serif;font-size:0.95rem;font-style:italic;font-weight:400;color:var(--muted);letter-spacing:0.08em}
  .fe-preview-grad{position:absolute;inset:0;background:linear-gradient(to top,var(--paper) 0%,rgba(250,247,242,0.45) 50%,rgba(250,247,242,0.05) 100%),linear-gradient(to right,transparent 55%,var(--paper) 100%)}
  .fe-preview-grad::after{content:'';position:absolute;left:0;top:0;bottom:0;width:1px;background:linear-gradient(to bottom,transparent 10%,var(--terra) 45%,transparent 90%);opacity:0.3}
  .fe-progress{position:absolute;top:32px;left:8vw;display:flex;align-items:center;gap:7px;z-index:2}
  .fe-progress-step{width:22px;height:2px;border-radius:1px;background:var(--paper3);transition:background 0.4s,width 0.4s}
  .fe-progress-step.done{background:rgba(196,98,45,0.45)}
  .fe-progress-step.active{background:var(--terra);width:36px}
  .fe-preview-content{position:relative;z-index:1;animation:fadeUp 0.8s 0.2s ease both}
  .fe-preview-eyebrow{font-size:9px;letter-spacing:0.35em;text-transform:uppercase;color:var(--terra);margin-bottom:14px;display:flex;align-items:center;gap:10px}
  .fe-preview-eyebrow::before{content:'';width:18px;height:1px;background:var(--terra);opacity:0.7}
  .fe-preview-title{font-family:'Playfair Display',serif;font-size:clamp(1.6rem,2.8vw,2.7rem);font-weight:400;line-height:1.1;color:var(--ink);margin-bottom:18px;max-width:340px;transition:all 0.4s}
  .fe-preview-title em{font-style:italic;color:var(--terra)}
  .fe-preview-title .placeholder{opacity:0.3;font-style:italic}
  .fe-preview-meta{display:flex;flex-direction:column;gap:8px}
  .fe-preview-meta-item{display:flex;align-items:center;gap:8px;font-size:11px;font-weight:300;color:var(--ink2)}
  .fe-preview-meta-item .dot{width:3px;height:3px;background:var(--terra);border-radius:50%}
  /* FORM PANEL */
  .fe-form-panel{padding:68px 8vw 80px;display:flex;flex-direction:column;background:var(--paper);overflow-y:auto}
  .fe-back{display:inline-flex;align-items:center;gap:10px;font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:var(--muted);text-decoration:none;margin-bottom:48px;transition:color 0.2s;width:fit-content}
  .fe-back:hover{color:var(--terra)}
  .fe-eyebrow{font-size:9px;letter-spacing:0.35em;text-transform:uppercase;color:var(--terra);margin-bottom:14px;display:flex;align-items:center;gap:10px}
  .fe-eyebrow::before{content:'';width:20px;height:1px;background:var(--terra);opacity:0.7}
  .fe-title{font-family:'Playfair Display',serif;font-size:3rem;font-weight:400;line-height:1.0;color:var(--ink);margin-bottom:8px}
  .fe-title em{font-style:italic;color:var(--terra)}
  .fe-sub{font-size:13px;font-weight:300;color:var(--muted);margin-bottom:48px;line-height:1.6}
  .fe-form{display:flex;flex-direction:column;max-width:460px}
  .field{position:relative;margin-bottom:30px}
  .field label{display:block;font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:var(--muted);margin-bottom:10px;transition:color 0.25s}
  .field:focus-within label{color:var(--terra)}
  .field input,.field textarea{width:100%;background:none;border:none;border-bottom:1px solid var(--paper3);padding:11px 0;font-family:'Jost',sans-serif;font-size:15px;font-weight:300;color:var(--ink);outline:none;caret-color:var(--terra);transition:border-color 0.3s;resize:none}
  .field input::placeholder,.field textarea::placeholder{color:rgba(168,162,158,0.45)}
  .field input:focus,.field textarea:focus{border-bottom-color:rgba(196,98,45,0.35)}
  .field textarea{min-height:88px;line-height:1.7}
  .field-line{position:absolute;bottom:0;left:0;height:1px;background:var(--terra);width:0;transition:width 0.4s cubic-bezier(0.76,0,0.24,1)}
  .field:focus-within .field-line{width:100%}
  .field-row{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:30px}
  .field-row .field{margin-bottom:0}
  .img-fill{height:2px;background:var(--terra);border-radius:1px;margin-top:7px;opacity:0;transition:width 0.5s ease,opacity 0.3s}
  .img-fill.show{opacity:1}
  .char-count{position:absolute;right:0;bottom:-18px;font-size:9px;letter-spacing:0.1em;color:rgba(168,162,158,0.5);transition:color 0.3s}
  .char-count.warn{color:var(--terra)}
  .form-divider{height:1px;background:var(--paper3);margin:8px 0 32px}
  .btn-submit{width:100%;padding:16px;background:var(--terra);color:#FAF7F2;font-family:'Jost',sans-serif;font-size:11px;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;border:none;cursor:pointer;position:relative;overflow:hidden;transition:color 0.3s;margin-bottom:12px}
  .btn-submit::before{content:'';position:absolute;inset:0;background:var(--ink);transform:translateX(-101%);transition:transform 0.35s cubic-bezier(0.76,0,0.24,1)}
  .btn-submit:hover:not(:disabled){color:var(--paper)}
  .btn-submit:hover:not(:disabled)::before{transform:translateX(0)}
  .btn-submit:disabled{opacity:0.45}
  .btn-inner{position:relative;z-index:1;display:flex;align-items:center;justify-content:center;gap:12px;transition:gap 0.2s}
  .btn-submit:hover:not(:disabled) .btn-inner{gap:18px}
  .spinner{width:13px;height:13px;border-radius:50%;border:1.5px solid rgba(250,247,242,0.35);border-top-color:#FAF7F2;animation:spin 0.7s linear infinite}
  @keyframes spin{to{transform:rotate(360deg)}}
  .btn-discard{width:100%;padding:13px;background:none;border:1px solid var(--paper3);color:var(--muted);font-family:'Jost',sans-serif;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:border-color 0.25s,color 0.25s}
  .btn-discard:hover{border-color:var(--terra-dim);color:var(--ink)}
  .toast{position:fixed;bottom:40px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:12px;background:#fff;border:1px solid var(--paper3);border-left:2px solid var(--terra);box-shadow:0 8px 32px var(--shadow-md);padding:15px 26px;z-index:300;font-size:12px;letter-spacing:0.05em;color:var(--ink);animation:toastIn 0.4s ease,toastOut 0.4s 3.5s ease forwards;white-space:nowrap}
  .toast-dot{width:6px;height:6px;background:var(--terra);border-radius:50%;animation:blink 1.5s ease-in-out infinite}
  @keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(14px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
  @keyframes toastOut{to{opacity:0;transform:translateX(-50%) translateY(8px)}}
  @keyframes blink{0%,100%{opacity:0.4}50%{opacity:1}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
`;

const FALLBACK = "https://images.unsplash.com/photo-1505238680356-667803448bb6";
const FIELDS_EDIT = ['title','date','category','image','description','price'];

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title:"",date:"",category:"",image:"",description:"",price:"" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [imgErr, setImgErr] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/events/${id}`).then(r=>r.json()).then(setForm).catch(console.log);
  }, [id]);

  const handleChange = (e) => {
    const {name,value}=e.target;
    setForm(f=>({...f,[name]:value}));
    if(name==='image') setImgErr(false);
  };

  const filledCount = FIELDS_EDIT.filter(k=>form[k]?.toString().trim()).length;
  const imgFillPct = Math.min((form.image.length/60)*100,100);
  const previewImg = !imgErr && form.image ? form.image : FALLBACK;

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(""),4200); };

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      await fetch(`http://localhost:5000/events/${id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
      showToast("Event updated successfully");
      setTimeout(()=>navigate(`/events/${id}`),1400);
    } catch { showToast("Something went wrong."); setLoading(false); }
  };

  return (
    <>
      <style>{SHARED_CSS}</style>
      <div className="fe-root">
        <Navbar/>
        <div className="fe-page">
          {/* PREVIEW */}
          <div className="fe-preview">
            <div className="fe-progress">
              {FIELDS_EDIT.map((f,i)=>(
                <div key={f} className={`fe-progress-step ${i<filledCount?'done':i===filledCount?'active':''}`}/>
              ))}
            </div>
            <div className="fe-preview-img-wrap">
              <img src={previewImg} className="fe-preview-img" alt="" onError={()=>setImgErr(true)}/>
              <div className="fe-preview-grad"/>
            </div>
            <div className="fe-preview-content">
              <p className="fe-preview-eyebrow">Live preview</p>
              <h2 className="fe-preview-title">
                {form.title?<em>{form.title}</em>:<span className="placeholder">Event title</span>}
              </h2>
              <div className="fe-preview-meta">
                {form.date&&<span className="fe-preview-meta-item"><span className="dot"/>{form.date}</span>}
                {form.category&&<span className="fe-preview-meta-item"><span className="dot"/>{form.category}</span>}
                {form.price&&<span className="fe-preview-meta-item"><span className="dot"/>₹{form.price}</span>}
              </div>
            </div>
          </div>
          {/* FORM */}
          <div className="fe-form-panel">
            <Link to={`/events/${id}`} className="fe-back">← Back to event</Link>
            <p className="fe-eyebrow">✦ Editing</p>
            <h1 className="fe-title">Update <em>event</em></h1>
            <p className="fe-sub">Changes will be reflected immediately.</p>
            <div className="fe-form">
              <div className="field">
                <label>Event title</label>
                <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. The Grand Symphony"/>
                <div className="field-line"/>
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Date</label>
                  <input name="date" value={form.date} onChange={handleChange} placeholder="e.g. 12 March 2026"/>
                  <div className="field-line"/>
                </div>
                <div className="field">
                  <label>Category</label>
                  <input name="category" value={form.category} onChange={handleChange} placeholder="e.g. Theatre"/>
                  <div className="field-line"/>
                </div>
              </div>
              <div className="field">
                <label>Image URL</label>
                <input name="image" value={form.image} onChange={handleChange} placeholder="https://..."/>
                <div className="field-line"/>
                <div className={`img-fill ${form.image.length>0?'show':''}`} style={{width:`${imgFillPct}%`}}/>
              </div>
              <div className="field" style={{position:'relative'}}>
                <label>Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Tell your audience what to expect…"/>
                <div className="field-line"/>
                {form.description.length>0&&<span className={`char-count ${form.description.length>400?'warn':''}`}>{form.description.length}</span>}
              </div>
              <div className="field">
                <label>Price per seat (₹)</label>
                <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="e.g. 500"/>
                <div className="field-line"/>
              </div>
              <div className="form-divider"/>
              <button className="btn-submit" onClick={handleSubmit} disabled={loading}>
                <span className="btn-inner">{loading?<><div className="spinner"/>Saving changes</>:<>Save changes →</>}</span>
              </button>
              <Link to={`/events/${id}`} className="btn-discard">Discard changes</Link>
            </div>
          </div>
        </div>
        {toast&&<div className="toast"><div className="toast-dot"/>{toast}</div>}
      </div>
    </>
  );
}
