const openModalBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('myModal');
const eventform = document.getElementById('eventForm');
const newsform = document.getElementById('newsForm');
const itemList = document.getElementById('itemList');
const newsBtn = document.getElementById('newsBtn');
const eventBtn = document.getElementById('eventBtn');
const jokeBtn = document.getElementById('jokeBtn');
const quoteBtn = document.getElementById('quoteBtn');
const thankyou = document.getElementById('thankyou');
const buttonContainer = document.getElementById('buttonContainer');
const closeModalBtn = document.querySelector('.closeBtn');

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('subscribeForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        
        var emailInput = document.getElementById('emailInput');
        var errorMessage = document.getElementById('error-message');
        
        if (emailInput.checkValidity() === false) {
            errorMessage.textContent = 'Please enter a valid email address.';
        } else if (document.querySelectorAll('div.block').length === 0) {
            errorMessage.textContent = 'Please add at least one block.';
        }
        
        else {
            errorMessage.textContent = '';
            console.log('Button clicked');
            createPostRequest();
        }
    });

    const subscribeBtn = document.getElementById('subscribeBtn');
    const subscribeForm = document.getElementById('subscribeForm');

    // Button clicked as alternative
    subscribeBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default form submission
        
        var emailInput = document.getElementById('emailInput');
        var errorMessage = document.getElementById('error-message');
        
        if (emailInput.checkValidity() === false) {
            errorMessage.textContent = 'Please enter a valid email address.';
        } else if (document.querySelectorAll('div.block').length === 0) {
            errorMessage.textContent = 'Please add at least one block.';
        } else {
            subscribeForm.style.visibility = 'hidden';
            thankyou.style.visibility = 'visible';
            errorMessage.textContent = '';
            console.log('Button clicked');
            createPostRequest();
        }
    });


});



closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    resetModal();
});

openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

eventBtn.addEventListener('click', () => {
    buttonContainer.style.display = 'none';
    eventform.style.display = 'block';
});

newsBtn.addEventListener('click', () => {
    buttonContainer.style.display = 'none';
    newsform.style.display = 'block';
});

// Modified add to list logic for blocks instead of list items
jokeBtn.addEventListener('click', () => {
    console.log("joke button clicked");
    addBlock("Dad Joke", "joke", "no description");
    modal.style.display = 'none';
    resetModal();
});

quoteBtn.addEventListener('click', () => {
    addBlock("Inspirational Quote", "quote", "no description");
    modal.style.display = 'none';
    resetModal();
});

eventform.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = "Local events in " + document.getElementById('eventInput').value;
    if (value) {
        addBlock(value, "events", document.getElementById('eventInput').value);
        modal.style.display = 'none';
        document.getElementById('eventInput').value = '';
        resetModal();
    }
});

newsform.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = "Latest headlines from " + document.getElementById('newsInput').value;
    if (value) {
        addBlock(value, "news", document.getElementById('newsInput').value);
        modal.style.display = 'none';
        document.getElementById('newsInput').value = '';
        resetModal();
    }
});

function addBlock(text, typeText, descriptionText) {
    const block = document.createElement('div');
    block.className = 'block';
    block.draggable = true;

    const optionDiv = document.createElement('div');
    optionDiv.className = 'type';
    optionDiv.textContent = typeText;
    optionDiv.style.display = 'none';

    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'description';
    descriptionDiv.textContent = descriptionText;
    descriptionDiv.style.display = 'none';

    const content = document.createTextNode(text);
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteBtn';
    deleteBtn.textContent = 'x';

    deleteBtn.addEventListener('click', () => {
        blocksContainer.removeChild(block);
    });

    block.appendChild(content);
    block.appendChild(optionDiv); // Append optionDiv to block
    block.appendChild(descriptionDiv); // Append descriptionDiv to block
    block.appendChild(deleteBtn);

    block.addEventListener('dragstart', handleDragStart, false);
    block.addEventListener('dragover', handleDragOver, false);
    block.addEventListener('drop', handleDrop, false);
    block.addEventListener('dragend', handleDragEnd, false);

    blocksContainer.appendChild(block);
}

