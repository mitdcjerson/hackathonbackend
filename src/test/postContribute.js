const fetch = require('node-fetch');

const postContribute = async(info)=>{
    console.log("info",info);
    const response = await fetch("http://localhost:3002/infos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info)
    });
    const data = await response.json();
    return data;
     
};
module.exports = postContribute;