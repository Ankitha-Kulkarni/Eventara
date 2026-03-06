import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Jost:wght@300;400;500&display=swap');
  :root {
    --paper:#FAF7F2; --paper2:#F3EFE8; --paper3:#EDE8DF;
    --ink:#1C1917; --ink2:#44403C; --muted:#A8A29E;
    --terra:#C4622D; --terra-light:rgba(196,98,45,0.09); --terra-dim:rgba(196,98,45,0.35);
    --shadow:rgba(28,25,23,0.07);
  }
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  .rr-root{min-height:100vh;background:var(--paper);display:flex;font-family:'Jost',sans-serif;color:var(--ink);overflow:hidden}
  .rr-root::before{content:'';position:fixed;inset:0;z-index:0;pointer-events:none;opacity:0.025;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:200px}
  .rr-left{display:none;position:relative;width:50%;overflow:hidden}
  @media(min-width:768px){.rr-left{display:block}}
  .rr-left img{width:100%;height:100%;object-fit:cover;filter:saturate(0.55) brightness(0.78);transform:scale(1.04);animation:imgPan 20s ease-in-out infinite alternate}
  @keyframes imgPan{from{transform:scale(1.04) translateX(0)}to{transform:scale(1.04) translateX(3%)}}
  .rr-left-overlay{position:absolute;inset:0;background:linear-gradient(to right,transparent 55%,var(--paper) 100%),linear-gradient(to top,rgba(250,247,242,0.5) 0%,transparent 50%)}
  .rr-left-content{position:absolute;bottom:64px;left:52px;right:52px;z-index:2;animation:fadeUp 0.9s 0.3s ease both}
  .rr-left-content::before{content:'';display:block;width:32px;height:1px;background:var(--terra);margin-bottom:22px;opacity:0.8}
  .rr-left-tag{font-size:9px;letter-spacing:0.35em;text-transform:uppercase;color:var(--terra);margin-bottom:16px}
  .rr-left-quote{font-family:'Playfair Display',serif;font-size:1.85rem;font-weight:400;font-style:italic;line-height:1.25;color:var(--ink);margin-bottom:18px}
  .rr-left-meta{font-size:11px;color:var(--muted);letter-spacing:0.06em}
  .rr-num{position:absolute;left:16px;top:50%;transform:translateY(-50%) rotate(-90deg);font-family:'Playfair Display',serif;font-size:11rem;font-weight:400;font-style:italic;color:rgba(196,98,45,0.05);line-height:1;pointer-events:none;white-space:nowrap}
  .rr-right{flex:1;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding:60px 8vw;position:relative;z-index:1;background:var(--paper);overflow-y:auto}
  .back-link{position:absolute;top:36px;left:8vw;font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:var(--muted);text-decoration:none;display:flex;align-items:center;gap:8px;transition:color 0.2s}
  .back-link:hover{color:var(--terra)}
  .form-wrap{width:100%;max-width:380px;animation:fadeUp 0.8s 0.1s ease both}
  .form-tag{font-size:9px;letter-spacing:0.35em;text-transform:uppercase;color:var(--terra);margin-bottom:18px;display:flex;align-items:center;gap:10px}
  .form-tag::before{content:'';width:22px;height:1px;background:var(--terra);opacity:0.7}
  .form-title{font-family:'Playfair Display',serif;font-size:3.6rem;font-weight:400;line-height:1.0;color:var(--ink);margin-bottom:8px}
  .form-title em{font-style:italic;color:var(--terra)}
  .form-sub{font-size:13px;font-weight:300;color:var(--muted);margin-bottom:44px;line-height:1.7}
  .field{position:relative;margin-bottom:30px}
  .field label{display:block;font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:var(--muted);margin-bottom:10px;transition:color 0.25s}
  .field:focus-within label{color:var(--terra)}
  .field input{width:100%;background:none;border:none;border-bottom:1px solid var(--paper3);padding:11px 0;font-family:'Jost',sans-serif;font-size:15px;font-weight:300;color:var(--ink);outline:none;caret-color:var(--terra);transition:border-color 0.3s}
  .field input::placeholder{color:rgba(168,162,158,0.55)}
  .field input:focus{border-bottom-color:rgba(196,98,45,0.35)}
  .field-line{position:absolute;bottom:0;left:0;height:1px;background:var(--terra);width:0;transition:width 0.4s cubic-bezier(0.76,0,0.24,1)}
  .field:focus-within .field-line{width:100%}
  .strength{margin-top:12px}
  .strength-bars{display:flex;gap:5px;margin-bottom:6px}
  .s-bar{flex:1;height:2px;background:var(--paper3);border-radius:1px;transition:background 0.5s}
  .strength-label{font-size:9px;letter-spacing:0.15em;text-transform:uppercase;transition:color 0.3s}
  .error{font-size:12px;color:#b84a2a;padding:12px 16px;border-left:2px solid #b84a2a;background:rgba(196,98,45,0.06);margin-bottom:24px;animation:fadeUp 0.3s ease}
  .terms{font-size:11px;font-weight:300;color:rgba(168,162,158,0.7);line-height:1.7;margin-bottom:28px}
  .submit-btn{width:100%;padding:16px;background:var(--terra);color:#FAF7F2;font-family:'Jost',sans-serif;font-size:11px;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;border:none;cursor:pointer;margin-bottom:28px;position:relative;overflow:hidden;transition:color 0.3s}
  .submit-btn::before{content:'';position:absolute;inset:0;background:var(--ink);transform:translateX(-101%);transition:transform 0.35s cubic-bezier(0.76,0,0.24,1)}
  .submit-btn:hover:not(:disabled){color:var(--paper)}
  .submit-btn:hover:not(:disabled)::before{transform:translateX(0)}
  .submit-btn:disabled{opacity:0.45}
  .btn-inner{position:relative;z-index:1;display:flex;align-items:center;justify-content:center;gap:12px;transition:gap 0.2s}
  .submit-btn:hover:not(:disabled) .btn-inner{gap:18px}
  .spinner{width:13px;height:13px;border-radius:50%;border:1.5px solid rgba(250,247,242,0.35);border-top-color:#FAF7F2;animation:spin 0.7s linear infinite}
  @keyframes spin{to{transform:rotate(360deg)}}
  .divider{display:flex;align-items:center;gap:16px;margin-bottom:24px}
  .divider::before,.divider::after{content:'';flex:1;height:1px;background:var(--paper3)}
  .divider span{font-size:9px;color:var(--muted);letter-spacing:0.2em;text-transform:uppercase}
  .login-line{font-size:13px;font-weight:300;color:var(--muted)}
  .login-line a{color:var(--terra);text-decoration:none;border-bottom:1px solid transparent;transition:border-color 0.2s}
  .login-line a:hover{border-bottom-color:var(--terra-dim)}
  @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
`;

const sColors = ['','#b84a2a','#c9a84c','#7a9e5a','#4a9e7a'];
const sLabels = ['','Weak','Fair','Good','Strong'];
function getStr(p){let s=0;if(p.length>=8)s++;if(/[A-Z]/.test(p))s++;if(/[0-9]/.test(p))s++;if(/[^A-Za-z0-9]/.test(p))s++;return s;}

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [str, setStr] = useState(0);

  const handleChange = (e) => {
    const {name,value} = e.target;
    setForm({...form,[name]:value}); setError("");
    if(name==='password') setStr(getStr(value));
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { setError("Please enter your full name."); return; }
    if (!isValidEmail(form.email)) { setError("Please enter a valid email address."); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
      const data = await res.json();
      if(res.ok) navigate("/login"); else setError(data.message||"Registration failed");
    } catch { setError("Unable to connect."); } finally { setLoading(false); }
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="rr-root">
        <div className="rr-left">
          <div className="rr-num">02</div>
          <img src="https://images.unsplash.com/photo-1492724441997-5dc865305da7" alt=""/>
          <div className="rr-left-overlay"/>
          <div className="rr-left-content">
            <p className="rr-left-tag">✦ Begin your journey</p>
            <p className="rr-left-quote">"Every great evening begins with a decision."</p>
            <p className="rr-left-meta">Events · Experiences · Memories</p>
          </div>
        </div>
        <div className="rr-right">
          <Link to="/" className="back-link">← Return to events</Link>
          <div className="form-wrap">
            <p className="form-tag">New member</p>
            <h1 className="form-title">Create an<br/><em>account</em></h1>
            <p className="form-sub">Join a community of curious event-goers.</p>
            <div className="field">
              <label>Full name</label>
              <input type="text" name="name" placeholder="Jane Smith" value={form.name} onChange={handleChange} autoComplete="name"/>
              <div className="field-line"/>
            </div>
            <div className="field">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                onBlur={() => {
                  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
                    setError("Please enter a valid email address.");
                }}
                style={form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
                  ? { borderBottomColor: '#b84a2a' } : {}}
              />
              <div className="field-line"/>
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} autoComplete="new-password"/>
              <div className="field-line"/>
              {form.password.length > 0 && (
                <div className="strength">
                  <div className="strength-bars">
                    {[1,2,3,4].map(i=><div key={i} className="s-bar" style={{background:str>=i?sColors[str]:undefined}}/>)}
                  </div>
                  <span className="strength-label" style={{color:sColors[str]}}>{sLabels[str]}</span>
                </div>
              )}
            </div>
            {error && <div className="error">{error}</div>}
            <p className="terms">By creating an account, you agree to our Terms of Service and Privacy Policy.</p>
            <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
              <span className="btn-inner">{loading?<><div className="spinner"/>Creating account</>:<>Create account →</>}</span>
            </button>
            <div className="divider"><span>or</span></div>
            <p className="login-line">Already have an account? <Link to="/login">Sign in</Link></p>
          </div>
        </div>
      </div>
    </>
  );
}
