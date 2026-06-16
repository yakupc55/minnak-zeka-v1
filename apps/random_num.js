export const appMeta = {
  id: "random_num",
  name: "🎲 Rastgele Sayı Üreteci",
  description: "Belirtilen iki sayı arasında gerçek zamanlı rastgele sayı üretir.",
  trainingData: [
    { user: "bana #4 ile #10 arasında bir sayı ver", bot: "Senin için #param1 ile #param2 arasında ürettiğim sayı: #app#random_num#param1,param2#" },
    { user: "#10 ile #50 arasında rastegele sayı üretir misin", bot: "#param1 ve #param2 sınırları arasında seçilen sayınız: #app#random_num#param1,param2#" },
    { user: "bana #50 ile #100 arası sayı seç", bot: "#param1 ile #param2 arasından seçtiğim şanslı sayı: #app#random_num#param1,param2#" }
  ]
};

export function execute(params) {
  const min = parseInt(params[0]) || 0;
  const max = parseInt(params[1]) || 100;
  const val = Math.floor(Math.random() * (max - min + 1)) + min;
  return {
    "#param1#": min.toString(),
    "#param2#": max.toString(),
    "#param3#": val.toString()
  };
}