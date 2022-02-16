const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';
const quoteDisplayElemt = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quote-input');
const timerElement = document.getElementById('timer');


const result_container = document.querySelector('.result-container');
const result = document.querySelector('.result');
const yes_btn = document.querySelector('.result-container .btn-yes');

quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElemt.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');
    
    let correct = true
    arrayQuote.forEach((characterSpan , index) => {
        const character = arrayValue[index];

        if(character == null) {
            characterSpan.classList.remove('incorrect');
            characterSpan.classList.remove('correct')
            correct = false;
        } else if (character === characterSpan.innerText){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        } else {
            characterSpan.classList.add('incorrect');
            characterSpan.classList.remove('correct')
            correct = false;
        }
    })
    if(correct) {
    result_container.style.display = "inline-block";
    result.innerText = getTimerTime();
    
    yes_btn.addEventListener('click', () => {
        result_container.style.display = "none";
        renderNewQuote();
    })

    }
})




function getRandomQuote() {
   return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote(){
    const quote = await getRandomQuote();
    quoteDisplayElemt.innerText = "";
    quote.split('').forEach(character => {
        const characterSpan  = document.createElement('span');
        characterSpan.innerText = character;
        quoteDisplayElemt.appendChild(characterSpan)

    })
    quoteInputElement.value = null;
    startTimer();
}


let startTime;

function startTimer(){
    timerElement.innerText = 0;
    startTime = new Date();
    setInterval(() => {
        timerElement.innerText = getTimerTime()
    } , 1000)


}

startTimer();

function getTimerTime(){
    return Math.floor((new Date() - startTime) / 1000)
}

renderNewQuote()
