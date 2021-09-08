
Rollbar.info("Rollbar on the front end is working")

let bestPokemonIds = [384, 151, 493, 38, 143, 157, 245, 25, 83, 135]

const form = document.getElementById('form1')
const searchInput = document.getElementById('pokemonSearch')

const form2 = document.getElementById('form2')
const battleSearchInput = document.getElementById('pokemonBattleSearch')

const types = {
    "bug" : "/photos/BugIC.png",
    "dark" : "/photos/DarkIC.png",
    "dragon" : "/photos/DragonIC.png",
    "electric" : "/photos/ElectricIC.png",
    "fairy" : "/photos/FairyIC.png",
    "fighting" : "/photos/FightingIC.png",
    "fire" : "/photos/FireIC.png",
    "flying" : "/photos/FlyingIC.png",
    "ghost" : "/photos/GhostIC.png",
    "grass" : "/photos/GrassIC.png",
    "ground" : "/photos/GroundIC.png",
    "ice" : "/photos/IceIC.png",
    "normal" : "/photos/NormalIC.png",
    "poison" : "/photos/PoisonIC.png",
    "psychic" : "/photos/PsychicIC.png",
    "rock" : "/photos/RockIC.png",
    "steel" : "/photos/SteelIC.png",
    "water" : "/photos/WaterIC.png"
}

const weakness = {
    "bug" : ["flying", "rock", "fire"],
    "dark" : ["fighting", "bug", "fairy"],
    "dragon" : ["ice", "dragon", "fairy"],
    "electric" : ["ground"],
    "fairy" : ["posion", "steel"],
    "fighting" : ["flying", "psychic", "fairy"],
    "fire" : ["ground", "rock", "water"],
    "flying" : ["rock", "steel", "electric"],
    "ghost" : ["ghost", "dark"],
    "grass" : ["flying", "posion", "bug", "fire", "ice"],
    "ground" : ["water", "grass", "ice"],
    "ice" : ["fighting", "rock", "steel", "fire"],
    "normal" : ["fighting"],
    "poison" : ["ground", "psychic"],
    "psychic" : ["bug", "ghost", "dark"],
    "rock" : ["fighting", "ground", "steel", "water", "grass"],
    "steel" : ["fighting", "ground", "fire"],
    "water" : ["grass", "electric"]
}

const randomPokemon = () => {
    try {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 898)}`)
        .then(res => {
            document.getElementById('shinyPokemon').style.zIndex = 1
    
            console.log(res.data)
            let name = res.data.species.name
            name = name.charAt(0).toUpperCase() + name.slice(1)
            let type = res.data.types[0].type.name
            let id =  '#' + res.data.id
            let spriteImg = res.data.sprites.front_default
            let shinyImg = res.data.sprites.front_shiny
    
            document.getElementById('nameBox2').textContent = name
            document.getElementById('nameBox1').textContent =  id + ' ' + name
            document.getElementById('defaultPokemon').src = spriteImg
            document.getElementById('shinyPokemon').src = shinyImg
            document.getElementById('selectedId').textContent = id
            
            for (const prop in types){
                if (type === prop){
                    document.getElementById('typeBox').src = types[prop]
                    document.getElementById('typeBox').classList.remove('hidden')
                }
            }
        })
        Rollbar.info("Random pokémon search successful")

    } catch (error) {
        Rollbar.critical("Random pokémon search failed")
    }
}

const bestPokemon = () => {
    let randomIndex = Math.floor(Math.random() * bestPokemonIds.length)
    
    try {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${bestPokemonIds[randomIndex]}`)
        .then(res => {
            document.getElementById('shinyPokemon').style.zIndex = 1
    
            console.log(res.data)
            let name = res.data.species.name
            name = name.charAt(0).toUpperCase() + name.slice(1)
            let type = res.data.types[0].type.name
            let id = '#' + res.data.id
            let spriteImg = res.data.sprites.front_default
            let shinyImg = res.data.sprites.front_shiny
    
            document.getElementById('nameBox2').textContent = name
            document.getElementById('selectedId').textContent = id
            document.getElementById('nameBox1').textContent =  id + ' ' + name
            document.getElementById('defaultPokemon').src = spriteImg
            document.getElementById('shinyPokemon').src = shinyImg
            
            for (const prop in types){
                if (type === prop){
                    document.getElementById('typeBox').src = types[prop]
                    document.getElementById('typeBox').classList.remove('hidden')
                }
            }
    
        })
        Rollbar.info("Best pokémon search successful")

    } catch (error) {
        Rollbar.critical("Best pokémon search failed")
    }
}

const getShiny = () => {
    document.getElementById('shinyPokemon').style.zIndex = 3
}

const getDefault = () => {
    document.getElementById('shinyPokemon').style.zIndex = 1
}

