
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