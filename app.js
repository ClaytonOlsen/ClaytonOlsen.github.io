class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.messages = [];
    }

    display() {
        const {openButton, chatBox, sendButton} = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hides the box
        if(this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }

    // Helper function to create a delay
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Existing onSendButton method with added delay functionality
    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value.trim(); // Trim whitespace
        let pretext = `Hi, your name is Claybot1. You are a helpful chatbot that can help tell people information about me, Clay, for my personal portfolio. I am a 27 year old data scientist from the bay area, CA. I am looking for a job and working on individual projects in the meantime now that I have time to learn about cool modeling techniques that can be seen at the bottom of my profile. Things to know about me are that I went to undergraduate college at Seattle University and graduated with a BA in Business Analytics. I then went to UCSC for my masters in Statistical Science. Here I gained the knowledge from a normal statistics masters including modeling, bayesian statistics, frequentist statistics, working with many datasets, regression and classification modelling. I had an internship at Sparta Science, a sports science company, where I built exploratory machine learning models, like autoencoders and clustering models, contributed to the python athletic metrics pipeline, and used a lot of tensorflow. In my longer career job, I worked at Falkonry, a time-series AI company that specialized in building models to make predictions and find anomalies in time series data. Here I built lots of models and helped build and fix bugs in the code for a transformer model to be used in different situations. I have experience using docker, AWS tools like kubernetes and S3, tensorflow, pytorch, and mostly all common data science tools within python. For hobbies I enjoy Basketball, surfing, and traveling whenever I have the opportunity. To be a helpful chat bot we want to only give the asker what they want in a succinct answer. For example, if they ask where does clay live, you would answer, "Clay lives in San Francisco currently." Otherwise do your best within your knowledge to answer the question. Do not default to the example I gave if the message is unclear and feel free to try your best even if you do not know the answer. With this in mind would you please respond to the message following message about Clay: `;
        
        if (text1 === "") {
            return; // Do nothing if the input is empty
        }
    
        // Create the message for the chat UI with only text1
        let msg1 = { name: "User", message: text1 };
        this.messages.push(msg1);
        
        // Clear the input field immediately after sending the message
        textField.value = ''; 
    
        let name = 'AIzaSyCx5MyWu-JmyB8HAdh_GkpCvJIfRLtYknE';
        
        fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${name}`, {
            method: 'POST',
            body: JSON.stringify({
                "contents": [{
                    "parts": [{"text": pretext + text1}] // Use pretext here
                }]
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Extracting the response message as specified
            let responseText = data.candidates[0].content.parts[0].text;
            let msg2 = { name: "Sam", message: responseText };
            
            this.messages.push(msg2);
            this.updateChatText(chatbox);
        })
        .catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox);
        });
    }
    
    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item) {
            if (item.name === "Sam") {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>';
            } else {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>';
            }
        });
    
        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html; // Update the chat UI
        // Scroll to the bottom of the chat message container
        chatmessage.scrollTop = chatmessage.scrollHeight;
    }
}    


const chatbox = new Chatbox();
chatbox.display();