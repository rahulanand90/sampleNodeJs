console.log('Client side JS');

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data)=>{
        console.log(data);
    })
})