let draggedBlock = null;

function handleDragStart(e) {
    draggedBlock = this;
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragStart(e) {
    draggedBlock = this;
    e.dataTransfer.effectAllowed = 'move';
    this.classList.add('dragging');
}

function handleDragOver(e) {
    e.preventDefault();

    if (this === draggedBlock) return; // Prevent further execution if the dragged block is the same as the current block

    // Determine position:
    const bounding = this.getBoundingClientRect();
    const offset = bounding.y + (bounding.height / 2);
    
    if (e.clientY - offset > 0) {
        this.style.borderBottom = 'solid 4px black';
        this.style.borderTop = '';
    } else {
        this.style.borderTop = 'solid 4px black';
        this.style.borderBottom = '';
    }
}

function handleDrop(e) {
    e.stopPropagation();

    if (this === draggedBlock) return; // Prevent further execution if the dragged block is the same as the current block

    // Determine position:
    const bounding = this.getBoundingClientRect();
    const offset = bounding.y + (bounding.height / 2);
    
    if (e.clientY - offset > 0) {
        this.style.borderBottom = '';
        blocksContainer.insertBefore(draggedBlock, this.nextSibling);
    } else {
        this.style.borderTop = '';
        blocksContainer.insertBefore(draggedBlock, this);
    }
}

function handleDragEnd(e) {
    this.classList.remove('dragging');

    // Clear borders:
    [].forEach.call(blocksContainer.children, function (block) {
        block.style.borderTop = '';
        block.style.borderBottom = '';
    });
}

// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const value = document.getElementById('itemInput').value;
//     if (value) {
//         const li = document.createElement('li');
//         li.textContent = value;
//         itemList.appendChild(li);
//         modal.style.display = 'none';
//         document.getElementById('itemInput').value = '';
//         resetModal();
//     }
// });

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        resetModal();
    }
});

function resetModal() {
    buttonContainer.style.display = 'block';
    eventform.style.display = 'none';
    newsform.style.display = 'none';
}



// // Modified add to list logic for blocks instead of list items
// subscribeBtn.addEventListener('click', (e) => {
//     subscribeBtn.display = 'none';
//     thankyou.style.visibility = 'visible';
//     console.log("subscribe pressed");
//     createPostRequest();
// });

function createPostRequest() {

    let Blocks = [];
    let Email = document.getElementById('emailInput').value;

    const blockDivs = document.querySelectorAll('div.block');

    blockDivs.forEach((blockDiv) => {
        // Create a new object for this block
        thistype = blockDiv.querySelector('.type').textContent;
        let blockObject;

        if (thistype === "events") {
            blockObject = {
                type: "events",
                params: {
                    zip: blockDiv.querySelector('.description').textContent,
                    persona: "music"
                }
            };
        } else if (thistype === "news") {
            blockObject = {
                type: "news",
                params: {
                    source_id: blockDiv.querySelector('.description').textContent
                }
            };
        } else {
            blockObject = {
                type: thistype,
            };
        }

        console.log(blockObject);
        // Add the new object to the Blocks array
        Blocks.push(blockObject);
    });

    let subscription = {
        "subscription_id": 1,
        "subscriber": Email,
        "frequency": "daily",
        "template": "standard",
        "tone": "casual",
        "blocks": Blocks
      };

      console.log(subscription);

    // Use fetch API to post this to your Flask API
    fetch('https://lobster-app-tpwzh.ondigitalocean.app/documents', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription), // Convert the JavaScript object to a JSON string
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // alert('Document uploaded successfully!');
    })  
    .catch((error) => {
        console.error('Error:', error);
        // alert('An error occurred while uploading the document.');
    });
    
}
