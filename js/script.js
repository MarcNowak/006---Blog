// Generate TITLE CLICK HANDLER

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
  optArticleTagsSelector = '.post-tags .list';


// Function GENERATE TITLE LINKS

function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */

  // do stałej titleList przypisujemy wszystkie wyszukane elementy
  // zawarte w stałem optTitleListSelector
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

// Function GENERATE TAGS

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

// Function TAG CLICK HANDLER

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

addClickListenersToTags();
generateTitleLinks();
generateTags();
