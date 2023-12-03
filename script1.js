const appId="ae6e4c38";
const appKey="6b972806473ec164aba6e683a319067a";
const baseURL=`https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}`;
const recipeCont=document.querySelector("#recipe-container");
const textsearch=document.querySelector("#texts");
const fin=document.querySelector(".btn");
const load=document.querySelector("#loading");
let but=document.getElementById("mybtn");
window.onscroll=function(){scrollFunction()};
function scrollFunction(){
    if(document.body.scrollTop>20 || document.documentElement.scrollTop>20){
        but.style.display="block";
    }else{
        but.style.display="none";
    }
}
function topFunction(){
    document.body.scrollTop=0;
    document.documentElement.scrollTop=0;

}
fin.addEventListener("click",()=>loadRecipes(textsearch.value)

)
textsearch.addEventListener("keyup",(e)=>{
    const val=textsearch.value;
    if(e.keyCode==13){
        loadRecipes(val)
    }
});
const toggleload=(element,isShow)=>{
    element.classList.toggle("hide",isShow);
}
function loadRecipes(type="paneer"){
    toggleload(load,false);
    const url=baseURL+`&q=${type}`;
    fetch(url)
        .then(res=>res.json())
        .then(data=>{
            renderRecipes(data.hits);
            toggleload(load,true);
        })
        .catch((error)=>toggleload(load,true));

}
loadRecipes();
const getrecipesteps=(ingredientLines=[])=>{
    let str="";
    for(var step of ingredientLines){
        str=str+`<li>${step}</li>`;
    }
    return str;
};
const renderRecipes=(recipeList=[])=>{
    recipeCont.innerHTML="";
    recipeList.forEach(recipeObj=>{
        const {
            label: recipeTitle,
            ingredientLines,
        image:recipeImage}=recipeObj.recipe;
        const recipestr=getrecipesteps(ingredientLines);
    const htmls=`<div class="recipe">
        <div class="title">${recipeTitle}</div>
        <div class="image">
            <img src="${recipeImage}"/>
        </div>
        <div class="text">
            <ul>
                ${recipestr};
            </ul>
        </div>
    </div>`;
    recipeCont.insertAdjacentHTML
("beforeend",htmls);
    });
}