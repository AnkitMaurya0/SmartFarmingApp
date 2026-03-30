import { useState, useEffect } from 'react';
import { t } from './utils/translations';
import { getCurrentUser, logout } from './utils/auth';
import { getUserLocation, getCurrentWeather, getForecast, getLocationName } from './utils/weatherApi';

import AuthScreen    from './components/AuthScreen';
import UserInput     from './components/UserInput';
import WeatherIntegration from './components/WeatherIntegration';
import AIRecommendation   from './components/AIRecommendation';
import FertilizerModule   from './components/FertilizerModule';
import NaturalFarming     from './components/NaturalFarming';
import MapIntegration     from './components/MapIntegration';
import PestAlerts         from './components/PestAlerts';
import CropCalendar       from './components/CropCalendar';
import Dashboard          from './components/Dashboard';

function App() {
  const [user, setUser]           = useState(null);
  const [lang, setLang]           = useState('hi');
  const [crop, setCrop]           = useState('');
  const [soil, setSoil]           = useState('');
  const [weather, setWeather]     = useState(null);
  const [forecast, setForecast]   = useState(null);
  const [location, setLocation]   = useState(null);
  const [locName, setLocName]     = useState('');
  const [loading, setLoading]     = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [showMenu, setShowMenu]   = useState(false);

  // Check existing session on mount
  useEffect(() => {
    const savedUser = getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
      if (savedUser.lang) setLang(savedUser.lang);
    }
  }, []);

  // Load weather once user is authenticated
  useEffect(() => {
    if (!user) return;
    async function init() {
      setLoading(true);
      try {
        const loc = await getUserLocation();
        setLocation(loc);
        const [w, f, name] = await Promise.all([
          getCurrentWeather(loc.lat, loc.lon),
          getForecast(loc.lat, loc.lon),
          getLocationName(loc.lat, loc.lon),
        ]);
        setWeather(w);
        setForecast(f);
        setLocName(name);
      } catch (err) {
        console.error('Init error:', err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [user]);

  const handleAuthSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    if (loggedInUser.lang) setLang(loggedInUser.lang);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setCrop('');
    setSoil('');
    setActiveTab('home');
    setShowMenu(false);
  };

  const toggleLang = () => setLang((l) => (l === 'hi' ? 'en' : 'hi'));
  const handleSelection = ({ crop: c, soil: sl }) => { setCrop(c); setSoil(sl); };

  // Show auth screen if not logged in
  if (!user) return <AuthScreen onAuthSuccess={handleAuthSuccess} />;

  const s = t[lang];

  const tabs = [
    { id: 'home',     icon: '🏠', labelKey: 'home'     },
    { id: 'farm',     icon: '🌱', labelKey: 'farm'     },
    { id: 'map',      icon: '🗺️', labelKey: 'map'      },
    { id: 'inputs',   icon: '🧪', labelKey: 'inputs'   },
    { id: 'schedule', icon: '📅', labelKey: 'schedule' },
  ];

  return (
    <div className="app-container">
      {/* ---- HEADER ---- */}
      <header className="header-glass">
        <div className="header-left">
          <span className="header-logo">🌾</span>
          <div>
            <div className="header-title">{s.appTitle}</div>
            <div className="header-subtitle">
              {lang === 'hi' ? `🙏 ${user.name}` : `👤 ${user.name}`}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button className="lang-toggle" onClick={toggleLang} id="lang-toggle-btn">
            {s.language}
          </button>
          {/* User menu */}
          <div style={{ position: 'relative' }}>
            <button
              style={{
                background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)',
                borderRadius: '50%', width: 34, height: 34, cursor: 'pointer',
                fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              onClick={() => setShowMenu((m) => !m)}
            >👤</button>
            {showMenu && (
              <div style={{
                position: 'absolute', top: 40, right: 0, zIndex: 999,
                background: 'rgba(10,20,12,0.97)', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 14, padding: '10px 0', minWidth: 180,
                backdropFilter: 'blur(20px)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              }}>
                <div style={{ padding: '8px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: 6 }}>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#4ade80' }}>👤 {user.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(240,253,244,0.4)' }}>📱 {user.phone}</div>
                  {user.state && <div style={{ fontSize: '0.75rem', color: 'rgba(240,253,244,0.4)' }}>📍 {user.state}</div>}
                </div>
                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%', background: 'none', border: 'none',
                    padding: '10px 16px', textAlign: 'left', cursor: 'pointer',
                    color: '#fca5a5', fontSize: '0.88rem', fontWeight: 700,
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  🚪 {lang === 'hi' ? 'लॉगआउट' : 'Logout'}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Click outside to close menu */}
      {showMenu && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 998 }} onClick={() => setShowMenu(false)} />
      )}

      {/* ---- MAIN CONTENT ---- */}
      <main className="main-content">

        {activeTab === 'home' && (
          <Dashboard
            lang={lang}
            user={user}
            weather={weather}
            forecast={forecast}
            locationName={locName}
            loading={loading}
            crop={crop}
            soil={soil}
          />
        )}

        {activeTab === 'farm' && (
          <>
            <UserInput lang={lang} onSelectionChange={handleSelection} crop={crop} soil={soil} />
            <AIRecommendation lang={lang} crop={crop} soil={soil} weather={weather} />
            <WeatherIntegration lang={lang} weather={weather} forecast={forecast} locationName={locName} loading={loading} />
          </>
        )}

        {activeTab === 'map' && (
          <MapIntegration lang={lang} location={location} locationName={locName} />
        )}

        {activeTab === 'inputs' && (
          <>
            <FertilizerModule lang={lang} crop={crop} />
            <NaturalFarming lang={lang} />
          </>
        )}

        {activeTab === 'schedule' && (
          <>
            <CropCalendar lang={lang} crop={crop} weather={weather} />
            <PestAlerts lang={lang} crop={crop} weather={weather} />
          </>
        )}

      </main>

      {/* ---- BOTTOM NAV ---- */}
      <nav className="bottom-nav" id="bottom-nav">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`nav-${tab.id}`}
            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="nav-icon">{tab.icon}</span>
            <span>{s[tab.labelKey]}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;
