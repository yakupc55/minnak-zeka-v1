export const appMeta = {
  id: "wordlen",
  name: "📏 Kelime Uzunluğu Ölçer",
  description: "Verilen kelimenin harf uzunluğunu yazılımsal olarak ölçer.",
  trainingData: [
    { user: 'bana #"minnak" kelimesinin uzunluğunu söyle', bot: '#param1 kelimesi tam olarak #app#wordlen#param1# karakter uzunluğundadır.' },
    { user: '#"zeka" kelimesinin harf sayısı kaçtır', bot: '#param1 kelimesinin uzunluğu #app#wordlen#param1# harftir.' }
  ]
};

export function execute(params) {
  const str = params[0] || "";
  return {
    "#param1#": str,
    "#param2#": str.length.toString()
  };
}