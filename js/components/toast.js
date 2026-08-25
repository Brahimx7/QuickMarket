export function Toast(message){
    const Message  =document.createElement("div");
    Message.classList.add("toast");
    Message.innerHTML =
     `  
     <button>X</button>
    <h2>${message}</h2>
    
    `
    return Message;
} 
