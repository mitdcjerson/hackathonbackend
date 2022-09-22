const fetch = require('node-fetch');

const getInfos = async ()=>{
    const response =  await fetch('http://localhost:3002/infos');
    const data =  await response.json();
    // console.log("response data",data);
    return data;

};
module.exports = getInfos;