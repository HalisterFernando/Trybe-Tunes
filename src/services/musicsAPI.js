const getMusics = async (id) => {
  const request = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`); // removida final da string (&entity=song) a fim de corrigir o erro de cors
  const requestJson = await request.json();
  return requestJson.results;
};

export default getMusics;
