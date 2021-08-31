
let bestPokemonIds = [384, 151, 493, 38, 143, 157, 245, 25, 83, 135]

const form = document.querySelector('form')
const searchInput = document.getElementById('pokemonSearch')

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


const randomPokemon = () => {
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
            }
        }
    })
}

const bestPokemon = () => {
    let randomIndex = Math.floor(Math.random() * bestPokemonIds.length)
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
            }
        }

    })
}

const getShiny = () => {
    document.getElementById('shinyPokemon').style.zIndex = 3
}

const getDefault = () => {
    document.getElementById('shinyPokemon').style.zIndex = 1
}

const submitHandler = (e) => {
    e.preventDefault()
    console.log(searchInput.value)

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
            }
        }

    })

}

document.getElementById('randomPokemon').addEventListener('click', randomPokemon)
document.getElementById('bestPokemon').addEventListener('click', bestPokemon)
document.getElementById('shinyButton').addEventListener('click', getShiny)
document.getElementById('defaultButton').addEventListener('click', getDefault)
form.addEventListener('submit', submitHandler)