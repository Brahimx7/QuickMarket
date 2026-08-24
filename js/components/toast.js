export function Toast(message){
    const Message  =document.createElement("div");
    Message.classList.add("No-account");
    Message.innerHTML =
     `  
     <button>X</button>
    <h2>${message}</h2>
    
    `
    return Message;
} 
