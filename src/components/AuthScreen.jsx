import { useState } from 'react';
import { signup, login } from '../utils/auth';

const INDIAN_STATES = [
  'Andhra Pradesh','Assam','Bihar','Chhattisgarh','Gujarat','Haryana',
  'Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Odisha','Punjab','Rajasthan','Tamil Nadu','Telangana',
  'Uttar Pradesh','Uttarakhand','West Bengal',
];

export default function AuthScreen({ onAuthSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [lang, setLang] = useState('hi');
  const [form, setForm] = useState({ name: '', phone: '', state: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isHi = lang === 'hi';

  const str = {
    title:       isHi ? '🌾 स्मार्ट फार्म AI' : '🌾 Smart Farm AI',
    subtitle:    isHi ? 'किसानों के लिए AI सहायक' : 'AI Assistant for Farmers',
    loginTab:    isHi ? 'लॉगिन' : 'Login',
    signupTab:   isHi ? 'नया खाता' : 'Sign Up',
    name:        isHi ? 'पूरा नाम' : 'Full Name',
    phone:       isHi ? 'मोबाइल नंबर' : 'Mobile Number',
    state:       isHi ? 'राज्य चुनें' : 'Select State',
    loginBtn:    isHi ? 'लॉगिन करें' : 'Login',
    signupBtn:   isHi ? 'खाता बनाएं' : 'Create Account',
    noAccount:   isHi ? 'खाता नहीं है? नया बनाएं' : "Don't have an account? Sign up",
    hasAccount:  isHi ? 'पहले से खाता है? लॉगिन करें' : 'Already have an account? Login',
    err_fill:    isHi ? 'सभी जानकारी भरें।' : 'Please fill all fields.',
    err_phone:   isHi ? '10 अंकों का सही मोबाइल नंबर डालें।' : 'Enter a valid 10-digit mobile number.',
    err_exists:  isHi ? 'यह नंबर पहले से रजिस्टर है। लॉगिन करें।' : 'This number is already registered. Please login.',
    err_notfound:isHi ? 'नंबर नहीं मिला। पहले खाता बनाएं।' : 'Number not found. Please sign up first.',
    langBtn:     isHi ? 'English' : 'हिंदी',
  };

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    setError('');
    if (!form.phone || (mode === 'signup' && (!form.name || !form.state))) {
      setError(str.err_fill); return;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      setError(str.err_phone); return;
    }
    setLoading(true);
    setTimeout(() => { // simulate async feel
      if (mode === 'signup') {
        const res = signup({ name: form.name, phone: form.phone, state: form.state, lang });
        if (!res.success) { setError(str.err_exists); setLoading(false); return; }
        onAuthSuccess(res.user);
      } else {
        const res = login({ phone: form.phone });
        if (!res.success) { setError(str.err_notfound); setLoading(false); return; }
        onAuthSuccess(res.user);
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div style={styles.page}>
      {/* Background blobs */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      {/* Card */}
      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoRow}>
          <span style={styles.logo}>🌾</span>
          <div>
            <div style={styles.title}>{str.title}</div>
            <div style={styles.subtitle}>{str.subtitle}</div>
          </div>
        </div>

        {/* Lang toggle */}
        <button style={styles.langBtn} onClick={() => setLang(l => l === 'hi' ? 'en' : 'hi')}>
          {str.langBtn}
        </button>

        {/* Tabs */}
        <div style={styles.tabRow}>
          {['login','signup'].map((m) => (
            <button
              key={m}
              style={{ ...styles.tabBtn, ...(mode === m ? styles.tabActive : {}) }}
              onClick={() => { setMode(m); setError(''); }}
            >
              {m === 'login' ? str.loginTab : str.signupTab}
            </button>
          ))}
        </div>

        {/* Form */}
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {mode === 'signup' && (
            <div style={styles.field}>
              <label style={styles.label}>👤 {str.name}</label>
              <input
                style={styles.input}
                type="text"
                placeholder={isHi ? 'जैसे: रामलाल पाटिल' : 'e.g. Ramlal Patil'}
                value={form.name}
                onChange={(e) => setField('name', e.target.value)}
              />
            </div>
          )}

          <div style={styles.field}>
            <label style={styles.label}>📱 {str.phone}</label>
            <input
              style={styles.input}
              type="tel"
              maxLength={10}
              placeholder="9876543210"
              value={form.phone}
              onChange={(e) => setField('phone', e.target.value.replace(/\D/g, ''))}
            />
          </div>

          {mode === 'signup' && (
            <div style={styles.field}>
              <label style={styles.label}>🗺️ {str.state}</label>
              <select
                style={{ ...styles.input, cursor:'pointer' }}
                value={form.state}
                onChange={(e) => setField('state', e.target.value)}
              >
                <option value="">{isHi ? '-- राज्य चुनें --' : '-- Select State --'}</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          )}

          {error && (
            <div style={styles.errBox}>⚠️ {error}</div>
          )}

          <button
            style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? '⏳ ...' : (mode === 'login' ? str.loginBtn : str.signupBtn)}
          </button>

          <button
            style={styles.switchBtn}
            onClick={() => { setMode(m => m === 'login' ? 'signup' : 'login'); setError(''); }}
          >
            {mode === 'login' ? str.noAccount : str.hasAccount}
          </button>
        </div>
      </div>

      {/* Bottom tagline */}
      <div style={styles.tagline}>
        {isHi ? '🚜 खेती में AI की ताकत' : '🚜 Empowering farmers with AI'}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0d1f0f 0%, #0a1628 55%, #1a0a2e 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 16px',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Outfit', sans-serif",
  },
  blob1: {
    position: 'absolute', top: '-80px', left: '-80px',
    width: 280, height: 280, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(74,222,128,0.15), transparent 70%)',
    pointerEvents: 'none',
  },
  blob2: {
    position: 'absolute', bottom: '-60px', right: '-60px',
    width: 220, height: 220, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(56,189,248,0.12), transparent 70%)',
    pointerEvents: 'none',
  },
  card: {
    width: '100%',
    maxWidth: 420,
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 24,
    padding: '28px 24px',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
    position: 'relative',
    zIndex: 1,
  },
  logoRow: {
    display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20,
  },
  logo: { fontSize: '2.8rem', filter: 'drop-shadow(0 0 12px rgba(74,222,128,0.7))' },
  title: {
    fontSize: '1.3rem', fontWeight: 900,
    background: 'linear-gradient(135deg, #4ade80, #fbbf24)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  },
  subtitle: { fontSize: '0.78rem', color: 'rgba(240,253,244,0.5)', marginTop: 2 },
  langBtn: {
    position: 'absolute', top: 20, right: 20,
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    color: '#f0fdf4', padding: '5px 12px',
    borderRadius: 16, fontSize: '0.78rem', fontWeight: 700,
    fontFamily: "'Outfit', sans-serif", cursor: 'pointer',
  },
  tabRow: { display: 'flex', gap: 8, marginBottom: 20 },
  tabBtn: {
    flex: 1, padding: '10px 0',
    border: '1.5px solid rgba(255,255,255,0.12)',
    borderRadius: 12,
    background: 'rgba(255,255,255,0.04)',
    color: 'rgba(240,253,244,0.5)',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.9rem', fontWeight: 700,
    cursor: 'pointer', transition: 'all 0.2s',
  },
  tabActive: {
    background: 'rgba(74,222,128,0.15)',
    borderColor: '#4ade80',
    color: '#4ade80',
  },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: '0.8rem', fontWeight: 700, color: 'rgba(240,253,244,0.65)' },
  input: {
    background: 'rgba(255,255,255,0.07)',
    border: '1.5px solid rgba(255,255,255,0.12)',
    borderRadius: 12, padding: '12px 14px',
    color: '#f0fdf4', fontSize: '0.95rem',
    fontFamily: "'Outfit', sans-serif",
    outline: 'none', width: '100%',
    transition: 'border-color 0.2s',
  },
  errBox: {
    background: 'rgba(239,68,68,0.12)',
    border: '1px solid rgba(239,68,68,0.3)',
    borderRadius: 10, padding: '10px 14px',
    color: '#fca5a5', fontSize: '0.84rem', fontWeight: 500,
  },
  submitBtn: {
    background: 'linear-gradient(135deg, #16a34a, #4ade80)',
    border: 'none', borderRadius: 14,
    padding: '14px 0', width: '100%',
    color: '#0d1f0f', fontSize: '1rem', fontWeight: 800,
    fontFamily: "'Outfit', sans-serif",
    cursor: 'pointer', marginTop: 4,
    boxShadow: '0 4px 20px rgba(74,222,128,0.35)',
    transition: 'opacity 0.2s',
  },
  switchBtn: {
    background: 'none', border: 'none',
    color: '#4ade80', fontSize: '0.83rem',
    fontFamily: "'Outfit', sans-serif",
    cursor: 'pointer', textAlign: 'center',
    textDecoration: 'underline', padding: '4px 0',
  },
  tagline: {
    marginTop: 24, fontSize: '0.82rem',
    color: 'rgba(240,253,244,0.35)', textAlign: 'center', zIndex: 1,
  },
};
