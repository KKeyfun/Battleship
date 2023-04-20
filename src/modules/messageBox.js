// Used to add new messages to the message box
function addMessage(msg) {
  const capitalize = msg.charAt(0).toUpperCase() + msg.slice(1);
  const messageContainer = document.querySelector('.messageContainer');
  const newMessage = document.createElement('div');
  newMessage.textContent = capitalize;
  if (messageContainer.childNodes.length > 5) {
    messageContainer.removeChild(messageContainer.lastElementChild);
  }
  messageContainer.insertBefore(newMessage, messageContainer.firstElementChild);
}

export default addMessage;
