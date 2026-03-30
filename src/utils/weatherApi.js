const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE = 'https://api.openweathermap.org/data/2.5';

export const getUserLocation = () =>
  new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ lat: 28.6, lon: 77.2 }); // Delhi fallback
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => resolve({ lat: 28.6, lon: 77.2 })
    );
  });

export const getCurrentWeather = async (lat, lon) => {
  try {
    const res = await fetch(`${BASE}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    if (!res.ok) throw new Error(`Weather API ${res.status}`);
    return res.json();
  } catch (err) {
    console.warn('Using mock weather:', err.message);
    // Fallback mock so UI always renders
    return {
      name: 'Your Location',
      main: { temp: 31, feels_like: 34, humidity: 65 },
      weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
      wind: { speed: 3.2 },
    };
  }
};

export const getForecast = async (lat, lon) => {
  try {
    const res = await fetch(`${BASE}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    if (!res.ok) throw new Error(`Forecast API ${res.status}`);
    return res.json();
  } catch (err) {
    console.warn('Using mock forecast:', err.message);
    const today = new Date();
    const list = Array.from({ length: 5 }, (_, i) => {
      const d = new Date(today); d.setDate(today.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      return {
        dt: Math.floor(d.getTime() / 1000),
        dt_txt: `${dateStr} 12:00:00`,
        main: { temp: 28 + i, humidity: 60 },
        weather: [{ main: i === 2 ? 'Rain' : 'Clear' }],
        pop: i === 2 ? 0.8 : 0.1,
      };
    });
    return { list };
  }
};

export const getLocationName = async (lat, lon) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      { headers: { 'Accept-Language': 'en' } }
    );
    const data = await res.json();
    const parts = [
      data.address?.village || data.address?.town || data.address?.city || data.address?.suburb,
      data.address?.state_district || data.address?.state,
    ].filter(Boolean);
    return parts.join(', ') || data.display_name?.split(',').slice(0, 2).join(', ') || 'Your Location';
  } catch {
    return 'Your Location';
  }
};

// Convert OWM weather condition to emoji
export const weatherEmoji = (condition) => {
  const map = {
    Clear: '☀️', Clouds: '☁️', Rain: '🌧️', Drizzle: '🌦️',
    Thunderstorm: '⛈️', Snow: '❄️', Mist: '🌫️', Fog: '🌫️',
    Haze: '🌁', Dust: '🌪️', Smoke: '🌫️', Tornado: '🌪️',
  };
  return map[condition] || '🌤️';
};

// Get a daily summary from 3-hour forecast list
export const parseDailyForecast = (list = []) => {
  const days = {};
  list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!days[date]) days[date] = [];
    days[date].push(item);
  });
  return Object.entries(days).slice(0, 5).map(([date, items]) => {
    const temps = items.map((i) => i.main.temp);
    const maxTemp = Math.round(Math.max(...temps));
    const minTemp = Math.round(Math.min(...temps));
    const midday = items.find((i) => i.dt_txt.includes('12:00')) || items[0];
    const pop = Math.round(Math.max(...items.map((i) => (i.pop || 0) * 100)));
    const d = new Date(date);
    const dayName = d.toLocaleDateString('en', { weekday: 'short' });
    return { date, dayName, maxTemp, minTemp, condition: midday.weather[0].main, pop };
  });
};
