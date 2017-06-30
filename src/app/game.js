export default class Game {

  constructor(config = {}, redirect) {
    this.elements = {
      container: config.container || null
    }
    this.words = config.words || []
    this.currentWord = this.words[Math.floor(Math.random() * this.words.length)],
    this.currentGuess = new Array(this.currentWord.length + 1).join('_'),
    this.step = 0,
    this.usedLetters = [],
    this.maxGuesses = 10,
    this.redirect = redirect || null
    console.log('Game:', this)
  }

  reset() {
    this.currentWord = this.words[Math.floor(Math.random() * this.words.length)]
    this.currentGuess = new Array(this.currentWord.length + 1).join('_')
    this.step = 0
    this.usedLetters = []
  }

  start() {
    console.log('Start Game', this)

    this.bindUI()
      .then(() => {

        this.elements.input.value = ''
        this.elements.input.focus()
        this.elements.currentGuess.textContent = this.currentGuess

        this.elements.form.addEventListener('submit', (event) => {
          event.preventDefault();
          if (this.elements.input.value.length === 0) {
            console.log('No value')
          } else if (this.elements.input.value.length === 1) {
            this.checkLetter(this.elements.input.value)
          } else {
            console.log('Entered value is too long')
          }
        })

      })

  }

  checkLetter(letter = '') {
    let position = 0,
        matches = []

    if (this.usedLetters.indexOf(letter) !== -1) {
      console.log('You have already used this letter!')
    } else {
      console.log('Check:', letter)

      this.usedLetters.push(letter)

      while ((position = this.currentWord.indexOf(letter, position)) > -1) {
        matches.push(++position);
      }

      if (matches.length === 0) {
        console.log('Letter not found')
        this.step = ++this.step
        this.updateCanvas(this.step)
      } else {
        console.log('Letter found!')
        for (let i = 0; i < matches.length; i++) {
          this.currentGuess = this.currentGuess.substring(0, matches[i] - 1) + letter + this.currentGuess.substring(matches[i]);
        }
      }

      this.elements.input.value = ''
      this.elements.input.focus()
      this.elements.currentGuess.textContent = this.currentGuess

      console.log('Updated Guess:', this.currentGuess)
      console.log('Step:', this.step)

      if (this.step >= this.maxGuesses) {
        console.log('Game Over!!!')
        this.redirect('/lose')
      } else if (this.currentGuess !== this.currentWord) {
        console.log('Word is not complete... Have another guess!')
      } else {
        console.log('Word is complete!!!')
        this.redirect('/win')
      }

    }
  }

  updateCanvas(step = 0) {
    const ctx = this.elements.canvas.getContext('2d')
    ctx.beginPath();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;

    const drawLine = (ctx, fromX, fromY, toX, toY) => {
      ctx.moveTo(fromX, fromY)
      ctx.lineTo(toX, toY)
      ctx.stroke()
    }

    const drawCircle = (ctx, fromX, fromY, radius, angle) => {
      ctx.beginPath()
      ctx.arc(fromX, fromY, radius, angle, Math.PI*2, true)
      ctx.stroke()
    }

    switch (parseInt(step)) {
      case 1:
        // Bottom Frame
        drawLine(ctx, 10, 170, 300, 170)
      break

      case 2:
        // Left Frame
        drawLine(ctx, 10, 10, 10, 170)
      break

      case 3:
        // Top Frame
        drawLine(ctx, 10, 10, 150, 10)
      break

      case 4:
        // Rope
        drawLine(ctx, 150, 10, 150, 30)
      break

      case 5:
        // Head
        drawCircle(ctx, 150, 40, 10, 0)
      break

      case 6:
        // Torso
        drawLine(ctx, 150, 50, 150, 95)
      break

      case 7:
        // Left Arm
        drawLine(ctx, 150, 55, 130, 85)
      break

      case 8:
        // Right Arm
        drawLine(ctx, 150, 55, 170, 85)
      break

      case 9:
        // Left Leg
        drawLine(ctx, 150, 95, 165, 130)
      break

      case 10:
        // Right Leg
        drawLine(ctx, 150, 95, 135, 130)
      break
    }
  }

  bindUI() {
    return new Promise(resolve => {
      this.elements.attempts = this.elements.container.querySelector('.game-notices__attempts')
      this.elements.canvas = this.elements.container.querySelector('canvas')
      this.elements.currentGuess = this.elements.container.querySelector('.game-board__current-word')
      this.elements.errors = this.elements.container.querySelector('.game-controls__errors')
      this.elements.form = this.elements.container.querySelector('.game-form')
      this.elements.input = this.elements.container.querySelector('input')
      this.elements.letters = this.elements.container.querySelector('.game-notices__letters')
      resolve()
    })
  }

}
