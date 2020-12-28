const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable / Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing Joke to Voice RSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: '09f6410451224fa6abb42dcf679b3b94',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API
async function getJoke() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} + ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        tellMe(joke);
        toggleButton();
    } catch (error) {
        console.log('uh oh', error)
    }
}

// Event Listeners
button.addEventListener('click', getJoke);
audioElement.addEventListener('ended', toggleButton);