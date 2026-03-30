import { t } from '../utils/translations';
import { weatherEmoji, parseDailyForecast } from '../utils/weatherApi';
import { cropData } from '../utils/mockData';

export default function Dashboard({ lang, weather, forecast, locationName, loading, crop, soil }) {
  const s = t[lang];
  const temp = weather ? Math.round(weather.main?.temp) : null;
  const humidity = weather?.main?.humidity;
  const condition = weather?.weather?.[0]?.main || 'Clear';
  const emoji = weatherEmoji(condition);
  const days = forecast ? parseDailyForecast(forecast.list) : [];
  const now = new Date();
  const hour = now.getHours();
  const greeting = lang === 'hi'
    ? (hour < 12 ? 'सुप्रभात 🌅' : hour < 17 ? 'नमस्ते 🌞' : 'शुभ संध्या 🌙')
    : (hour < 12 ? 'Good Morning 🌅' : hour < 17 ? 'Good Afternoon 🌞' : 'Good Evening 🌙');

  return (
    <>
      {/* Hero Section */}
      <div className="dash-hero">
        <div className="dash-greeting">{greeting}</div>
        <div className="dash-subtext">
          {locationName
            ? `📍 ${locationName}`
            : (lang === 'hi' ? s.locationDetecting : s.locationDetecting)}
        </div>
        {crop && (
          <div style={{ marginTop: 10 }}>
            <span className="badge badge-green">
              {cropData[crop]?.emoji} {lang === 'hi' ? s[crop]?.replace(/\s[\S]+$/, '') : s[crop]?.replace(/\s[\S]+$/, '')}
            </span>
            {soil && (
              <span className="badge badge-gold" style={{ marginLeft: 6 }}>
                🏔️ {s[soil]}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      {loading ? (
        <div className="card">
          <div className="shimmer-line" style={{ width: '50%', height: 16 }} />
          <div className="shimmer-line" style={{ width: '80%', height: 60, marginTop: 12 }} />
        </div>
      ) : weather ? (
        <div className="qs-grid">
          <div className="qs-card">
            <div className="qs-icon">{emoji}</div>
            <div className="qs-val">{temp}°C</div>
            <div className="qs-lbl">{lang === 'hi' ? 'तापमान' : 'Temperature'}</div>
          </div>
          <div className="qs-card">
            <div className="qs-icon">💧</div>
            <div className="qs-val">{humidity}%</div>
            <div className="qs-lbl">{s.humidity}</div>
          </div>
          <div className="qs-card">
            <div className="qs-icon">💨</div>
            <div className="qs-val">{Math.round((weather.wind?.speed || 0) * 3.6)} km/h</div>
            <div className="qs-lbl">{s.wind}</div>
          </div>
          <div className="qs-card">
            <div className="qs-icon">🌡️</div>
            <div className="qs-val">{Math.round(weather.main?.feels_like)}°C</div>
            <div className="qs-lbl">{s.feelsLike}</div>
          </div>
        </div>
      ) : null}

      {/* Forecast strip on dashboard */}
      {days.length > 0 && (
        <div className="card" style={{ padding: '16px 20px' }}>
          <div className="section-label">{s.forecastTitle}</div>
          <div className="forecast-strip">
            {days.map((d, i) => (
              <div key={d.date} className={`forecast-card ${i === 0 ? 'today' : ''}`}>
                <div className="fc-day">{i === 0 ? (lang === 'hi' ? 'आज' : 'Today') : d.dayName}</div>
                <span className="fc-icon">{weatherEmoji(d.condition)}</span>
                <div className="fc-temp">{d.maxTemp}°/{d.minTemp}°</div>
                {d.pop > 0 && <div className="fc-pop">🌧 {d.pop}%</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Smart Tip */}
      <div className="card">
        <div className="card-title"><span className="card-title-icon">💡</span>{lang === 'hi' ? 'आज की स्मार्ट टिप' : "Today's Smart Tip"}</div>
        <div className="ai-advice-box" style={{ fontSize: '0.88rem' }}>
          {weather && temp > 35
            ? (lang === 'hi' ? '🌡️ तापमान अधिक है — सुबह जल्दी या शाम को सिंचाई करें। दोपहर में पत्तों पर पानी न डालें।' : '🌡️ High temperature — irrigate early morning or evening. Avoid spraying leaves at noon.')
            : weather && ['Rain', 'Drizzle'].includes(condition)
            ? (lang === 'hi' ? '🌧️ बारिश की संभावना — सिंचाई स्थगित करें और जल निकास की व्यवस्था करें।' : '🌧️ Rain likely — postpone irrigation and check field drainage.')
            : (lang === 'hi' ? '🌾 खेत की नियमित निगरानी करें। कीट के शुरुआती लक्षण जल्दी पकड़ने से बड़ा नुकसान टाला जा सकता है।' : '🌾 Regularly scout your field. Catching pest signs early can prevent major crop damage.')}
        </div>
      </div>

      {/* Guide cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          { icon: '🗺️', labelEn: 'View Field Map', labelHi: 'खेत का नक्शा देखें', tab: 'map', color: 'rgba(56,189,248,0.12)', border: 'rgba(56,189,248,0.30)' },
          { icon: '🤖', labelEn: 'AI Farm Advice', labelHi: 'AI सलाह लें', tab: 'farm', color: 'rgba(74,222,128,0.12)', border: 'rgba(74,222,128,0.30)' },
          { icon: '🧪', labelEn: 'Fertilizer Guide', labelHi: 'उर्वरक मार्गदर्शिका', tab: 'inputs', color: 'rgba(251,191,36,0.10)', border: 'rgba(251,191,36,0.30)' },
          { icon: '📅', labelEn: 'Crop Schedule', labelHi: 'फसल कार्यक्रम', tab: 'schedule', color: 'rgba(167,139,250,0.10)', border: 'rgba(167,139,250,0.30)' },
        ].map((item) => (
          <div
            key={item.tab}
            style={{
              background: item.color,
              border: `1px solid ${item.border}`,
              borderRadius: 14,
              padding: '16px 14px',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
          >
            <div style={{ fontSize: '1.8rem', marginBottom: 6 }}>{item.icon}</div>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
              {lang === 'hi' ? item.labelHi : item.labelEn}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
