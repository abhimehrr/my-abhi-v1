const cardWrapper = $(".card-wrapper");

window.onload = async (e) => {
  const res = await fetch("../static/data/contact.json");
  const data = await res.json();

  data.forEach((d) => {
    cardWrapper.append(createContactCard(d.title, d.icon, d.link));
  });
};

// Create Contact Card
const createContactCard = (title, icon, link) => {
  var a = document.createElement("a");

  a.classList.add("card");
  a.classList.add("flex-center");
  a.classList.add("flex-column");

  a.setAttribute("href", link);
  a.setAttribute("target", "_blank");

  a.innerHTML = `
        <div class="item-icon flex-center mb-s">
            ${icon}
        </div>
        <div class="card-title">
            <h3 class="font-600 font-s">${title}</h3>
        </div>
    `;
  return a;
};

// Chat Bot
const chatBot = $(".chatbot");
const msgTextArea = $("#msgTextArea");
const sendMsg = $("#sendMsg");

const contactData = []

const replyBot = [
  "Hello <strong>[name],</strong> enter your email",
  "Nice! Enter mobile number",
  "Can you please tell what are you contacting for? I mean Subject",
  "Please tell me more, type your message...",
  "Thank you for your message...",
];
let i = 0;

chatBot.scrollTo(0, chatBot.scrollHeight);

msgTextArea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMsg.click();
  }
});

const chatBotMsgBox = $("#chatbot-msg-box");

sendMsg.addEventListener("click", () => {
  const div = document.createElement("div");
  const div2 = document.createElement("div");
  
  div.classList.add("chat-item");
  div.classList.add("send");

  div2.classList.add("chat-item");

  if(msgTextArea.value.trim().length < 5) {
    div2.classList.add("bg-danger");
    div2.classList.add("clr-light");
    div2.innerHTML = 'Please enter atleat 5 character...';
    chatBotMsgBox.append(div2);
    chatBot.scrollTo(0, chatBot.scrollHeight);
    return
  }

  div.innerHTML = msgTextArea.value;
  contactData.push(msgTextArea.value.trim());
  msgTextArea.value = '';

  chatBotMsgBox.append(div);

  setTimeout(() => {
    if (replyBot.length - 1 == i) {
      div2.classList.add("font-700");
      div2.classList.add("clr-success");
      div2.innerHTML = replyBot[replyBot.length - 1];

      toEmail(contactData)
    }
    if (i > replyBot.length - 1) {
      div2.classList.add("clr-warning");
      div2.style.backgroundColor = 'var(--blk2)';
      div2.innerHTML = "We received your message...<br>Thank you!";
    } else {
      if(i == 0) {
        div2.innerHTML = replyBot[i].replace('[name]', contactData[0]);
      } else {
        div2.innerHTML = replyBot[i];
      }
    }
    chatBotMsgBox.append(div2);
    chatBot.scrollTo(0, chatBot.scrollHeight);
    i++;
  }, 200);

  chatBot.scrollTo(0, chatBot.scrollHeight);
  msgTextArea.focus()
});


// Contact
const toEmail = data => {
  fetch('/contact', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      name : data[0],
      email : data[1],
      mobile : data[2],
      subject : data[3],
      message : data[4]
    })
  })
  .then(res => res.text())
  .then(data => console.log(data))
  .catch(err => console.log('Some error occured! : ', err))
}