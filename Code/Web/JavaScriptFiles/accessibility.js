// Declaring certain variables
const increaseTextSizeButton = document.getElementById('increaseTextSize');
const decreaseTextSizeButton = document.getElementById('decreaseTextSize');
const fontSizeDisplay = document.getElementById('currentFontSize');

let currentFontSize = 28;

// Function to update the font size displayed (with help from generative AI)
function updateFontSizeDisplay() {
    fontSizeDisplay.textContent = currentFontSize; // Update the font size display
}

    if (increaseTextSizeButton) {
        // Function to increase text size
        function increaseTextSize() {
            const headings = document.querySelectorAll('h1[id]:not(.accessibilityFeatures h1), h2[id]:not(.accessibilityFeatures h2), h3[id]:not(.accessibilityFeatures h3), h3, button[class]:not(.accessibilityFeatures button), h1[class], h2[class], h3[class]');  // All headings and also accessibility features, however some are excluded
            const paragraphs = document.querySelectorAll('p[id], p[class], p'); // Select all paragraphs
            const navLinks = document.querySelectorAll('nav a, div[id]');  // Select all anchor tags inside nav and div tags with an ID
            const bannerText = document.querySelectorAll('.banner');  // Select the .banner text
            const olElements = document.querySelectorAll('ol.numSize');  // Select all ordered lists with class 'numSize'
            const liElements = document.querySelectorAll('ol.numSize li');  // Select all list items inside those ordered lists

            // Increase font size for each heading
            headings.forEach(heading => {
                let currentSize = window.getComputedStyle(heading).fontSize;
                currentSize = parseFloat(currentSize);  // Get the current font size in px
                heading.style.fontSize = (currentSize + 2) + 'px';  // Increase the font size by 2px
            });
        
            // Increase font size for each paragraph
            paragraphs.forEach(paragraph => {
                let currentSize = window.getComputedStyle(paragraph).fontSize;
                currentSize = parseFloat(currentSize);
                paragraph.style.fontSize = (currentSize + 2) + 'px';
            });

            // Increase font size for each nav component and div tag
            navLinks.forEach(link => {
                let currentSize = window.getComputedStyle(link).fontSize;
                currentSize = parseFloat(currentSize);
                link.style.fontSize = (currentSize + 2) + 'px';  // Increase font size for navigation links
            });
    
            // Increase font size for the banner text
            bannerText.forEach(banner => {
                let currentSize = window.getComputedStyle(banner).fontSize;
                currentSize = parseFloat(currentSize);
                banner.style.fontSize = (currentSize + 2) + 'px';  // Increase font size for the banner text
            });

            // Increase font size for the ordered list and its items
             olElements.forEach(ol => {
                let currentSize = window.getComputedStyle(ol).fontSize;
                currentSize = parseFloat(currentSize);
                ol.style.fontSize = (currentSize + 2) + 'px';  // Increase font size for the ordered list itself
            });

            // Increase font size for the list elemements
            liElements.forEach(li => {
                let currentSize = window.getComputedStyle(li).fontSize;
                currentSize = parseFloat(currentSize);
                li.style.fontSize = (currentSize + 2) + 'px';  // Increase font size for each list item
            });

            // Update font size displayed on the screen 
            currentFontSize +=2;
            updateFontSizeDisplay();
        }
    
        // Attach the event listener to the button
        increaseTextSizeButton.addEventListener('click', increaseTextSize);
    } else {
        console.error('Increase Text Size button not found!');
    }

    if (decreaseTextSizeButton) {
        // Function to decrease text size
        function decreaseTextSize() {
            const headings = document.querySelectorAll('h1[id]:not(.accessibilityFeatures h1), h2[id]:not(.accessibilityFeatures h2), h3[id]:not(.accessibilityFeatures h3), h3, button[class]:not(.accessibilityFeatures button), h1[class], h2[class], h3[class]');  // All headings and also accessibility features, however some are excluded
            const paragraphs = document.querySelectorAll('p[id], p[class], p'); // Select all paragraphs
            const navLinks = document.querySelectorAll('nav a, div[id]'); // Select all anchor tags inside nav and div tags with an ID
            const bannerText = document.querySelectorAll('.banner');  // Select the .banner text
            const olElements = document.querySelectorAll('ol.numSize');  // Select all ordered lists with class 'numSize'
            const liElements = document.querySelectorAll('ol.numSize li');  // Select all list items inside those ordered lists

            // Decrease font size for each heading 
            headings.forEach(heading => {
                let currentSize = window.getComputedStyle(heading).fontSize;
                currentSize = parseFloat(currentSize);  // Get the current font size in px
                heading.style.fontSize = (currentSize - 2) + 'px';  // Decrease the font size by 2px
            });
        
            // Decrease font size for each paragraph
            paragraphs.forEach(paragraph => {
                let currentSize = window.getComputedStyle(paragraph).fontSize;
                currentSize = parseFloat(currentSize);
                paragraph.style.fontSize = (currentSize - 2) + 'px'; // Decrease font size for each paragraph
            });

            // Decrease font size for each nav component and div tag
            navLinks.forEach(link => {
                let currentSize = window.getComputedStyle(link).fontSize;
                currentSize = parseFloat(currentSize);
                link.style.fontSize = (currentSize - 2) + 'px';  // Decrease font size for navigation links
            });
    
             // Decrease font size for the banner text
            bannerText.forEach(banner => {
                let currentSize = window.getComputedStyle(banner).fontSize;
                currentSize = parseFloat(currentSize);
                banner.style.fontSize = (currentSize - 2) + 'px';  // Decrease font size for the banner text
            });

            // Decrease font size for the ordered list and its items
            olElements.forEach(ol => {
                let currentSize = window.getComputedStyle(ol).fontSize;
                currentSize = parseFloat(currentSize);
                ol.style.fontSize = (currentSize - 2) + 'px';  // Decrease font size for the ordered list itself
            });

             // Decrease font size for the list elemements
            liElements.forEach(li => {
                let currentSize = window.getComputedStyle(li).fontSize;
                currentSize = parseFloat(currentSize);
                li.style.fontSize = (currentSize - 2) + 'px';  // Decrease font size for each list item
            });

             // Update font size displayed on the screen 
            currentFontSize -=2;
            updateFontSizeDisplay();
        }
    
        // Attach the event listener to the button
        decreaseTextSizeButton.addEventListener('click', decreaseTextSize);
    } else {
        console.error('Decrease Text Size button not found!');
    }

