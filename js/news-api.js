

apikey = 'a6e3927e03b68f9e1b73d16124863e92';
category = 'general';
url = 'https://gnews.io/api/v4/top-headlines?category=' + category + '&lang=es&country=any&max=10&q="medio ambiente" OR "energias renovables"&apikey=' + apikey;
wrapper = document.getElementById("html-wrapper");
myHTML = "";

function parseDate(commitDate) {
    const year = dayjs(commitDate).get("year");
    const month = dayjs(commitDate).get("month") + 1;
    const day = dayjs(commitDate).get("date");
    const hour = dayjs(commitDate).get("hour");
    const minutes = dayjs(commitDate).get("minute");
    return `${day}-${month}-${year} a las ${hour}:${minutes}`;
  }

fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (obj) {
    console.log(obj)
    articles = obj.articles;
    // filter repeated news
    const filteredArticles = articles.filter(
        (thing, index, self) =>
          index ===
          self.findIndex(
            (t) => t.description === thing.description || t.title === thing.title
          )
      );
    for (i = 0; i < filteredArticles.length; i++) {
        myHTML += `<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-5" style="margin-top:50px">
        <div class="btc_blog_indx_box_wrapper btc_blog_padder">
            <div class="blog-image-wrapper">
                <a
                    href=${filteredArticles[i].url}>
                    <img src=${filteredArticles[i].image ?? "/images/breaking-news.webp"} class="img-noticias" alt="imagen noticias" loading="lazy" >
            </div>
            <div class="btc_blog_indx_cont_wrapper blog-image-wrapper2">
                <p>${parseDate(filteredArticles[i].publishedAt)}</p>
                <h5 class="project-title">${filteredArticles[i].title}</h5>
                <span class="texto-noticias-internacionales">${filteredArticles[i].content}..</span> </a>
            </div>
        </div>
    </div>`
    wrapper.innerHTML = myHTML;
    }
  });