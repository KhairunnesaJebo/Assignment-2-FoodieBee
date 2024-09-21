

const loadallProduct = () => {

    let cartlist = JSON.parse(localStorage.getItem("cartkey")) || [];
    const count = document.getElementById("cart-count");
    count.innerHTML = cartlist.length;

    fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=b')
        .then(res=>res.json())
        .then(data=> {
            displayData(data.meals);
        })
        .catch((err) => {
            console.log(err);
        })
    
};

loadallProduct();

 
 const displayData = (foodData) => {
     const container = document.getElementById("card-container");
 
    //  document.getElementById("fooddetails").innerHTML = "";
 
     container.innerHTML = "";

     console.log(foodData);
 
     if (foodData == null) {
         const h2 = document.createElement("h2")
         h2.innerText = "Not Found!";
         container.appendChild(h2);
 
     }
     else {
         foodData.forEach(food => {
             const div = document.createElement("div");
             div.classList.add("col-md-6");
             div.classList.add("col-lg-4");
             div.classList.add("col-xl-3");

            div.innerHTML = cardComponent1(food); 
     
             container.appendChild(div);
     
             });
     }

    //  container.scrollIntoView({behavior: "smooth"} );
 };


 function cardComponent1(food) {
    return `<div class="rounded position-relative fruite-item">
                <div class="fruite-img">
                    <img src=${food.strMealThumb} class="img-fluid w-100 rounded-top" alt="">
                </div>
                <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">${food.strCategory}</div>
                <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                    <h5>${food.strMeal}</h5>
                    <p>${food.strArea} food</p>
                    <button onclick="foodDescription('${food.idMeal}')" type="button" class="btn border border-secondary text-secondary rounded-pill mb-3 py-1" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                    <div class="d-flex justify-content-between flex-lg-wrap">
                        <p class="text-dark fw-bold mb-0 pt-1">Tk 380</p>
                        <a onclick="haldleAddToCart('${food.strMealThumb}','${food.strMeal}}',380)" id="addTocart" class="btn border border-secondary rounded-pill py-1 text-primary"><i class="fa fa-shopping-bag me-2 text-primary"></i>Add to cart</a>
                    </div>
                </div>
            </div>
            `
 };


 const haldleAddToCart = (img,name,price) => {
    let cartlist = JSON.parse(localStorage.getItem("cartkey")) || [];
    console.log(cartlist);
    let food = {
        img: img,
        name: name,
        price: price,
        quantity: 1,
        total: price
    }

    const foundItem = cartlist.find(item => item.name == food.name);    

    if (foundItem == undefined) {
        if (cartlist.length < 11) {
            cartlist.push(food);
        }
        else {
            const container = document.getElementById("card-container");
            container.innerHTML = "";
     
            const h2 = document.createElement("h2")
            h2.innerText = "Sorry, you can not add more than 11 item!";
            container.appendChild(h2);

        }
        localStorage.setItem("cartkey",JSON.stringify(cartlist));
    
        const count = document.getElementById("cart-count");
        count.innerHTML = cartlist.length;
    }
};



 function search(){

    const searchValue = document.getElementById("search").value;

    console.log(searchValue);
 
    document.getElementById("search").value = "";
 
 
     fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
     .then((res)=>res.json())
     .then((data) => {
         displayData(data.meals);
     })
     .catch((err) => {
         console.log(err);
     })
     
 };


 function fetchData() {
    const dropDown = document.getElementById("myDropdown");
    const selectedValue = dropDown.value;

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedValue}`)
     .then((res)=>res.json())
     .then((data) => {
         displayData(data.meals);
     })
     .catch((err) => {
         console.log(err);
     })

};

 
 const foodDescription = (id) => {
 
     const detailsContainer = document.getElementById("food-details");
 
     detailsContainer.innerHTML = "";
 
     console.log(id);
     fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
     .then(res=>res.json())
     .then(data=> {
         data.meals.forEach(meal => {
             const div = document.createElement("div");
             div.classList.add("cardfood-details");
     
             div.innerHTML = `
             <img class = "card-img" src=${meal.strMealThumb} alt="" />
             <h2 class = "card-title">${meal.strMeal}</h2>
             <h4 class = "card-title2">Ingredients</h4>         
             `;
 
             for (let i = 1; i <= 20; i++)
             {   const key = `strIngredient${i}`;
                 const ingred = `<li class="list-item">${meal[key]}</li>`;
                 if (meal[key] != null && meal[key] != "") {
                     div.innerHTML = div.innerHTML + ingred;
                     console.log(ingred);
                 }
             }
             detailsContainer.appendChild(div);
 
             })
         detailsContainer.scrollIntoView({behavior: "smooth"} );
     });
 
     
 };


 