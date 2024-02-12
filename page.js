let offset = 0;
const limit=10;
const element =document.getElementById("pkm")
const cont =document.getElementById("container")
document.getElementById("prev").style.visibility = "hidden";

const image = document.getElementById("image1")
image.src="https://static.vecteezy.com/system/resources/previews/027/127/591/non_2x/pokemon-logo-pokemon-icon-transparent-free-png.png"


const btn1 =document.getElementById("btn")
btn1.addEventListener('click' , async function(){
    await fetchPokemon(0,10)
})
const nxt1 = document.getElementById("nxt")
nxt1.addEventListener('click' ,async function(){
    await fetchNextPokemon()
})
const prev1 = document.getElementById("prev")
prev1.addEventListener('click' , async function(){
    await fetchPreviousPokemon()
})


async function fetchPokemon(offset , limit){
    console.log(offset,limit,"h")
    element.innerHTML=''
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const cards = await res.json();
    console.log(cards.results.map(data=>data.name));
    

        
    cards.results.map(item=>{
     const para = document.createElement("p");
     const node = document.createTextNode(`Name :${item.name} `)
     para.appendChild(node)
     element.appendChild(para);
    });

}

async function fetchNextPokemon() {
    element.innerHTML=''
    offset +=10
    document.getElementById("prev").style.visibility = "visible";

    await fetchPokemon(offset, limit);
}
async function fetchPreviousPokemon() {
    element.innerHTML=''
    offset -=10
    if(offset>=0){
    await fetchPokemon(offset, limit);
    }
    else {
        let x = document.getElementById("prev").disabled=true;

    }
}