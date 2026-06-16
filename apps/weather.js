export const appMeta = {
  id: "weather",
  name: "🌤️ Canlı Hava Durumu",
  description: "İstenilen şehrin bugünkü canlı hava durumu tahminini getirir.",
  trainingData: [
    { user: 'bana #"İstanbul" hava durumunu söyle', bot: '#param1 şehrinde bugün hava durum tahmini: #app#weather#param1#.' },
    { user: '#"Ankara" için hava nasıl', bot: '#param1 için güncel hava raporu: #app#weather#param1#.' }
  ]
};

export async function execute(params) {
  const city = params[0] || "İstanbul";
  let weatherDesc = "";
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5 seconds timeout
    
    // Fetch live JSON structured data directly from wttr.in to avoid raw HTML page formats
    const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (response.ok) {
      const data = await response.json();
      const temp = data.current_condition[0].temp_C;
      const descEn = data.current_condition[0].weatherDesc[0].value.toLowerCase();
      
      let descTr = "Açık";
      let emoji = "☀️";
      
      // Clean up description translations dynamically
      if (descEn.includes("sunny") || descEn.includes("clear")) {
        descTr = "Güneşli";
        emoji = "☀️";
      } else if (descEn.includes("partly cloudy") || descEn.includes("partlycloudy")) {
        descTr = "Parçalı Bulutlu";
        emoji = "⛅";
      } else if (descEn.includes("cloudy") || descEn.includes("overcast") || descEn.includes("mist") || descEn.includes("fog")) {
        descTr = "Bulutlu";
        emoji = "☁️";
      } else if (descEn.includes("rain") || descEn.includes("drizzle") || descEn.includes("shower")) {
        descTr = "Yağmurlu";
        emoji = "🌧️";
      } else if (descEn.includes("snow") || descEn.includes("sleet") || descEn.includes("ice")) {
        descTr = "Karlı";
        emoji = "❄️";
      } else {
        descTr = data.current_condition[0].weatherDesc[0].value;
      }
      
      weatherDesc = `${temp}°C, ${descTr} ${emoji}`;
    } else {
      throw new Error("Live API failed");
    }
  } catch (e) {
    // Dynamic deterministic fallback based on day of the year + city name if offline or API drops
    const conditions = [
      { desc: "Güneşli ☀️", tempMin: 22, tempMax: 31 },
      { desc: "Parçalı Bulutlu ⛅", tempMin: 16, tempMax: 23 },
      { desc: "Bulutlu ☁️", tempMin: 12, tempMax: 18 },
      { desc: "Yağmurlu 🌧️", tempMin: 9, tempMax: 15 }
    ];
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const cityClean = city.trim().toLowerCase();
    let charSum = 0;
    for (let i = 0; i < cityClean.length; i++) {
      charSum += cityClean.charCodeAt(i);
    }
    const seed = charSum + dayOfYear;
    const cond = conditions[seed % conditions.length];
    const temp = cond.tempMin + (seed % (cond.tempMax - cond.tempMin + 1));
    
    weatherDesc = `${temp}°C, ${cond.desc} (Simüle)`;
  }

  return {
    "#param1#": city,
    "#param2#": weatherDesc
  };
}