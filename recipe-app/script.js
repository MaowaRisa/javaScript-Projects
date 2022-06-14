const mealsEl = document.getElementById("meals");
const favoriteContainer = document.getElementById("fav-meals");

const mealPopup = document.getElementById("meal-popup");
const mealInfoEl = document.getElementById("meal-info");
const popupCloseBtn = document.getElementById("close-popup");

const searchTerm =document.getElementById("search-term");
const searchBtn =document.getElementById("search");


async function getRandomMeal(){
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const randomData = await res.json();
    const randomMeal = randomData.meals[0];

    addMeal(randomMeal, true);
}
getRandomMeal();
fetchFavMeals();

async function getMealById(id){
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
    const resData = await res.json();
    const meal = resData.meals[0];

    return meal;
}
async function getMealsBySearch(term){
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + term);

    const respData = await resp.json();
    const meals = respData.meals;
    return meals
} 

function addMeal(mealData, random = false){
 
    const meal = document.createElement(`div`);
    meal.classList.add('meal');
    // console.log(mealData);
    meal.innerHTML = `
        <div class="meal-header">
        ${random ? `
            <span class="random">
            Random Recipe
            </span>
        `: ``}
        
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn" onclick="">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `
    const btn = meal.querySelector(".meal-body .fav-btn")
    btn.addEventListener("click", () =>{
        if(btn.classList.contains("active")){
            removeMealFromLS(mealData.idMeal);
            btn.classList.remove("active");
        }else{
            addMealToLS(mealData.idMeal)
            btn.classList.toggle("active");
        }
        fetchFavMeals();
    });
    // show meal when click on image or 1st child
    meal_header = meal.getElementsByClassName('meal-header')[0];
    meal_body_h4 = meal.getElementsByClassName('meal-body')[0].getElementsByTagName("h4")[0];
    meal_header.addEventListener("click", ()=>{
        showMealInfo(mealData);
    })
    meal_body_h4.addEventListener("click", ()=>{
        showMealInfo(mealData);
    })
    mealsEl.appendChild(meal);
}
// localStorage.removeItem("mealIds");
function addMealToLS(mealId){
    const mealIds = getMealsFromLS();
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}
function removeMealFromLS(mealId){
    const mealIds = getMealsFromLS();
    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter(id => id!= mealId)));
}
function getMealsFromLS(){
    const mealIds = JSON.parse(localStorage.getItem("mealIds"));
    return mealIds === null ? []: mealIds;
}
 async function fetchFavMeals(){
    // clean the container
    favoriteContainer.innerHTML = "";
    const mealIds = getMealsFromLS();

    for (let i=0; i<mealIds.length; i++){
        const mealId = mealIds[i];
        meal =  await getMealById(mealId);
        addMealFav(meal);
    }
}
function addMealFav(mealData){
    const favMeal = document.createElement(`li`);
    favMeal.innerHTML = `
        <img 
            class = "mini-img"
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        />
        <span>${mealData.strMeal}</span>
        <button class="clear"><i class="fa-solid fa-rectangle-xmark"></i></button>
    `;
    const btn = favMeal.querySelector(".clear");
    btn.addEventListener("click", ()=>{
        removeMealFromLS(mealData.idMeal);
        fetchFavMeals();
    });

    mini_img = favMeal.getElementsByTagName("img")[0]
    mini_img.addEventListener("click", ()=>{
        showMealInfo(mealData);
    });

     
    favoriteContainer.appendChild(favMeal);
}

searchBtn.addEventListener("click", async ()=>{
    mealsEl.innerHTML = '';
    const search = searchTerm.value;

    const meals = await getMealsBySearch(search);
    if(meals){
        meals.forEach((meal)=>{
            addMeal(meal);
        });
    }else{
        mealsEl.innerHTML = "<span>There is no food item you searched</span>"
    }
});
function showMealInfo(mealData){
    // clean the perious meal info
    mealInfoEl.innerHTML = "";
    const meal = document.createElement('div');

    //Show the meal ingredients
    const ingredients = [] 
    for(let i=1; i<=20; i++ ){
        if(mealData['strIngredient'+i]){
            ingredients.push(`${mealData['strIngredient'+i]} / ${mealData['strMeasure'+i]}`);
        }else{
            break;
        }
    }
    meal.innerHTML = `
        <h1>${mealData.strMeal}</h1>
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" />
    
        <p>
        ${mealData.strInstructions}
        </p>
        <h3>Ingredients:</h3>
        <ul>
            ${ingredients.map(ing =>`<li>${ing}</li>`).join("")}
        </ul>
        
    `;
    mealInfoEl.appendChild(meal);
    mealPopup.classList.remove("hidden");
    
}
popupCloseBtn.addEventListener("click", ()=>{
    mealPopup.classList.add("hidden");
});