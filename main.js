let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp; // global variable all the functions in this code can use it

//get total
function getTotal() {
    if (price.value !== '') {
        let result = 
            +price.value + 
            +taxes.value + 
            +ads.value - 
            +discount.value;
        
        total.innerHTML = result; // Display the total
        total.style.background = 'green';
    } else {
        total.innerHTML = ''; // Clear total if price is empty
        total.style.background = '#f10';
    }
}

//create product
let dataPro = localStorage.product ? JSON.parse(localStorage.product) : [];

submit.onclick = function() {
    let newPro = {
        title: title.value.toLowerCase(), // we need it later in the search
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML, // it is not an input that's why we use innerHTML
        count: count.value,
        category: category.value.toLowerCase(), // we need it later in the search
    };

    //count
     
    if (mood === 'create') {
        if (newPro.count > 1) { // we can create many products at once
            for (let i = 0; i < newPro.count; i++) {
                dataPro.push(newPro); // in this line, we create product
            }
        } else {
            dataPro.push(newPro); // push = add
        }
    } else {
        dataPro[tmp] = newPro;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    }

    //save localStorage
    localStorage.setItem('product', JSON.stringify(dataPro));

    clearData();
    showData();
};

//clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = ''; 
    count.value = '';
    category.value = '';
}

//read
 function showData() {
    getTotal();
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].category}</td>
            <td>
                <button onclick="updateData(${i})" id="update">update</button>
            </td>
            <td>
                <button onclick="deleteData(${i})" id="delete">delete</button>
            </td>
        </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;
    
    let btnDelete = document.getElementById('deleteAll');
    btnDelete.innerHTML = dataPro.length > 0 ? 
        `<button onclick="deleteAll()">delete All(${dataPro.length})</button>` : '';
}
showData();

//delete
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.setItem('product', JSON.stringify(dataPro));
    showData();
}

//delete All
function deleteAll() {
    localStorage.clear();
    dataPro = [];
    showData();
}

//update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    ads.value = dataPro[i].ads;
    taxes.value = dataPro[i].taxes;
    category.value = dataPro[i].category;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({ top: 0, behavior: 'smooth' });
}

//search
let SearchMood = 'title';
function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id === 'searchTitle') {
        SearchMood = 'title';
        
    } else {
        SearchMood = 'category';
        
    }
    search.placeholder='search by'+SearchMood;
    search.focus();
    search.value='';// it will empty the search bar
    showData();// it will show searchs in the table
}

function searchData(value) {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        if ((SearchMood === 'title' && dataPro[i].title.includes(value)) || 
            (SearchMood === 'category' && dataPro[i].category.includes(value))) {
            table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].category}</td>
                <td>
                    <button onclick="updateData(${i})" id="update">update</button>
                </td>
                <td>
                    <button onclick="deleteData(${i})" id="delete">delete</button>
                </td>
            </tr>`;
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

//clean data 

