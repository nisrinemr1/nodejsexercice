const fs = require('fs'); 
//lkjhgfdsdfgbhjklösxzcvbnk,.mbvcxzcvbk,l.-ösxcdfvghjknbvcfghm
//nbvcvb cvbn vgbhnm cvbnm vcbnm vbn vbn
console.log("hello");


fs.readFile("./content/bdatas.json", (error, datas) =>{
    if(error != null) return

   datas = datas.toString();
   datas = JSON.parse(datas);
   
   datas.test.forEach((item_categ) => { //demander à Loïc 
    console.log(" " + item_categ.name)

   item_categ.secondtest.forEach((item_subcateg) =>{
       console.log("   " + item_subcateg.name)

       item_subcateg.thirdtest.forEach((item_subsubcateg) =>{
           console.log("      "  + item_subsubcateg.name)

           item_subsubcateg.fourthtest.forEach((item_fourthcateg) => {
               console.log("_________" + item_fourthcateg.name)
           })
       })
   })
});
})