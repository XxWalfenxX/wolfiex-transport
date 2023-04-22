export const getLineasMetro = async () => {
  const response = await fetch(
    `https://api.tmb.cat/v1/transit/linies/metro?app_id=${process.env.TMB_APPID}&app_key=${process.env.TMB_APPKEY}`
  );
  const jsonData = await response.json();
  return jsonData;
};

export const getEstacionesMetro = async (CODI_LINIA) => {
  const response = await fetch(
    `https://api.tmb.cat/v1/transit/linies/metro/${CODI_LINIA}/estacions?app_id=${process.env.TMB_APPID}&app_key=${process.env.TMB_APPKEY}`
  );
  const jsonData = await response.json();
  return jsonData;
};

export const getCorrespLineaMetro = async (CODI_LINIA) =>{
  const response = await fetch(
    `https://api.tmb.cat/v1/transit/linies/metro/${CODI_LINIA}/estacions/corresp?app_id=${process.env.TMB_APPID}&app_key=${process.env.TMB_APPKEY}`
  );
  const jsonData = await response.json();
  return jsonData;
}
