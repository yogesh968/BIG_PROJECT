import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { 
  UtensilsCrossed as LogoIcon, 
  Search, 
  Bell, 
  User, 
  LogOut, 
  MapPin, 
  Star, 
  Clock, 
  CreditCard, 
  Award, 
  ChevronRight, 
  Calendar, 
  Target,
  Sparkles,
  Zap,
  Coffee,
  Pizza,
  Store,
  ArrowRight,
  Menu as MenuIcon,
  X,
  Plus,
  Minus,
  MessageCircle,
  Heart,
  TrendingUp,
  ShieldCheck,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE = 'http://localhost:5001/api';

/* ═══ IMAGES ═══ */
const RESTAURANT_IMAGES:Record<string, string> = {
  'Aurélien': '/images/aurelien_french_dining_1776609755659.png',
  'Sakura House': '/images/omakase_sushi_luxury_1776610014582.png',
  'Botanica': '/images/botanica_garden_dining_1776610219931.png',
  'default': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200'
};

/* ═══ CONTEXTS ═══ */
interface UserType { id: string; name: string; email: string; role: 'CUSTOMER' | 'OWNER'; }
const AuthContext = createContext<{ user: UserType|null, token: string|null, login: (u:UserType, t:string)=>void, logout: ()=>void }>({ user:null, token:null, login:()=>{}, logout:()=>{} });
const ToastContext = createContext<{ addToast: (m:string)=>void }>({ addToast:()=>{} });

const AuthProvider = ({children}:{children:ReactNode}) => {
  const [user, setUser] = useState<UserType|null>(() => JSON.parse(localStorage.getItem('dr_user')||'null'));
  const [token, setToken] = useState<string|null>(() => localStorage.getItem('dr_token'));
  
  const login = (u:UserType, t:string) => { 
    setUser(u); setToken(t); 
    localStorage.setItem('dr_user', JSON.stringify(u)); 
    localStorage.setItem('dr_token', t);
  };
  const logout = () => { setUser(null); setToken(null); localStorage.removeItem('dr_user'); localStorage.removeItem('dr_token'); };
  return <AuthContext.Provider value={{user, token, login, logout}}>{children}</AuthContext.Provider>;
};

const ToastProvider = ({children}:{children:ReactNode}) => {
  const [t, setT] = useState<string|null>(null);
  const addToast = (m:string) => { setT(m); setTimeout(()=>setT(null), 3000); };
  return (
    <ToastContext.Provider value={{addToast}}>
      {children}
      <AnimatePresence>
        {t && (
            <motion.div initial={{opacity:0, scale:0.9, y:20}} animate={{opacity:1, scale:1, y:0}} exit={{opacity:0, scale:0.9}} style={{ position:'fixed', bottom:40, right:40, zIndex:10000, background:'#fff', color:'#000', padding:'18px 28px', borderRadius:2, fontWeight:700, letterSpacing:'0.05em', textTransform:'uppercase', fontSize:11, boxShadow:'0 20px 50px rgba(0,0,0,0.6)' }}>
             <Sparkles size={14} style={{ marginRight:12, verticalAlign:'middle' }} /> {t}
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
const useToast = () => useContext(ToastContext);

/* ═══ UI COMPONENTS ═══ */
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <div className="container nav-wrap">
        <button className="logo" onClick={() => navigate('/')}>
          Dine<span>Reserve</span>
        </button>
        <div className="nav-links">
          <button className={`nav-link ${pathname==='/'?'active':''}`} onClick={()=>navigate('/')}>Home</button>
          <button className={`nav-link ${pathname==='/browse'?'active':''}`} onClick={()=>navigate('/browse')}>Collection</button>
          {user && <button className={`nav-link ${pathname==='/dashboard'?'active':''}`} onClick={()=>navigate('/dashboard')}>Dashboard</button>}
        </div>
        <div className="nav-actions">
          {user ? (
            <div style={{ display:'flex', gap:28, alignItems:'center' }}>
              <button className="nav-link" onClick={()=>{logout(); navigate('/');}}>Sign Out</button>
              <div style={{ width:38, height:38, borderRadius:'50%', border:'1px solid var(--clr-accent)', color:'var(--clr-accent)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, cursor:'pointer', fontSize:14 }} onClick={()=>navigate('/dashboard')}>{user.name.charAt(0)}</div>
            </div>
          ) : (
            <>
              <button className="nav-link" onClick={()=>navigate('/login')}>Log In</button>
              <button className="btn btn-primary" onClick={()=>navigate('/register')}>Join Now</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

/* ═══ PAGES ═══ */
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="fade-in">
      <section className="hero">
        <div className="container" style={{ position:'relative', zIndex:2 }}>
          <span className="hero-eyebrow">The Collective for Connoisseurs</span>
          <h1 className="hero-title">Experience the <br /><em>sublime</em> side of dining.</h1>
          <p className="hero-desc">Bespoke reservations, interactive spatial choice, and access to the world’s most elusive culinary artists.</p>
          <div style={{ display:'flex', gap:24, justifyContent:'center' }}>
            <button className="btn btn-primary" onClick={()=>navigate('/browse')}>Browse Collection</button>
            <button className="btn btn-outline" onClick={()=>navigate('/register')}>Enter the Reserve</button>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="stats-row">
          <div className="stat-box"><span className="stat-val">420</span><span className="stat-label">Curated Entries</span></div>
          <div className="stat-box"><span className="stat-val">12k</span><span className="stat-label">Private Members</span></div>
          <div className="stat-box"><span className="stat-val">4.9</span><span className="stat-label">Member Satisfaction</span></div>
          <div className="stat-box"><span className="stat-val">24/7</span><span className="stat-label">Concierge Reach</span></div>
        </div>
      </div>

      <section className="section">
        <div className="container">
            <div className="grid grid-3">
                <div className="card-luxury">
                    <img src={RESTAURANT_IMAGES['Aurélien']} alt="French Dining" style={{ width:'100%', height:240, objectFit:'cover', marginBottom:32, opacity:0.8 }} />
                    <h3 className="card-title serif">The Aesthetic</h3>
                    <p className="card-text">Every establishment in our collection is chosen for its architectural beauty and atmospheric precision.</p>
                </div>
                <div className="card-luxury">
                    <img src={RESTAURANT_IMAGES['Sakura House']} alt="Japanese Dining" style={{ width:'100%', height:240, objectFit:'cover', marginBottom:32, opacity:0.8 }} />
                    <h3 className="card-title serif">The Craft</h3>
                    <p className="card-text">We partner with chefs who view their work as performance art, ensuring a journey for all senses.</p>
                </div>
                <div className="card-luxury">
                    <img src={RESTAURANT_IMAGES['Botanica']} alt="Garden Dining" style={{ width:'100%', height:240, objectFit:'cover', marginBottom:32, opacity:0.8 }} />
                    <h3 className="card-title serif">The Atmosphere</h3>
                    <p className="card-text">From hidden botanical terraces to subterranean vaults, find the perfect backdrop for your evening.</p>
                </div>
            </div>
        </div>
      </section>

      <footer style={{ padding:'100px 0', borderTop:'1px solid var(--clr-border)', background:'var(--clr-bg)' }}>
        <div className="container" style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div className="logo" style={{ fontSize:32 }}>Dine<span>Reserve</span></div>
          <div style={{ display:'flex', gap:40 }}>
             <span className="nav-link">Privacy</span>
             <span className="nav-link">Terms</span>
             <span className="nav-link">Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { addToast } = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/auth/login`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Login failed');
        login(data.user, data.token);
        addToast('Profile Synchronized Successfully');
        navigate('/dashboard');
      } catch (err: any) {
        addToast(err.message);
      } finally { setLoading(false); }
    };
  
    return (
      <div className="auth-wrap fade-in">
        <div className="auth-card">
          <div className="auth-head">
            <h1 className="auth-title serif">Credential Check</h1>
            <p className="section-desc">Sign in to your private vault</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label className="label">Network ID (Email)</label>
              <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
            </div>
            <div className="form-field">
              <label className="label">Authentication Key</label>
              <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
            </div>
            <button className="btn btn-primary" style={{width:'100%'}} type="submit" disabled={loading}>
              {loading ? 'Processing...' : 'Authorize Access'}
            </button>
          </form>
          <p style={{textAlign:'center', marginTop:32, fontSize:12, color:'var(--clr-text-muted)', letterSpacing:'0.05em', textTransform:'uppercase'}}>
            New Identity? <span style={{color:'var(--clr-accent)', cursor:'pointer', fontWeight:700}} onClick={()=>navigate('/register')}>Initialize registration</span>
          </p>
        </div>
      </div>
    );
  };

const RegisterPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { addToast } = useToast();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'CUSTOMER'|'OWNER'>('CUSTOMER');
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const res = await fetch(`${API_BASE}/auth/register`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, role })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Registration failed');
        login(data.user, data.token);
        addToast('Identity Successfully Registered');
        navigate('/dashboard');
      } catch (err: any) {
        addToast(err.message);
      }
    };
  
    return (
      <div className="auth-wrap fade-in">
        <div className="auth-card">
          <div className="auth-head">
            <h1 className="auth-title serif">Join the Collection</h1>
            <p className="section-desc">Create your curated dining profile</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label className="label">Full Legal Name</label>
              <input className="input" type="text" value={name} onChange={e=>setName(e.target.value)} required />
            </div>
            <div className="form-field">
              <label className="label">Primary Email</label>
              <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
            </div>
            <div className="form-field">
              <label className="label">Profile Designation</label>
              <select className="input" value={role} onChange={e=>setRole(e.target.value as any)}>
                <option value="CUSTOMER">Private Diner</option>
                <option value="OWNER">Establishment Owner</option>
              </select>
            </div>
            <div className="form-field">
              <label className="label">Secure Password</label>
              <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
            </div>
            <button className="btn btn-primary" style={{width:'100%'}} type="submit">Establish Member Account</button>
          </form>
          <p style={{textAlign:'center', marginTop:32, fontSize:12, color:'var(--clr-text-muted)', letterSpacing:'0.05em', textTransform:'uppercase'}}>
            Existing Identity? <span style={{color:'var(--clr-accent)', cursor:'pointer', fontWeight:700}} onClick={()=>navigate('/login')}>Access profile</span>
          </p>
        </div>
      </div>
    );
};

const BrowsePage = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('All');
    const [rests, setRests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        fetch(`${API_BASE}/restaurants`)
        .then(r => r.json())
        .then(d => { setRests(d); setLoading(false); })
        .catch(() => setLoading(false));
    }, []);

    const filterList = ['All', ...new Set(rests.map(r => r.cuisine))];

    return (
        <div className="fade-in" style={{ paddingBottom:100 }}>
        <div className="container">
            <header className="browse-head">
            <span className="hero-eyebrow">The Reserve List</span>
            <h1 className="hero-title serif" style={{ fontSize:72, textAlign:'left' }}>Explore the <em>Curation</em>.</h1>
            <div className="filters">
                {filterList.map(f => (
                <span key={f} className={`filter-item ${filter===f?'active':''}`} onClick={()=>setFilter(f)}>{f}</span>
                ))}
            </div>
            </header>

            {loading ? (
                <div style={{ textAlign:'center', padding:100, color:'var(--clr-text-muted)', letterSpacing:'0.1em', fontSize:11, textTransform:'uppercase' }}>Synchronizing establishment data...</div>
            ) : (
                <div className="rest-grid">
                {rests.filter(r => filter==='All' || r.cuisine === filter).map(r => (
                    <div key={r.id} className="rest-card fade-in" onClick={()=>navigate(`/restaurant/${r.id}`)}>
                    <div className="rest-img" style={{ position:'relative' }}>
                        <img src={RESTAURANT_IMAGES[r.name] || RESTAURANT_IMAGES['default']} alt={r.name} style={{ width:'100%', height:'100%', objectFit:'cover', position:'absolute', top:0, left:0 }} />
                        <div style={{ position:'absolute', top:24, right:24, background:'rgba(0,0,0,0.6)', padding:12, backdropFilter:'blur(8px)', borderRadius:2 }}>
                           <Star size={14} fill="var(--clr-accent)" stroke="none" />
                        </div>
                    </div>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginTop:32 }}>
                        <h3 className="rest-name serif">{r.name}</h3>
                        <span style={{ fontSize:10, letterSpacing:'0.1em', background:'var(--clr-accent-dim)', color:'var(--clr-accent)', padding:'4px 8px', fontWeight:700 }}>PREMIUM</span>
                    </div>
                    <p className="rest-meta" style={{ marginTop:8 }}>{r.cuisine} · {r.address}</p>
                    </div>
                ))}
                </div>
            )}
        </div>
        </div>
    );
};

const RestaurantPage = () => {
  const loc = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useToast();
  const id = loc.pathname.split('/').pop();
  const [rest, setRest] = useState<any>(null);
  const [date, setDate] = useState('');
  const [tableId, setTableId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/restaurants/${id}`)
    .then(r => r.json())
    .then(d => { setRest(d); setLoading(false); })
    .catch(() => setLoading(false));
  }, [id]);

  const handleBooking = async () => {
    if (!user) { addToast('Authentication Required'); navigate('/login'); return; }
    if (!date || !tableId) { addToast('Parameters incomplete'); return; }
    
    try {
        const res = await fetch(`${API_BASE}/reservations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date, customerId: user.id, tableId })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Booking failed');
        addToast('Reservation Synchronized Successfully');
        navigate('/dashboard');
    } catch (err: any) {
        addToast(err.message);
    }
  };

  if (loading) return <div className="container" style={{padding:200, textAlign:'center', color:'var(--clr-text-muted)', letterSpacing:'0.1em', fontSize:11, textTransform:'uppercase'}}>Retrieving establishment profile...</div>;
  if (!rest) return <Navigate to="/browse" />;

  const heroImg = RESTAURANT_IMAGES[rest.name] || RESTAURANT_IMAGES['default'];

  return (
    <div className="fade-in">
      <div className="detail-hero-luxury" style={{ backgroundImage: `linear-gradient(rgba(12,12,13,0.8), rgba(12,12,13,0.8)), url(${heroImg})`, backgroundSize:'cover', backgroundPosition:'center' }}>
          <div className="container" style={{ position:'relative', zIndex:5, paddingTop:140, paddingBottom:100 }}>
             <span className="hero-eyebrow">The Collective Portfolio</span>
             <h1 className="hero-title serif" style={{ textAlign:'left', fontSize:80 }}>{rest.name}</h1>
             <div style={{ display:'flex', gap:40, alignItems:'center', marginTop:32 }}>
                <div style={{ display:'flex', gap:8, alignItems:'center', fontSize:13, fontWeight:600 }}>
                   <Star size={16} fill="var(--clr-accent)" stroke="none" /> <span>4.9 EXPERIENCE RATING</span>
                </div>
                <div style={{ width:1, height:20, background:'var(--clr-border)' }} />
                <div style={{ display:'flex', gap:8, alignItems:'center', fontSize:13, fontWeight:600 }}>
                   <MapPin size={16} color="var(--clr-accent)" /> <span>{rest.address}</span>
                </div>
                <div style={{ width:1, height:20, background:'var(--clr-border)' }} />
                <div style={{ display:'flex', gap:8, alignItems:'center', fontSize:13, fontWeight:600 }}>
                   <ShieldCheck size={16} color="var(--clr-accent)" /> <span>VERIFIED ESTABLISHMENT</span>
                </div>
             </div>
          </div>
      </div>

      <div className="container" style={{ position:'relative', marginTop:-60, zIndex:10 }}>
        <div className="booking-box fade-in" style={{ boxShadow:'0 40px 100px rgba(0,0,0,0.8)' }}>
          <h2 className="serif" style={{ fontSize:32, marginBottom:40 }}>Secure the Allocation</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:40 }}>
            <div className="form-field">
              <label className="label">Event Date</label>
              <input className="input" type="date" value={date} onChange={e=>setDate(e.target.value)} />
            </div>
            <div className="form-field">
              <label className="label">Spatial Node (Table)</label>
              <select className="input" value={tableId} onChange={e=>setTableId(e.target.value)}>
                <option value="">Choose Node</option>
                {rest.tables?.map((t: any) => (
                    <option key={t.id} value={t.id}>N-{t.number} ({t.capacity} Guests · {t.zone})</option>
                ))}
              </select>
            </div>
            <div className="form-field" style={{ display:'flex', alignItems:'flex-end' }}>
               <button className="btn btn-primary" style={{ width:'100%', height:'52px' }} onClick={handleBooking}>Finalize Reserve</button>
            </div>
          </div>
        </div>

        <div className="section">
           <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:80 }}>
              <div>
                  <h2 className="serif" style={{ fontSize:40, marginBottom:40 }}>About the Experience</h2>
                  <p className="hero-desc" style={{ textAlign:'left', margin:0, lineHeight:1.8 }}>{rest.description}. Situated in the historic district of {rest.address.split(',')[1] || rest.address}, {rest.name} has been a cornerstone of the culinary avant-garde. Our commitment to artisanal quality and atmospheric precision ensures that every visit is a symphony of taste and aesthetic pleasure.</p>
                  
                  <div style={{ marginTop:60 }}>
                     <h3 className="serif" style={{ fontSize:32, marginBottom:32 }}>House Signatures</h3>
                     <div className="grid grid-2">
                        {rest.menuItems?.map((m: any) => (
                            <div key={m.id} className="card-luxury" style={{ padding:32 }}>
                               <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
                                  <h4 className="serif" style={{ fontSize:20 }}>{m.name}</h4>
                                  <span style={{ color:'var(--clr-accent)', fontWeight:700 }}>${m.price}</span>
                               </div>
                               <p className="card-text" style={{ fontSize:14 }}>{m.description}</p>
                            </div>
                        ))}
                     </div>
                  </div>
              </div>
              <div>
                 <div className="card-luxury" style={{ background:'var(--clr-surface-2)', borderColor:'var(--clr-accent-dim)' }}>
                    <h3 className="serif" style={{ fontSize:24, marginBottom:24 }}>Details</h3>
                    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
                       <div style={{ display:'flex', justifyContent:'space-between' }}>
                          <span style={{ fontSize:11, color:'var(--clr-text-muted)', textTransform:'uppercase' }}>Cuisine</span>
                          <span style={{ fontSize:13, fontWeight:600 }}>{rest.cuisine}</span>
                       </div>
                       <div style={{ display:'flex', justifyContent:'space-between' }}>
                          <span style={{ fontSize:11, color:'var(--clr-text-muted)', textTransform:'uppercase' }}>Dress Code</span>
                          <span style={{ fontSize:13, fontWeight:600 }}>Formal Elegance</span>
                       </div>
                       <div style={{ display:'flex', justifyContent:'space-between' }}>
                          <span style={{ fontSize:11, color:'var(--clr-text-muted)', textTransform:'uppercase' }}>Atmosphere</span>
                          <span style={{ fontSize:13, fontWeight:600 }}>Low Lighting / Intimate</span>
                       </div>
                    </div>
                 </div>

                 <div style={{ marginTop:40 }}>
                    <h4 className="serif" style={{ fontSize:20, marginBottom:16 }}>Expert Reviews</h4>
                    <div style={{ borderTop:'1px solid var(--clr-border)', padding:'24px 0' }}>
                       <p className="card-text" style={{ fontStyle:'italic', marginBottom:12 }}>"A masterclass in restraint and refinement. The wine pairing is unmissable."</p>
                       <span style={{ fontSize:11, color:'var(--clr-accent)', fontWeight:700 }}>— THE COLLECTIVE GUIDE</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => {
    const { user } = useAuth();
    const [reservations, setReservations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetch(`${API_BASE}/reservations/user/${user.id}`)
            .then(r => r.json())
            .then(d => { setReservations(d); setLoading(false); })
            .catch(() => setLoading(false));
        }
    }, [user]);

    if (!user) return <Navigate to="/login" />;

    return (
        <div className="dash-layout fade-in">
        <aside className="dash-side">
            <div className="side-nav">
                <span className="side-item active"><TrendingUp size={16} /> Overview</span>
                <span className="side-item"><Calendar size={16} /> My Reservations</span>
                <span className="side-item"><Heart size={16} /> Saved Collection</span>
                <span className="side-item"><Award size={16} /> Member Rewards</span>
                <span className="side-item"><MessageCircle size={16} /> Feedbacks</span>
            </div>
            <div style={{ marginTop:'auto', borderTop:'1px solid var(--clr-border)', paddingTop:32 }}>
                <div style={{ display:'flex', gap:16, alignItems:'center' }}>
                   <div style={{ width:40, height:40, background:'var(--clr-surface-2)', borderRadius:2, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <Zap size={18} color="var(--clr-accent)" />
                   </div>
                   <div>
                      <div style={{ fontSize:11, color:'var(--clr-text-muted)' }}>MEMBER TIER</div>
                      <div style={{ fontSize:13, fontWeight:700, color:'var(--clr-accent)' }}>SILVER STATUS</div>
                   </div>
                </div>
            </div>
        </aside>
        <main className="dash-main" style={{ paddingBottom:100 }}>
            <header style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:60 }}>
               <div>
                  <h1 className="serif" style={{ fontSize:56, marginBottom:8 }}>Noble Welcome, {user.name}</h1>
                  <p className="section-desc" style={{ textAlign:'left', margin:0 }}>Your curated portal for dining orchestration.</p>
               </div>
               <div className="card-luxury" style={{ padding:'20px 32px', background:'var(--clr-surface-2)' }}>
                  <div style={{ fontSize:10, color:'var(--clr-text-muted)', marginBottom:4 }}>YIELD CREDIT BALANCE</div>
                  <div style={{ fontSize:28, fontWeight:700, color:'var(--clr-accent)' }}>2,850 <small style={{ fontSize:12 }}>DCR</small></div>
               </div>
            </header>
            
            <div className="stats-row" style={{ marginTop:0, marginBottom:80 }}>
                <div className="stat-box"><span className="stat-val">{reservations.length}</span><span className="stat-label">Active Bookings</span></div>
                <div className="stat-box"><span className="stat-val">12</span><span className="stat-label">Historical Visits</span></div>
                <div className="stat-box"><span className="stat-val">4</span><span className="stat-label">Saved Favs</span></div>
                <div className="stat-box"><span className="stat-val">02</span><span className="stat-label">Invite Only Access</span></div>
            </div>

            <div>
                <h2 className="serif" style={{ fontSize:32, marginBottom:40 }}>Recent Synchronizations</h2>
                {loading ? (
                    <div style={{ color:'var(--clr-text-muted)', letterSpacing:'0.1em', fontSize:11, textTransform:'uppercase' }}>Decrypting schedule data...</div>
                ) : reservations.length === 0 ? (
                    <div className="card-luxury" style={{ padding:'60px', textAlign:'center', opacity:0.6 }}>
                        <Calendar size={48} strokeWidth={0.5} style={{ marginBottom:20 }} />
                        <p style={{ color:'var(--clr-text-muted)' }}>No upcoming reservations in your active stream.</p>
                    </div>
                ) : (
                    <div className="grid grid-2">
                        {reservations.map((r: any) => (
                            <div key={r.id} className="card-luxury fade-in" style={{ display:'flex', gap:32, alignItems:'center' }}>
                                <div style={{ width:120, height:120, background:`url(${RESTAURANT_IMAGES[r.table.restaurant.name] || RESTAURANT_IMAGES['default']})`, backgroundSize:'cover' }} />
                                <div style={{ flex:1 }}>
                                    <span className="hero-eyebrow" style={{ color:'var(--clr-accent)', marginBottom:8 }}>{new Date(r.date).toLocaleDateString('en-US', { month:'long', day:'numeric', year:'numeric' })}</span>
                                    <h3 className="card-title serif" style={{ marginBottom:4, fontSize:24 }}>{r.table.restaurant.name}</h3>
                                    <p className="card-text" style={{ fontSize:13 }}>Table {r.table.number} · {r.table.zone} · {r.status}</p>
                                </div>
                                <button className="btn btn-outline btn-sm">Manage</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div style={{ marginTop:100 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:40 }}>
                    <h2 className="serif" style={{ fontSize:32 }}>Recommended for You</h2>
                    <span className="nav-link" style={{ fontSize:11 }}>VIEW ENTIRE RESERVE</span>
                </div>
                <div className="grid grid-3">
                   {['Botanica', 'Aurélien'].map(name => (
                       <div key={name} className="card-luxury" style={{ padding:0, border:'none', position:'relative' }}>
                          <img src={RESTAURANT_IMAGES[name]} style={{ width:'100%', height:300, objectFit:'cover', opacity:0.7 }} />
                          <div style={{ position:'absolute', bottom:24, left:24, right:24, padding:24, background:'rgba(0,0,0,0.8)', backdropFilter:'blur(8px)' }}>
                             <h4 className="serif" style={{ color:'#fff', fontSize:20 }}>{name}</h4>
                             <p style={{ fontSize:11, color:'var(--clr-accent)', fontWeight:700, marginTop:4 }}>MEMBER RECOMMENDATION</p>
                          </div>
                       </div>
                   ))}
                </div>
            </div>
        </main>
        </div>
    );
};

const AppRoot = () => (
  <BrowserRouter>
    <AuthProvider>
      <ToastProvider>
        <Navbar />
        <div style={{ minHeight:'100vh', paddingTop:88 }}>
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/browse" element={<BrowsePage />} />
              <Route path="/restaurant/:id" element={<RestaurantPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </ToastProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default AppRoot;
