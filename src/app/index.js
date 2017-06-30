import page from 'page';
import Game from './game';

export default class App {

  constructor(config = {}) {
    this.title = config.title || ''
    this.description = config.description || ''
    this.element = document.querySelector(config.element) || null
    this.router = page
    this.game = new Game({
      container: this.element || null,
      words: config.words || []
    }, this.router.redirect)
    console.log('App:', this)
  }

  init() {
    console.log('Loading...')
    window.addEventListener('load', () => {
      console.log('Loaded!')

      // Initialise Routes
      this.router('/', (context) => this.indexHandler(context))
      this.router('/play', (context) => this.playHandler(context))
      this.router('/win', (context) => this.winHandler(context))
      this.router('/lose', (context) => this.loseHandler(context))
      this.router('*', (context) => this.notFoundHandler(context))
      this.router()

    })
  }

  render(html = '') {
    this.element.innerHTML = html
  }

  indexHandler(context) {
    this.render(`
      <div class="u--centred">

        <div class="branding">
          <h1 class="branding-text" data-animation="fadeInUp" data-animation-delay="0s">
            ${this.title}
          </h1>
          <p class="branding-strapline" data-animation="fadeInUp" data-animation-delay="0.25s">
            ${this.description}
          </p>
        </div>

        <div data-animation="fadeInUp" data-animation-delay="0.5s">
          <a class="button" href="/play" title="Play now!">New Game</a>
        </div>

      </div>
    `)
  }

  playHandler(context) {
    this.game.reset()

    this.render(`
      <div class="u--centred">

        <div class="game">
          <div class="game-header">
            <h1>Guess the word!</h1>
          </div>
          <div class="game-board">
            <canvas class="game-board__canvas" width="320" height="180"></canvas>
            <div class="game-board__current-word"></div>
          </div>
          <div class="game-aside">
            <form class="game-form">
              <label class="" for="game-control">Enter a letter</label>
              <input class="" id="game-control" type="text" maxlength="1" autofocus />
              <button class="button" type="submit">Submit</button>
              <div class="game-controls__errors"></div>
            </form>
            <div class="game-notices">
              <div class="game-notices__attempts"></div>
              <div class="game-notices__letters"></div>
            </div>
          </div>
        </div>

      </div>
    `)

    this.game.start()
  }

  winHandler(context) {
    let html = '';
    if (this.game.currentGuess === this.game.currentWord) {
      html = `
        <div class="u--centred">

          <h1 data-animation="fadeInUp" data-animation-delay="0s">
            Victory!
          </h1>

          <p data-animation="fadeInUp" data-animation-delay="0.25s">
            You correctly guessed the word
          </p>
          <p data-animation="fadeInUp" data-animation-delay="0.5s">
            <strong>${this.game.currentWord}</strong>
          </p>

          <div data-animation="fadeInUp" data-animation-delay="0.75s">
            <a class="button" href="/play" title="Play now!">New Game</a>
          </div>

        </div>
      `
    } else {
      html = `
        <div class="u--centred">

          <h1 data-animation="fadeInUp" data-animation-delay="0s">
            CHEAT DETECTED !!!
          </h1>

          <p data-animation="fadeInUp" data-animation-delay="0.25s">
            You're not afraid of a simple game of Hangman, are you?
          </p>

          <div data-animation="fadeInUp" data-animation-delay="0.5s">
            <a class="button" href="/play" title="Man up and try again">Man Up</a>
          </div>

        </div>
      `
    }

    this.render(html)

  }

  loseHandler(context) {
    this.render(`
      <div class="u--centred">

        <h1 data-animation="fadeInUp" data-animation-delay="0s">
          Game Over
        </h1>

        <p data-animation="fadeInUp" data-animation-delay="0.25s">
          You failed to guess the word.
        </p>

        <div data-animation="fadeInUp" data-animation-delay="0.5s">
          <a class="button" href="/play" title="Play now!">New Game</a>
        </div>

      </div>
    `)
  }

  notFoundHandler(context) {
    this.render(`
      <div class="u--centred">

        <h1 data-animation="fadeInUp" data-animation-delay="0s">
          Not Found
        </h1>

        <p data-animation="fadeInUp" data-animation-delay="0.25s">
          An error occured while loading <strong>${context.path}</strong>.
        </p>

        <div data-animation="fadeInUp" data-animation-delay="0.5s">
          <a class="" href="/">Go Home</a>
        </div>

      </div>
    `)
  }

}
