const weatherForm = document.querySelector('form');
const search = document.querySelector('.input');
const info_1 = document.querySelector('#message_1');
const info_2 = document.querySelector('#message_2');


weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const location = search.value;

    info_1.textContent = 'Loading...';
    info_2.textContent = '';
    
    const url = 'http://localhost:3000/weather?address='+location;
    fetch(url).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            info_1.textContent = data.error;
        }
        else{
            //const information =  + "  "+;
            info_1.textContent = data.location;
            info_2.textContent = data.forecast;
        }
    })
})
})