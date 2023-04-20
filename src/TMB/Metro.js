const getLineasMetro = async () => {
  console.log();
  const response = await fetch(
    "https://api.tmb.cat/v1/transit/linies/metro?app_id=" +
      process.env.TMB_APPID +
      "&app_key=" +
      process.env.TMB_APPKEY
  );
  const jsonData = await response.json();
  return jsonData;
};
export default getLineasMetro;
