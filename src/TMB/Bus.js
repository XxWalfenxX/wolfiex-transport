export const getLineasBus = async () => {
  const response = await fetch(
    `https://api.tmb.cat/v1/transit/linies/bus?app_id=${process.env.TMB_APPID}&app_key=${process.env.TMB_APPKEY}`
  );
  const jsonData = await response.json();
  return jsonData;
}


export const getParadasBus = async (CODI_LINIA) => {
  const response = await fetch(
    `https://api.tmb.cat/v1/transit/linies/bus/${CODI_LINIA}/parades?app_id=${process.env.TMB_APPID}&app_key=${process.env.TMB_APPKEY}`
  );
  const jsonData = await response.json();
  return jsonData;
}

export const getCorrespParadasBus = async (CODI_LINIA) => {
  const response = await fetch(
    `https://api.tmb.cat/v1/transit/linies/bus/${CODI_LINIA}/parades/corresp?app_id=${process.env.TMB_APPID}&app_key=${process.env.TMB_APPKEY}`
  );
  const jsonData = await response.json();
  return jsonData;
}
