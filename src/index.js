import Config from '../config.json'
import App from './app'
import './scss'

const app = new App(Config)

document.addEventListener('DOMContentLoaded', () => app.init())
