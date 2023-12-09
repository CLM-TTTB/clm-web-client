// Create a square button element
const button = document.createElement('button');
button.style.width = '100px';
button.style.height = '100px';
button.style.backgroundColor = 'gray';

// Create an input element for file upload
const input = document.createElement('input');
input.type = 'file';
input.accept = 'image/*';
input.style.display = 'none';

// Add event listener to the button
button.addEventListener('click', () => {
  input.click();
});

// Add event listener to the input element
input.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const imageUrl = e.target.result;

    // Create an image element to display the uploaded image
    const image = document.createElement('img');
    image.src = imageUrl;
    image.style.width = '100%';
    image.style.height = '100%';

    // Replace the button with the uploaded image
    button.parentNode.replaceChild(image, button);
  };

  reader.readAsDataURL(file);
});

// Append the button to the document body
document.body.appendChild(button);
