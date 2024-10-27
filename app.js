
// vote button
const voteButtons = document.querySelectorAll('button[title="vote"]')
if (voteButtons) {
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
}

voteF()


// unvote
const novoteButtons = document.querySelectorAll('button[title="no vote"]')
if (novoteButtons) {
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
}

noVoteF()




// counter function with a promise to handle asynchronous updates
// function counter() {
//     return new Promise(resolve => {
//         // Select all elements with the class 'total-vote'
//         const voteElements = document.querySelectorAll('.total-vote');
//         let completed = 0; // To track when all counters are done

//         // Function to animate the counting from 0 to the final value
//         voteElements.forEach(el => {
//             const maxVote = parseInt(el.innerText); // Get the final value
//             let currentVote = 0; // Start from 0
//             const increment = Math.ceil(maxVote / 120); // Increment based on vote
//             const speed = 60; // Set the delay between increments (in milliseconds)

//             const updateCounter = () => {
//                 currentVote += increment; // Increment the counter
//                 if (currentVote > maxVote) {
//                     currentVote = maxVote; // Stop at max if currentVote exceeds max
//                 }
//                 el.innerText = currentVote; // Update the element's text with current vote

//                 if (currentVote < maxVote) {
//                     setTimeout(updateCounter, speed); // Continue incrementing
//                 } else {
//                     completed += 1; // Mark this counter as done
//                     if (completed === voteElements.length) {
//                         resolve(); // Resolve when all counters finish
//                     }
//                 }
//             };

//             // Start the counter animation
//             setTimeout(updateCounter, speed);
//         });
//     });
// }


// // change vote
// function changeVotes() {
//     const voteElements = document.querySelectorAll('.total-vote');


//     voteElements.forEach((el, index) => {
//         setTimeout(() => {
//             const currentVotes = parseInt(el.innerText, 10);


//             const newVote = currentVotes + Math.floor(Math.random() * 10) + 1;
//             el.innerText = newVote; // Set the new vote value
//         }, index * 2000);
//     });
// }



// function sortTableByVotes(element) {
//     const tableBody = document.getElementById(element);
//     const rows = [...tableBody.querySelectorAll('tr')]; // Convert NodeList to an array


//     rows.sort((a, b) => {
//         const voteA = parseInt(a.querySelector('.total-vote').innerText, 10);
//         const voteB = parseInt(b.querySelector('.total-vote').innerText, 10);
//         return voteB - voteA;
//     });


//     rows.forEach(row => tableBody.appendChild(row));


//     rows.forEach((row, index) => {
//         const titleCell = row.querySelector('.title.fw-bolder.fs-xxl');
//         if (titleCell) {
//             titleCell.innerText = index + 1; // Update the index to reflect new order
//         }
//     });
// }


// async function updateVotes() {
//     await counter();
//     changeVotes();
//     sortTableByVotes('present-table');
// }

// // When the page reloads
// document.addEventListener('DOMContentLoaded', function () {
//     updateVotes(); // Run on page load
//     setInterval(changeVotes, 15000); // Update votes every 15 seconds
// });




// counter function with a promise to handle asynchronous updates
function counter() {
    return new Promise(resolve => {
        const voteElements = document.querySelectorAll('.total-vote');
        let completed = 0;

        voteElements.forEach(el => {
            const maxVote = parseInt(el.innerText);
            let currentVote = 0;
            const increment = Math.ceil(maxVote / 120);
            const speed = 60;

            const updateCounter = () => {
                currentVote += increment;
                if (currentVote > maxVote) currentVote = maxVote;
                el.innerText = currentVote;

                if (currentVote < maxVote) {
                    setTimeout(updateCounter, speed);
                } else {
                    completed += 1;
                    if (completed === voteElements.length) resolve();
                }
            };

            setTimeout(updateCounter, speed);
        });
    });
}

// change vote and sort rows by votes immediately after
function changeVotesAndSort() {
    const voteElements = document.querySelectorAll('.total-vote');

    voteElements.forEach((el, index) => {
        setTimeout(() => {
            const currentVotes = parseInt(el.innerText, 10);
            const newVote = currentVotes + Math.floor(Math.random() * 3) + 1;
            el.innerText = newVote;

            // Sort table after each vote update
            sortTableByVotes('present-table');
        }, index * 2000);
    });
}

// Sort function to reorder rows based on votes
function sortTableByVotes(element) {
    const tableBody = document.getElementById(element);
    const rows = [...tableBody.querySelectorAll('tr')];

    rows.sort((a, b) => {
        const voteA = parseInt(a.querySelector('.total-vote').innerText, 10);
        const voteB = parseInt(b.querySelector('.total-vote').innerText, 10);
        return voteB - voteA;
    });

    rows.forEach(row => tableBody.appendChild(row));

    rows.forEach((row, index) => {
        const titleCell = row.querySelector('.title.fw-bolder.fs-xxl');
        if (titleCell) titleCell.innerText = index + 1;
    });
}

// Async function to update votes and sort the table
async function updateVotes() {
    await counter();
    changeVotesAndSort();
}

// When the page reloads
document.addEventListener('DOMContentLoaded', function () {
    updateVotes();
    setInterval(changeVotesAndSort, 3500); // Change and sort votes every 3.5 seconds
});
