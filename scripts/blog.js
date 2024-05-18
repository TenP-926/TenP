const detail1 = document.getElementById("details1");
const detail2 = document.getElementById("details2");
const detail3 = document.getElementById("details3");
const detail4 = document.getElementById("details4");
const detail5 = document.getElementById("details5");

const changetext1 = document.getElementById("change-text1");
const changetext2 = document.getElementById("change-text2");
const changetext3 = document.getElementById("change-text3");
const changetext4 = document.getElementById("change-text4");
const changetext5 = document.getElementById("change-text5"); //脳死でこうするしかなかったけど、もっと効率いい実装の仕方あったら教えてください...

detail1.addEventListener("toggle", function(){
    if (detail1.open){
        changetext1.textContent = "remove"
    }
    else{
        changetext1.textContent = "add";
    }
},false);
detail2.addEventListener("toggle", function(){
    if (detail2.open){
        changetext2.textContent = "remove"
    }
    else{
        changetext2.textContent = "add";
    }
},false);
detail3.addEventListener("toggle", function(){
    if (detail3.open){
        changetext3.textContent = "remove"
    }
    else{
        changetext3.textContent = "add";
    }
},false);
detail4.addEventListener("toggle", function(){
    if (detail4.open){
        changetext4.textContent = "remove"
    }
    else{
        changetext4.textContent = "add";
    }
},false);
detail5.addEventListener("toggle", function(){
    if (detail5.open){
        changetext5.textContent = "remove"
    }
    else{
        changetext5.textContent = "add";
    }
},false);
