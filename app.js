
const presedientCanidate = document.getElementById('president-canidate')
if (presedientCanidate) {
    const pVoteButtons = presedientCanidate.querySelectorAll('button[title="vote"]')
    const voteButtons = document.querySelectorAll('button[title="vote"]')



    // Function to disable buttons
    function toggleButtons(buttons, shouldDisable, excludeButton = null) {
        buttons.forEach(button => {
            if (button !== excludeButton) {
                button.disabled = shouldDisable;
            }
        });
    }


    pVoteButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            pVoteButtons.forEach(otherBtn => {
                if (otherBtn !== btn) {
                    otherBtn.disabled = true
                }
            })
        })
    })




    function checkAllRowsForPrint() {
        const rows = document.querySelectorAll('tbody .single.vote');
    }




    // Vote button logic
    function voteF() {
        // other vote buttons
        voteButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                btn.innerHTML = '<img src="./images/check-mark.png" alt="Voted" style="width: 50px; height: 50px;">'
                btn.classList.add('active')
                checkAllRowsForPrint()
            })
        })
    }



    // No vote button logic
    // function noVoteF() {
    //     pNovoteButtons.forEach(btn => {
    //         btn.addEventListener('click', function () {

    //             this.innerText = 'No Vote';
    //             this.classList.add('no-vote');

    //             // Disable other no-vote buttons and all vote buttons
    //             toggleButtons(pVoteButtons, true);
    //             toggleButtons(pNovoteButtons, true, this);

    //             hasVoted = true;
    //             checkAllRowsForPrint()
    //         });
    //     });

    //     // other no vote buttons
    //     novoteButtons.forEach(btn => {
    //         btn.addEventListener('click', function () {
    //             this.innerText = "No Voted"
    //             btn.classList.add('no-vote')

    //             const voteButton = this.closest('tr').querySelector('button[title="vote"]')
    //             voteButton.disabled = true
    //             checkAllRowsForPrint()
    //         })
    //     })
    // }

    // checkAllRowsForPrint()
    voteF();
    // noVoteF();
}





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