// Get the button that changes the font style
const changeFontStyleButton = document.getElementById('changeFontStyle');
let isCustomFont = false;
// Function to change the font style
function changeFontStyle() {
    // Check if the body has the custom font style
    if (isCustomFont) {
        // If it's already Courier New monospace, switch it back to Arial
        document.body.style.fontFamily = 'Arial, sans-serif';
    } else {
        // Otherwise, change it to Courier New monospace
        document.body.style.fontFamily = 'Courier New, monospace';
    }
    isCustomFont = !isCustomFont;
}


// Attach the event listener to the button
changeFontStyleButton.addEventListener('click', changeFontStyle);

document.getElementById('changeContrast').addEventListener('click', function() {
    // Check if the body already has the 'high-contrast' class
    if (document.body.classList.contains('high-contrast')) {
        // If it does, remove it to switch back to default colors
        document.body.classList.remove('high-contrast');
    } else {
        // If it doesn't, add the 'high-contrast' class to apply high contrast colors
        document.body.classList.add('high-contrast');
    }
});

// Displaying characters one by one (with help from generative AI)
document.addEventListener('DOMContentLoaded', function() {
    const introText = document.getElementById('intro');
    const fullText = introText.textContent;
    introText.textContent = ''; // Clear the initial text content

    const characters = fullText.split(''); // Split the text into an array of characters
    let currentCharIndex = 0; // Start with the first character

    // Function to display the characters one by one
    function displayNextCharacter() {
        if (currentCharIndex < characters.length) {
            introText.textContent += characters[currentCharIndex]; // Add the next character
            currentCharIndex++; // Move to the next character
        } else {
            clearInterval(intervalId); // Stop the interval when all characters are displayed
        }
    }

    // Set an interval to display the next character every 30 milliseconds
    const intervalId = setInterval(displayNextCharacter, 30);
});