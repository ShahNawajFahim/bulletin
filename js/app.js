const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayNav(data.data.news_category);

}
const displayNav = nav => {
    const navContainer = document.getElementById('category-container');
    nav.forEach(bulletin => {
        const bulletinDiv = document.createElement('div');
        bulletinDiv.innerHTML = `<h5 onclick="laodspecific(${bulletin.category_id})" > ${bulletin.category_name}</h5>`;
        navContainer.appendChild(bulletinDiv);

    })
}
const laodspecific = async (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);

}


const displayNews = news => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';

    news.forEach(info => {
        const newsDiv = document.createElement('div');

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
                <div class='px-5 pt-3'><p class="card-text">views:${info.total_view}</p></div>
                <div class='px-5 pt-3 '>
                <button id='show-more' class='bg-dark text-white rounded'onclick="laodNewsModal('${info._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal">Show More</button>
                </div>
                </div>
            </div>
        </div>
    </div>`
        newsContainer.appendChild(newsDiv);

    })
}


const laodNewsModal = async (_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsModal(data.data);

}


const displayNewsModal = modals => {
    console.log(modals);
    const modalTitle = document.getElementById('exampleModalLabel');
    modals.forEach(element => {

        modalTitle.innerText = element.title;
        const modalDetails = document.getElementById('news_category');
        modalDetails.innerHTML = `
        <p> Details: ${element.details} </p>
        <p>  ${element.thumbnail_url} </p>
        <p> Author: ${element.author.name} </p> 
        <p> Total_view: ${element.total_view} </p> `
    });


}








laodNewsModal();

loadCategories();





