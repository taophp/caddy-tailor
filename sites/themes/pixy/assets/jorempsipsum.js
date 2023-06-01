/**
 * Replace a DOM element by a random article from Wikipedia in the browser's language
 * @param {string} element - The DOM element to replace by the article.
 */
function jowiki(element) {
  const languageCode = navigator.language.substring(0, 2);
  const url = `https://${languageCode}.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&rnlimit=1&callback=processRandomArticle`;

  window.processRandomArticle = function(data) {
    const pageId = data.query.random[0].id;
    const htmlUrl = `https://${languageCode}.wikipedia.org/w/api.php?action=parse&pageid=${pageId}&format=json&callback=processArticleHTML`;
    
    window.processArticleHTML = function(data) {
      const htmlContent = data.parse.text["*"];
      const title = data.parse.title;
      const containerElement = document.createElement('div');
      const headingElement = document.createElement('h1');
      headingElement.textContent = title;
      containerElement.appendChild(headingElement);
      containerElement.innerHTML+= htmlContent;

      const maxParagraphs = element.dataset.joParagraphs;
      if (maxParagraphs) {
        const paragraphs = containerElement.getElementsByTagName('p');
        for (let i = maxParagraphs; i < paragraphs.length; i++) {
          paragraphs[i].style.display = 'none';
        }
      }

      element.appendChild(containerElement);

      delete window.processRandomArticle;
      delete window.processArticleHTML;
    };

    const scriptElement = document.createElement('script');
    scriptElement.src = htmlUrl;
    document.body.appendChild(scriptElement);
  };

  const scriptElement = document.createElement('script');
  scriptElement.src = url;
  document.body.appendChild(scriptElement);
}

/**
 * Create a placeholder image and add it to the specified element
 * @param {HTMLElement} element - The element to which the image should be added
 */

function joimg(element) {
  const width = element.dataset.joWidth || 200;
  const height = element.dataset.joHeight || 200;
  const text = element.dataset.joText || `${width} x ${height}`;
  const bgColor = element.dataset.joBgColor || '#f1f1f1';
  const photo = element.dataset.joPhoto || false;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!photo) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
  }

  ctx.font = 'bold 20px sans-serif';
  ctx.fillStyle = '#777';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);

  const img = new Image();
  img.src = canvas.toDataURL();
  element.appendChild(img);

  if (photo) {
    const photoUrl = `https://loremflickr.com/${width}/${height}/${photo}`;
    element.style.background = `no-repeat url(${photoUrl})`;
  }
}

window.addEventListener('load', function() {
  const wikiTags = document.querySelectorAll('[data-jo="wiki"]');
  for (const tag of wikiTags) {
      jowiki(tag);
  }
  const imgTags = document.querySelectorAll('[data-jo="img"]');
  for (const tag of imgTags) {
    joimg(tag);
  }
});
  