let offset = 0;
const limit=10;
const element =document.getElementById("pkm")
document.getElementById("prev").style.visibility = "hidden";


const btn1 =document.getElementById("btn")
btn1.addEventListener('click' , async function(){
    await fetchPokemon(0,10)
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