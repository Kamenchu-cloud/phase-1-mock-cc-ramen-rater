document.addEventListener('DOMContentLoaded', () => {
    const ramenMenu = document.getElementById('ramen-menu');
    const ramenDetail = document.getElementById('ramen-detail');
    const newRamenForm = document.getElementById('new-ramen');
  
    // Function to fetch all ramens from the API
    const fetchAllRamens = async () => {
      try {
        const response = await fetch('http://localhost:3000/ramens');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching ramens:', error);
      }
    };
  
    // Function to render all ramen images
    const renderRamenMenu = async () => {
      const ramens = await fetchAllRamens();
  
      ramens.forEach(ramen => {
        const ramenImage = document.createElement('img');
        ramenImage.src = ramen.image;
        ramenImage.alt = ramen.name;
        ramenImage.addEventListener('click', () => showRamenDetails(ramen));
        ramenMenu.appendChild(ramenImage);
      });
    };
  
    // Function to display ramen details 
    const showRamenDetails = (ramen) => {
      ramenDetail.innerHTML = `
        <img class="detail-image" src="${ramen.image}" alt="${ramen.name}" />
        <h2 class="name">${ramen.name}</h2>
        <h3 class="restaurant">${ramen.restaurant}</h3>
        <h3>Rating:</h3>
        <p>
          <span id='rating-display'>${ramen.rating}</span> / 10
        </p>
        <h3>Comment:</h3>
        <p id='comment-display'>
          ${ramen.comment}
        </p>
      `;
    };
  
    // Event listener for the new-ramen form submission
    newRamenForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const newName = document.getElementById('new-name').value;
      const newRestaurant = document.getElementById('new-restaurant').value;
      const newImage = document.getElementById('new-image').value;
      const newRating = document.getElementById('new-rating').value;
      const newComment = document.getElementById('new-comment').value;
  
      // validation 
      if (newName && newRestaurant && newImage && newRating && newComment) {
        // Create a new ramen object
        const newRamen = {
          name: newName,
          restaurant: newRestaurant,
          image: newImage,
          rating: parseInt(newRating), 
          comment: newComment,
        };
  
        // Send a POST request to create a new ramen
        await fetch('http://localhost:3000/ramens', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newRamen),
        });
  
        // Render the updated ramen menu
        renderRamenMenu();
      } else {
        alert('Please fill in all fields');
      }
    });
  
    // Initial rendering of the ramen menu
    renderRamenMenu();
  });
  