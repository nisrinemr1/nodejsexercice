const fs = require('fs'); 
//lkjhgfdsdfgbhjklösxzcvbnk,.mbvcxzcvbk,l.-ösxcdfvghjknbvcfghm
//nbvcvb cvbn vgbhnm cvbnm vcbnm vbn vbn
console.log("hello");


fs.readFile("./content/bdatas.json", (error, datas) =>{
    if(error != null) return

   datas = datas.toString();
   datas = JSON.parse(datas);
   
   datas.test
})