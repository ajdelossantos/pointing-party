import { Socket, Presence } from 'phoenix';
import updateUsers from './users'

const socket = new Socket('/socket', {params: {username: window.pointingParty.username}})
socket.connect()

let driving = false;

const channel = socket.channel('room:lobby', {})

channel.join()

channel.on('new_card', state => {
  // update UI with state.card
  console.log(state)
  showCard(state);
})

// connect to Presence here
const presence = new Presence(channel)
presence.onSync(() => updateUsers(presence))
// set up your syncDiff function using updateUsers as a callback


const startButton = document.querySelector('.start-button');
startButton.addEventListener('click', event => {
  driving = true;

  // send 'start_pointing' message to the channel here
  channel.push('start_pointing', {});
})

document
  .querySelectorAll('.next-card')
  .forEach(elem => {
    elem.addEventListener('click', event => {
    // send 'finalized_points' message to the channel here
    })
  })

document
  .querySelector('.calculate-points')
  .addEventListener('click', event => {
    const storyPoints = document.querySelector('.story-points')
    // send 'user_estimated' to the channel here
  })

// call the relevant function defined below when you receive the following events from the channel:
// 'next_card'
// 'winner'
// 'tie'

const showCard = state => {
  document
    .querySelector('.start-button')
    .style.display = "none"
  document
    .querySelector('.winner')
    .style.display = "none"
  document
    .querySelector('.tie')
    .style.display = "none"
  document
    .querySelector('.calculate-points')
    .style.display = "inline-block"
  document
    .querySelector('.ticket')
    .style.display = "block"
  document
    .querySelector('.ticket-title')
    .innerHTML = state.card.title
  document
    .querySelector('.ticket-description')
    .innerHTML = state.card.description
}

const showWinner = state => {
  document
    .querySelector('.winner')
    .style.display = "block"
  document
    .querySelector('.calculate-points')
    .style.display = "none"
  document
    .querySelector('.final-points')
    .innerHTML = "Winner: " + state.points + " Points"
  document
    .querySelector('.next-card')
    .value = state.points
  document
    .querySelector('.next-card')
    .disabled = !driving
}

const showTie = state => {
  document
    .querySelector('.tie')
    .style.display = "block"
  document
    .querySelector('.calculate-points')
    .style.display = "none"
  document
    .querySelector('.tie')
    .getElementsByClassName('next-card')[0]
    .value = state.points[0]
  document
    .querySelector('.tie')
    .getElementsByClassName('next-card')[0]
    .innerHTML = state.points[0] + " Points"
  document
    .querySelector('.tie')
    .getElementsByClassName('next-card')[0]
    .disabled = !driving
  document
    .querySelector('.tie')
    .getElementsByClassName('next-card')[1]
    .value = state.points[1]
  document
    .querySelector('.tie')
    .getElementsByClassName('next-card')[1]
    .innerHTML = state.points[1] + " Points"
  document
    .querySelector('.tie')
    .getElementsByClassName('next-card')[1]
    .disabled = !driving
}

export default socket
