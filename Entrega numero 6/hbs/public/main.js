const socket = io.connect();

const render = (data) => {
    const html =  data.map((element)=>{
        return (`<div>
        <strong>${element.author} </strong>
        <em> ${element.timestamp} </em>
        <em> ${element.text} </em>
        </div>`);
    }).join(' ')
    document.getElementById("messages").innerHTML= html;
}

function addMessage(e) {
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
        
    };
    socket.emit('new-message', mensaje);
    document.getElementById('texto').value ="";
    return false;
}

socket.on('messages', data => render(data));

socket.on('productos-cargados', data => {
    
    fetch('/plantilla')
    .then(response => response.text())
    .then(response => {
       const html = Handlebars.compile(response);
       document.getElementById('wrap').innerHTML = html({data});
    })
 
})