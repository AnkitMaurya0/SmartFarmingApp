import { useState, useEffect } from 'react';
import { t } from '../utils/translations';
import { weatherEmoji, parseDailyForecast } from '../utils/weatherApi';

export default function WeatherIntegration({ lang, weather, forecast, locationName, loading }) {
  const s = t[lang];
  const days = forecast ? parseDailyForecast(forecast.list) : [];

  if (loading) return (
    <div className="card weather-hero">
      <div className="card-title"><span className="card-title-icon">🌤️</span>{s.weather}</div>
      <div className="shimmer-line" style={{ width: '60%', height: 18 }} />
      <div className="shimmer-line" style={{ width: '40%', height: 50, marginTop: 12 }} />
      <div className="shimmer-line" style={{ width: '80%', height: 14, marginTop: 12 }} />
    </div>
  );

  if (!weather) return null;

  const temp = Math.round(weather.main?.temp);
  const feelsLike = Math.round(weather.main?.feels_like);
  const humidity = weather.main?.humidity;
  const windSpeed = Math.round((weather.wind?.speed || 0) * 3.6); // m/s → km/h
  const condition = weather.weather?.[0]?.main || 'Clear';
  const description = weather.weather?.[0]?.description || '';
  const emoji = weatherEmoji(condition);
  const isRain = ['Rain', 'Drizzle', 'Thunderstorm'].includes(condition);

  return (
    <div className="card weather-hero">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="card-title" style={{ marginBottom: 0 }}>
          <span className="card-title-icon">🌤️</span>{s.weather}
        </div>
        {locationName && (
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: 160, textAlign: 'right', lineHeight: 1.3 }}>
            📍 {locationName}
          </span>
        )}
      </div>

      <div className="weather-top-row" style={{ marginTop: 16 }}>
        <div className="weather-emoji">{emoji}</div>
        <div>
          <div className="weather-temp-big">{temp}°C</div>
          <div className="weather-desc">{description}</div>
          <div className="weather-location">{s.feelsLike}: {feelsLike}°C</div>
        </div>
      </div>

      <div className="stat-row">
        <div className="stat-chip">
          <span className="stat-icon">💧</span>
          <span className="stat-val">{humidity}%</span>
          <span className="stat-lbl">{s.humidity}</span>
        </div>
        <div className="stat-chip">
          <span className="stat-icon">💨</span>
          <span className="stat-val">{windSpeed} km/h</span>
          <span className="stat-lbl">{s.wind}</span>
        </div>
        <div className="stat-chip">
          <span className="stat-icon">🌡️</span>
          <span className="stat-val">{feelsLike}°C</span>
          <span className="stat-lbl">{s.feelsLike}</span>
        </div>
      </div>

      {isRain && (
        <div className="alert alert-warning" style={{ marginTop: 14, marginBottom: 0 }}>
          <span className="alert-icon">⚠️</span><div>{s.rainAlert}</div>
        </div>
      )}
      {temp > 35 && !isRain && (
        <div className="alert alert-danger" style={{ marginTop: 14, marginBottom: 0 }}>
          <span className="alert-icon">🌡️</span><div>{s.heatAlert}</div>
        </div>
      )}

      {days.length > 0 && (
        <>
          <div className="section-label" style={{ marginTop: 18 }}>{s.forecastTitle}</div>
          <div className="forecast-strip">
            {days.map((d, i) => (
              <div key={d.date} className={`forecast-card ${i === 0 ? 'today' : ''}`}>
                <div className="fc-day">{i === 0 ? (lang === 'hi' ? 'आज' : 'Today') : d.dayName}</div>
                <span className="fc-icon">{weatherEmoji(d.condition)}</span>
                <div className="fc-temp">{d.maxTemp}°</div>
                {d.pop > 0 && <div className="fc-pop">🌧 {d.pop}%</div>}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
