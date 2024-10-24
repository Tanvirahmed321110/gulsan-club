
// vote button
const voteButtons = document.querySelectorAll('button[title="vote"]')
function voteF() {
    voteButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            this.innerText = "Voted"
            btn.classList.add('active')
            const unvoteButton = this.closest('tr').querySelector('button[title="no vote"]');
            unvoteButton.disabled = true;
        })
    })
}

voteF()


// unvote
const novoteButtons = document.querySelectorAll('button[title="no vote"]')
function noVoteF() {
    novoteButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            this.innerText = 'No Vote'
            btn.classList.add('no-vote')
            const voteBtn = this.closest('tr').querySelector('button[title="vote"]')
            voteBtn.disabled = true
        })
    })
}

noVoteF()






// counter
function counter() {
    // Select all elements with the class 'total-vote'
    const voteElements = document.querySelectorAll('.total-vote');

    // Function to animate the counting from 0 to the final value
    voteElements.forEach(el => {
        const maxVote = parseInt(el.innerText); // Get the final value
        let currentVote = 0; // Start from 0
        const increment = Math.ceil(maxVote / 150);
        const speed = 60; // Set the delay between increments (in milliseconds)

        const updateCounter = () => {
            currentVote += increment; // Increment the counter
            if (currentVote > maxVote) {
                currentVote = maxVote; // If the current vote exceeds the max, stop at max
            }
            el.innerText = currentVote; // Update the element's text with the current vote

            if (currentVote < maxVote) {
                setTimeout(updateCounter, speed); // Delay the next increment
            }
        };

        // Start the counter animation
        setTimeout(updateCounter, speed);
    });
}




// sort function
function sortTableByVotes(element) {
    const tableBody = document.getElementById(element);
    const rows = [...tableBody.querySelectorAll('tr')]; // Convert NodeList to an array

    // Sort rows by total votes in descending order
    rows.sort((a, b) => {
        const voteA = parseInt(a.querySelector('.total-vote').innerText, 10);
        const voteB = parseInt(b.querySelector('.total-vote').innerText, 10);
        return voteB - voteA; // Sort in descending order
    });

    // Append sorted rows back to the table body
    rows.forEach(row => tableBody.appendChild(row));

    // Update the row numbers after sorting
    rows.forEach((row, index) => {
        const titleCell = row.querySelector('.title.fw-bolder.fs-xxl');
        if (titleCell) {
            titleCell.innerText = index + 1; // Update the index to reflect new order
        }
    });
}

function updateVotes() {
    counter(); // Simulate counter update
    sortTableByVotes('voteTableBody'); // Call the sorting function
}


// When page reload
document.addEventListener('DOMContentLoaded', function () {
    counter(); // Call the counter function
    sortTableByVotes('present-table'); // Call the sorting function
    setInterval(updateVotes, 15000)
});
