const updateTotal = (cartlist) => {

    let sum = 0;

    for (const element of cartlist) {
        sum += element.total;
    }

    console.log(sum);

    const subTotal = document.getElementById("subtotalSum");
    // const shipping = document.getElementsByClassName("shippingCost");
    const allTotal = document.getElementById("totalSum");

    subTotal.innerText = sum;

    console.log(subTotal);

    allTotal.innerText = sum + 120;

    console.log(allTotal);

}

function loadallCart() {

    let cartlist = JSON.parse(localStorage.getItem("cartkey")) || [];
    console.log(cartlist);

    const count = document.getElementById("cart-count");
    count.innerHTML = cartlist.length;

    const cartContainer = document.querySelector("#cart-menu tbody");
    cartContainer.innerHTML = "";

    updateTotal(cartlist);

    cartlist.forEach((food, index) => {

        cartContainer.insertAdjacentHTML( 'beforeend', `
            <tr>
                <th scope="row">
                    <div class="d-flex align-items-center">
                        <img src=${food.img} class="img-fluid me-5 rounded-circle" style="width: 80px; height: 80px;" alt="">
                    </div>
                </th>
                <td>
                    <p class="mb-0 mt-4">${food.name}</p>
                </td>
                <td>
                    <p class="price mb-0 mt-4">Tk ${food.price}</p>
                </td>
                <td>
                    <div class="input-group quantity mt-4" style="width: 100px;">
                        <div class="input-group-btn">
                            <button data-index="${index}" class="decrease btn btn-sm btn-minus rounded-circle bg-light border" >
                            <i class="fa fa-minus"></i>
                            </button>
                        </div>
                        <span class="quantity mt-1 mx-2">${food.quantity}</span>
                        <div class="input-group-btn">
                            <button data-index="${index}" class="increase btn btn-sm btn-plus rounded-circle bg-light border">
                                <i class="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </td>
                <td>
                    <p class="singleTotalprice mb-0 mt-4">Tk ${food.total}</p>
                </td>
                <td>
                    <button data-index="${index}" class="closeItem btn btn-md rounded-circle bg-light border mt-4" >
                        <i class="fa fa-times text-danger"></i>
                    </button>
                </td>
            
            </tr>
            `)

    });



    const increaseBtns = document.querySelectorAll(".increase");
    const decreaseBtns = document.querySelectorAll(".decrease");
    const closeBtns = document.querySelectorAll(".closeItem");


    closeBtns.forEach(button => {
        button.addEventListener("click", () => {
            const index = button.dataset.index;

            cartlist.splice(index, 1);
            
            localStorage.setItem("cartkey", JSON.stringify(cartlist));
            loadallCart();
        });
    });


    
    decreaseBtns.forEach(button => {
        button.addEventListener("click", () => {
            const index = button.dataset.index;

            if (cartlist[index].quantity > 1) {
                cartlist[index].quantity--;
                cartlist[index].total -= cartlist[index].price;
                localStorage.setItem("cartkey", JSON.stringify(cartlist));
                loadallCart();
            }
           
        });
    });

    increaseBtns.forEach(button => {
        button.addEventListener("click", () => {
            const index = button.dataset.index;

            cartlist[index].quantity++;
            cartlist[index].total += cartlist[index].price;
            localStorage.setItem("cartkey", JSON.stringify(cartlist));
            
            loadallCart();
        });
    });
}

loadallCart();
