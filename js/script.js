const searchBtn = document.getElementById('search')
const mealList=document.getElementById('meal')
const mealDetailCon = document.querySelector('.meal_details_content');
const meal_details = document.querySelector('.meal_details');
const closebtn = document.querySelector('.close_btn');
const searchTxt=document.getElementById('input')
const txt= document.querySelector('.txt');
searchBtn.addEventListener('click',getMealList);
mealList.addEventListener('click',getRecipe);
closebtn.addEventListener('click',() => {
    meal_details.style.display = 'none';  
})

console.log(mealDetailCon); 
function getMealList(){
    let searchInputTxt = searchTxt.value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`).then(Response=>Response.json())
    .then(data=>{
       let html='';
       if(data.meals){
        data.meals.forEach(meal=> {
            console.log("${meal.idMeal}")
            text=`<h2>Great Your meal can be:</h2>`
            html+=`
            <div class="meal_item" data-id="${meal.idMeal}">
            <div class="meal_img">
                <img src="${meal.strMealThumb}" alt="food"/>
            </div>
            <div class="meal_name">
                <h3>${meal.strMeal}</h3>
                <a href="#" class="recipe_btn">Get Recipe</a>
            </div>
        </div>
            `;
        });
        mealList.classList.remove('notfound');
       }
       else{
        html+="Sorry,We didn't find any meal";
        mealList.classList.add('notfound');
       }
       txt.innerHTML=text;
       mealList.innerHTML=html;
    });
}


function getRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe_btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data=>mealRecipeModel(data.meals));
    }
 }
 function mealRecipeModel(meal){
    meal=meal[0];
    let html=`<h2 class="r_title">${meal.strMeal}</h2>
    <p class="r_cat">${meal.strCategory}</p>
    <div class="r_inst">
        <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
            <div class="r_img">
                <img src="${meal.strMealThumb}" alt=""/>
            </div>
            <div class="r_link">
                <a href="${meal.strYoutube}" target="_blank">Watch Video Tutorial</a>
            </div>
    </div>`;

searchTxt.value='Enter your ingredient';
mealDetailCon.innerHTML=html;
meal_details.style.display = 'block';
 }


