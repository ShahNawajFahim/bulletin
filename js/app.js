const loadCategories = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`;
        const res = await fetch(url);
        const data = await res.json();
        displayNav(data.data.news_category);

    }
    catch (error) {
        console.log(error);
    }

}

// nav onclick function ...... 
const displayNav = nav => {
    const navContainer = document.getElementById('category-container');
    nav.forEach(bulletin => {
        const bulletinDiv = document.createElement('div');
        bulletinDiv.innerHTML = `<h5 onclick="laodspecific(${bulletin.category_id})" > ${bulletin.category_name}</h5>`;
        navContainer.appendChild(bulletinDiv);

    })
}
const laodspecific = async (category_id) => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`;
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data.data);
    }
    catch (error) {
        console.log(error);
    }
}

// card showing... 
const displayNews = news => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';

    news.forEach(info => {
        const newsDiv = document.createElement('div');
        // console.log(info)
        info.details = info.details.slice(0, 400) + ".....";

        newsDiv.classList.add('card');
        newsDiv.innerHTML = `
        <div class="row g-0">
        <div class="col-md-4">
            <img src="${info.image_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${info.title}</h5>
                <p>${info.details}</p>
                <div class='d-flex '>
                <div>
                <img src="${info.author.img}" class='rounded' alt="" style: 'height=30px width= 30px'>
                <p class="card-text"><small class="">${info.author.name} </small></p>
                </div>
                <div class='px-5 pt-3'><p class="card-text"><i class="fa-regular fa-eye"></i>:${info.total_view}</p></div>
                <div class='px-5 pt-3 '>
                <button id='show-more' class='bg-dark text-white rounded'onclick="laodNewsModal('${info._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal">Show More</button>
                </div>
                </div>
            </div>
        </div>
    </div>`
        newsContainer.appendChild(newsDiv);

    })
    toggleSpin(false);
    //Result count code 
    const result = newsContainer.childNodes.length;

    const resultNumber = document.getElementById("result-number");
    const resultCon = document.getElementById("result-cont")
    resultCon.classList.remove("d-none");
    resultNumber.innerText = result;
    if (result == 0) {
        resultNumber.innerText = `No`;
    }


}

// news fetching... 
const laodNewsModal = async (_id) => {

    try {
        const url = `https://openapi.programming-hero.com/api/news/${_id}`;
        const res = await fetch(url);
        const data = await res.json();
        displayNewsModal(data.data);
    }
    catch (error) {
        console.log(error);
    }

}

// for opening modal... 
const displayNewsModal = modals => {
    console.log(modals);
    const modalTitle = document.getElementById('exampleModalLabel');
    modals.forEach(element => {

        modalTitle.innerText = element.title;
        const modalDetails = document.getElementById('news_category');
        modalDetails.innerHTML = `
        <p> Details: ${element.details} </p>
        <p>  ${element.thumbnail_url} </p>
        <p> Author: ${element.author.name ? element.author.name : 'Anonymous Author'} </p> 
        <p> Total_view: ${element.total_view ? element.total_view : 'No view of this news.'} </p> `
    });


}

// for spin loadTIme.. 

document.getElementById('category-container').addEventListener('click', function () {
    toggleSpin(true);


})

const toggleSpin = isLoading => {
    const loadingSpin = document.getElementById('spin');
    if (isLoading) {
        loadingSpin.classList.remove('d-none');
    }
    else {
        loadingSpin.classList.add('d-none');
    }
}






laodNewsModal();

loadCategories();





