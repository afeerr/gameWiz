import {characterData} from './data.js'
import Character from './character.js'

let isWaiting = false

let monstersArray = ['orc', 'demon', 'goblin']

function getNewMonster(){
    const nextMonsterData = characterData[monstersArray.shift()]
    return nextMonsterData ? new Character(nextMonsterData) : {}
}
function attack(){
    if (!isWaiting){
    wizard.getDiceHtml()
   monster.getDiceHtml()
    wizard.takeDamage(monster.currentDiceScore)
    monster.takeDamage(wizard.currentDiceScore)
    render()
    if(wizard.dead){
        endGame()
    }
    else if(monster.dead){
        isWaiting = true
        if(monstersArray.length>0){
            setTimeout(() => {
            monster = getNewMonster()
            render()
            isWaiting = false    
            }, 1500)
        }else{
            endGame()
        }
    }
        
    }
}

function endGame(){
    isWaiting = true
    const endMessage = wizard.health === 0 && monster.health === 0 ? "All of us are dead" : wizard.health > 0 ? "You win" : "I GACHU"
    const endEmoji = wizard.health > 0 ? '<img src="bebs.png"/>' : '<img src="gachu.png"/>'
    setTimeout(() => { document.body.innerHTML = `
            <div class="end-game">
                <h2>Game Over</h2>
                <h3>${endMessage}</h3>
                <p class="end-emoji">${endEmoji}</div>
            </div>`}, 1500)
    
}

function render(){
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
    document.getElementById('monster').innerHTML = monster.getCharacterHtml()
}
document.getElementById('btn').addEventListener('click', attack)

const wizard = new Character(characterData.hero)
let monster = getNewMonster()
render()