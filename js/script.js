// 01 - Generate Title Click Handler
// 02 - Generate Title Links

// 03 - Generate Tags
// 04 - Generate Tag Click Handler
// 05 - Generate Add Click Listeners to Tags

// 06 - Generate Authors
// 07 - Generate Author Click Handler
// 08 - Generate Add Click Listeners to Authors
//

// 01 - Generate Title Click Handler

const titleClickHandler = function (event) {
  event.preventDefault();

  const clickedElement = this;

  // console.log('Link was clicked');
  // console.log('event: ', event);

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE]] add class 'active' to the clicked link */

  clickedElement.classList.add('active');

  // console.log('clickedElement', clickedElement);
  // console.log('clickedElement (with plus): ' + clickedElement);

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  // console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  // console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
};

const

  // do stałej optArticleSelector przypisujemy wszystkie elementy
  // z klasą .post
  optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';


// 02 - Generate Title Links

function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */

  // do stałej titleList przypisujemy wszystkie wyszukane elementy
  // zawarte w stałej optTitleListSelector
  // titleList = optTitleListSelector = .titles
  const titleList = document.querySelector(optTitleListSelector);

  titleList.innerHTML = '';
  // console.log('wyczyszczona lista artykułów: ', titleList);

  /* for each article */

  // do stałej articles wyszukujemy i przypisujemy wszystkie wyszukane
  // elementy zawarte w stałej optArticleSelector
  // articles = optArticleSelector = .post
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  // console.log('wyświetlam custom selector: ', customSelector);
  // console.log('wyświetlam custom optArticleSelector: ', optArticleSelector + customSelector);

  let html = '';

  for (let article of articles) {

    /* get the article id */

    // do stałej articleId przypisujemy wszystkie ID arykułów
    const articleId = article.getAttribute('id');
    // console.log('article ID: ', articleId);


    /* find the title element */
    /* get the title from the title element */

    // do zmiennej articleTitle przypisujemy i podstawiamy wyszukany
    // tytuł artykułu zapisany w zmiennej optTitleSelector
    // czyli element z klasą .post-tutle
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    // console.log('przypisany tytuł artykułu: ', articleTitle);


    /* create HTML of the link */
    // KROK 1: const linkHTML = '<li><a href="#"><span></span></a></li>';

    // KROK 2: const linkHTML = '<li><a href="#' + '"><span>' + '</span></a></li>';

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    // console.log('wygenerowany link artykułu: ', linkHTML);

    /* insert link into titleList */
    // titleList.innerHTML = titleList.innerHTML + linkHTML;
    // console.log('Sposób 1 - nie polecany: ', titleList);

    /* insert link into html variable */
    // html = html + linkHTML;
    html += linkHTML;
  }

  titleList.innerHTML = html;
  // console.log('zawartość zmiennej html: ', html);

  const links = document.querySelectorAll('.titles a');
  // console.log('co zawiera stała links: ', links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

// 03 - Generate Tags

function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const titleList = article.querySelector(optArticleTagsSelector);
    // console.log('zawartość titleList: ', titleList);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    // console.log('zawartość articleTags: ', articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    // console.log('podzielone tagi articleTagsArray: ', articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      // console.log('wyświetlam każdy tagów z osobna: ', tag);

      /* generate HTML of the link */
      const tagLinkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      // console.log('wyświetla link do każdego taga: ', tagLinkHTML);

      /* add generated code to html variable */
      html += tagLinkHTML;

      /* END LOOP: for each tag */

      /* insert HTML of all the links into the tags wrapper */
      titleList.innerHTML = titleList.innerHTML + ' ' + tagLinkHTML;
    }
    /* END LOOP: for every article: */
  }
}

// 04 - Generate Tag Click Handler

function tagClickHandler(event) {

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const tagLinksActiveClass = document.querySelectorAll('a.active[href^="#tag-"]');
  // podpowiedź

  /* START LOOP: for each active tag link */
  for (let tagLinkActiveClass of tagLinksActiveClass) {

    /* remove class active */
    tagLinkActiveClass.classList.remove('active');
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinksHref = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let tagLinkHref of tagLinksHref) {

    /* add class active */
    tagLinkHref.classList.add('active');

    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}


// 05 - Generate Add Click Listeners to Tags

function addClickListenersToTags() {
  /* find all links to tags */

  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {

    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }
}


// 06 - Generate Authors

function generateAuthors() {
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* [DONE] find authors wrapper */
    const titleList = article.querySelector(optArticleAuthorSelector);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get author from data-author attribute */
    const authorTags = article.getAttribute('data-author');
    // console.log(articleAutors);

    /* [DONE] generate HTML of the link */
    const authorLinkHTML = '<span>by </span><a href="#author-' + authorTags + '"><span>' + authorTags + '</span></a>';
    // console.log(tagLinkHTML);

    /* add generated code to html variable */
    html += authorLinkHTML;

    /* [DONE] insert HTML of all the links into the authors wrapper */
    titleList.innerHTML = titleList.innerHTML + authorLinkHTML;

    /* END LOOP: for every article: */
  }
}

// 07 - Generate Author Click Handler

const authorClickHandler = function (event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag was clicked!!!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);

  // /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#author-', '');

  /* find all author links with class active */
  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */

  /* remove class active */
  for (let authorLink of authorLinks) {
    authorLink.classList.remove('active');
  }

  /* END LOOP: for each active author link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const authorLinksHref = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found author link */

  /* add class active */
  for (let authorLinkHref of authorLinksHref) {
    authorLinkHref.classList.add('active');
  }

  /* END LOOP: for each found author link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + tag + '"]');
};


// 08 - Generate Add Click Listeners to Authors

function addClickListenersToAuthors() {
  /* find all links to tags */

  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each link */
  for (let authorLink of authorLinks) {

    /* add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
  }
}


addClickListenersToTags();
generateTags();
generateTitleLinks();
generateAuthors();
addClickListenersToAuthors();