const submitHandler = (e) => {
    try {
        e.preventDefault()
        // console.log(searchInput.value)
        if (searchInput.value.length > 0){
            axios.get(`https://pokeapi.co/api/v2/pokemon/${searchInput.value}`)
            .then(res => {
                document.getElementById('shinyPokemon').style.zIndex = 1
    
                console.log(res.data)
                let name = res.data.species.name
                name = name.charAt(0).toUpperCase() + name.slice(1)
                let type = res.data.types[0].type.name
                let id = '#' + res.data.id
                let spriteImg = res.data.sprites.front_default
                let shinyImg = res.data.sprites.front_shiny
    
                document.getElementById('nameBox2').textContent = name
                document.getElementById('selectedId').textContent = id
                document.getElementById('nameBox1').textContent =  id + ' ' + name
                document.getElementById('defaultPokemon').src = spriteImg
                document.getElementById('shinyPokemon').src = shinyImg
            
                for (const prop in types){
                    if (type === prop){
                            document.getElementById('typeBox').src = types[prop]
                            document.getElementById('typeBox').classList.remove('hidden')
                    }
                }
    
            })
        }
        searchInput.value = ''
        Rollbar.info("Custom pokémon search successful")

    } catch (error) {
        Rollbar.warning("Custom pokémon search failed")
    }
    
}

/// Pokemon battle section
let opponentType = '' 
let yourType = ''
let opponentName = ''
let name = ''

const opponentPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 898)}`)
        .then(res => {
            // console.log(res.data)
            opponentName = res.data.species.name
            opponentName = opponentName.charAt(0).toUpperCase() + opponentName.slice(1)
            opponentType = res.data.types[0].type.name

            let spriteImg = res.data.sprites.front_default

            document.getElementById('opponentPokemon').style.opacity = 1
            document.getElementById('opponentNameBox').textContent = opponentName
            document.getElementById('opponentPokemon').src = spriteImg
            document.getElementById('opponentPokemon').classList.remove('hidden')
        })
    }


const yourRandomPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 898)}`)
    .then(res => {
        name = res.data.species.name
        name = name.charAt(0).toUpperCase() + name.slice(1)
        yourType = res.data.types[0].type.name
        
        let spriteImg = res.data.sprites.back_default

        document.getElementById('yourPokemon').style.opacity = 1
        document.getElementById('yourPokemonNameBox').textContent = name
        document.getElementById('yourPokemon').src = spriteImg
        document.getElementById('yourPokemon').classList.remove('hidden')
        document.getElementById('queryText').textContent = `What will ${name} do?`

    })
}


const battleSubmitHandler = (e) => {
    e.preventDefault()

    if (battleSearchInput.value.length > 0){
        axios.get(`https://pokeapi.co/api/v2/pokemon/${battleSearchInput.value}`)
        .then(res => {
            name = res.data.species.name
            name = name.charAt(0).toUpperCase() + name.slice(1)
            yourType = res.data.types[0].type.name
        
            let spriteImg = res.data.sprites.back_default

            document.getElementById('yourPokemon').style.opacity = 1
            document.getElementById('yourPokemonNameBox').textContent = name
            document.getElementById('yourPokemon').src = spriteImg
            document.getElementById('yourPokemon').classList.remove('hidden')
            document.getElementById('queryText').textContent = `What will ${name} do?`

        })
    }
    battleSearchInput.value = ''
}


const startFight = () => {

  let query = document.getElementById('queryText')
  let opponentPokemon = document.getElementById('opponentPokemon')
  let yourPokemon = document.getElementById('yourPokemon')

  opponentPokemon.style.opacity = 1
  yourPokemon.style.opacity = 1

  if (weakness[opponentType].includes(yourType)){
    opponentPokemon.classList.remove('transit')

    query.textContent = opponentName + ' has fainted! You win!'

    setTimeout(function() {
        opponentPokemon.classList.add('transit')
        opponentPokemon.style.opacity = 0

    })

  } else if (weakness[yourType].includes(opponentType)){
    yourPokemon.classList.remove('transit')

    query.textContent = name + ' has fainted! You lose!'
    
    setTimeout(function() {
        yourPokemon.classList.add('transit')
        yourPokemon.style.opacity = 0
        
    })

  } else {
    opponentPokemon.classList.remove('transit')

    query.textContent = opponentName + ' has fainted! You win!'

    setTimeout(function() {
        opponentPokemon.classList.add('transit')
        opponentPokemon.style.opacity = 0
    
    })
  }

}

document.getElementById('randomPokemon').addEventListener('click', randomPokemon)
document.getElementById('bestPokemon').addEventListener('click', bestPokemon)
document.getElementById('shinyButton').addEventListener('click', getShiny)
document.getElementById('defaultButton').addEventListener('click', getDefault)
form.addEventListener('submit', submitHandler)

/// Battle Section

document.getElementById('opponentPokemonBtn').addEventListener('click', opponentPokemon)
document.getElementById('pokemonBattleRandomBtn').addEventListener('click', yourRandomPokemon)
form2.addEventListener('submit', battleSubmitHandler)
document.getElementById('fightBtn').addEventListener('click', startFight)