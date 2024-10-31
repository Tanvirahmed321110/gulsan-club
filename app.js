const presedientCanidate = document.getElementById('president-canidate');
let clickedCount = 0;
let anyPresidentClicked = false;

if (presedientCanidate) {
    const confirmButton = document.querySelector('.confirm-btn');
    confirmButton.setAttribute('disabled', true); // Ensure confirm button is disabled initially

    const pVoteButtons = presedientCanidate.querySelectorAll('button[title="vote"]');
    const voteButtons = document.querySelectorAll('.directors button[title="vote"]');

    function checkConditions() {
        anyPresidentClicked = Array.from(pVoteButtons).some(button => button.classList.contains('active'));
        console.log("anyPresidentClicked:", anyPresidentClicked);
        console.log("clickedCount:", clickedCount, "of", voteButtons.length);

        if (clickedCount === voteButtons.length && anyPresidentClicked) {
            confirmButton.removeAttribute('disabled');
            console.log('Conditions met: Confirm button enabled');
        }
    }

    // Vote button logic for directors
    voteButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            if (!btn.classList.contains('active')) {
                clickedCount++;
            }
            btn.innerHTML = '<img src="./images/check-mark.png" alt="Voted" style="width: 50px; height: 50px;">';
            btn.classList.add('active');

            checkConditions(); // Check conditions after each click
        });
    });

    // President vote button logic
    pVoteButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            pVoteButtons.forEach(pBtn => pBtn.disabled = (pBtn !== btn));
            btn.classList.add('active');

            checkConditions(); // Check conditions after each president click
        });
    });

    confirmButton.addEventListener('click', function () {
        const sure = confirm('Are you sure');
        if (sure) {
            window.location.href = './thanks.html';
        }
    });

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
