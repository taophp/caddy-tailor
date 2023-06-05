/**
 * Replace a DOM element by a random article from Wikipedia in the browser's language
 * @param {string} element - The DOM element to replace by the article.
 */
function jowiki(element) {
  // Get the language code of the browser
  const languageCode = navigator.language.substring(0, 2);

  // Construct the URL to retrieve a random article in the browser's language
  const url = 'https://${languageCode}.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&rnlimit=1&callback=processRandomArticle';

  // Define a global function to handle the JSONP response
  window.processRandomArticle = function (data) {
    const pageId = data.query.random[0].id;

    // Construct the URL to the HTML content of the article
    const htmlUrl = 'https://${languageCode}.wikipedia.org/w/api.php?action=parse&pageid=${pageId}&format=json&callback=processArticleHTML';

    // Define a global function to handle the JSONP response
    window.processArticleHTML = function (data) {
      const htmlContent = data.parse.text['*'];
      const title = data.parse.title;

      // Create a container element and set its innerHTML to the HTML content of the article
      const containerElement = document.createElement('div');
      const headingElement = document.createElement('h1');
      headingElement.textContent = title;
      containerElement.appendChild(headingElement);
      containerElement.innerHTML += htmlContent;

      // Limit the length of the text content
      const maxLength = element.dataset.joMaxLength;
      if (maxLength) {
        let totalTextLength = 0;
        const nodeStack = [containerElement];
        while (nodeStack.length > 0 && totalTextLength < maxLength) {
          const node = nodeStack.pop();
          if (node.nodeType === Node.TEXT_NODE) {
            const textContent = node.textContent.trim();
            totalTextLength += textContent.length;
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            const childNodes = Array.from(node.childNodes);
            for (let i = childNodes.length - 1; i >= 0; i--) {
              nodeStack.push(childNodes[i]);
            }
          }
        }
        // Remove remaining nodes if any
        while (nodeStack.length > 0) {
          const node = nodeStack.pop();
          if (node.nodeType === Node.TEXT_NODE) {
            const textContent = node.textContent.trim();
            if (totalTextLength > maxLength) {
              const diff = totalTextLength - maxLength;
              if (textContent.length <= diff) {
                node.parentNode.removeChild(node);
                totalTextLength -= textContent.length;
              } else {
                node.textContent = textContent.slice(0, textContent.length - diff);
                totalTextLength -= diff;
              }
            } else {
              totalTextLength += textContent.length;
            }
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.childNodes.length === 0) {
              node.parentNode.removeChild(node);
            }
          }
        }
      }

      element.appendChild(containerElement);

      // Clean up global functions
      delete window.processRandomArticle;
      delete window.processArticleHTML;
    };

    // Add a script element to the page to load the HTML content of the article
    const scriptElement = document.createElement('script');
    scriptElement.src = htmlUrl;
    document.body.appendChild(scriptElement);
  };

  // Add a script element to the page to load the random article data
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
  const text = element.dataset.joText || '${width} x ${height}';
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
    const photoUrl = 'https://loremflickr.com/${width}/${height}/${photo}';
    element.style.background = 'no-repeat url(${photoUrl})';
    element.style.backgroundSize = 'cover';
  }
}

window.addEventListener('load', function () {
  const wikiTags = document.querySelectorAll('[data-jo="wiki"]');
  for (const tag of wikiTags) {
    jowiki(tag);
  }
  const imgTags = document.querySelectorAll('[data-jo="img"]');
  for (const tag of imgTags) {
    joimg(tag);
  }
});