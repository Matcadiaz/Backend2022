

const socket = io.connect();


socket.on('productos-cargados', data => {
    
    fetch('/plantilla')
    .then(response => response.text())
    .then(response => {
       const html = Handlebars.compile(response);
       document.getElementById('wrap').innerHTML = html({data});
    })
 
})