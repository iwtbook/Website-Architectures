// Grab all of the buttons that will act as our links
let buttons = [
  document.getElementById('button-first-child'),
  document.getElementById('button-second-child'),
  document.getElementById('button-third-child'),
  document.getElementById('button-fourth-child'),
  document.getElementById('button-fifth-child'),
  document.getElementById('button-sixth-child'),
  document.getElementById('svg-firstChild'),
  document.getElementById('svg-secondChild'),
  document.getElementById('svg-thirdChild'),
  document.getElementById('svg-fourthChild'),
  document.getElementById('svg-fifthChild'),
  document.getElementById('svg-sixthChild'),
];

// Grab the content sections we're going to hide / copy later
let mainContent = document.getElementById('main-section-content');
let navSection = document.getElementById('navigation-section');
let template = document.getElementById('template-child');

let ordinalWords = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];

// Using a for loop instead of a forEach loop so that I can use the loop number
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', () => {
    // Create a copy of the HTML inside the <template> element, give it an ID attribute
    let newContent = template.content.cloneNode(true).children[0];
    newContent.setAttribute('id', `${ordinalWords[i % 6]}-child-content`);

    // Add a new title to the <h1> element
    let newTitle = `${ordinalWords[i % 6]} Child`;
    newTitle = newTitle.charAt(0).toUpperCase() + newTitle.slice(1);
    newContent.childNodes[1].innerText = newTitle;

    // Bind event listener to <button>
    newContent.childNodes[5].childNodes[1].addEventListener('click', () => {
      newContent.remove();
      mainContent.style.display = 'block';
      navSection.style.display = 'block';

      // Update location on architecture SVG
      document.getElementById(`svg-${ordinalWords[i % 6]}Child`).classList.remove('currLocation');
      document.getElementById('svg-rootNode').classList.add('currLocation');

      // Update the URL with our new page state
      history.back();
    });

    // Hide the current content and navigation buttons
    mainContent.style.display = 'none';
    navSection.style.display = 'none';

    // Insert the new content before the current content that we just hid
    mainContent.insertAdjacentElement('beforeBegin', newContent);

    // Update location on architecture SVG
    document.getElementById('svg-rootNode').classList.remove('currLocation');
    document.getElementById(`svg-${ordinalWords[i % 6]}Child`).classList.add('currLocation');

    // Update the URL with our new page state
    history.pushState({}, newTitle, `${ordinalWords[i % 6]}_child`);
  });
}
