// An api method to send our message to the server(backend) and get a response back
export const fetchResponse =  async(chat) => {
    try {
        // after depoloyment you should change the fetch URL below
        const response = await fetch('http://localhost:3001', { 
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                //This line is for the backend to know what is the intent of the message 
                //For multiple message: message: chat.map((message)=> message.message).join(" \n ")
                // I want to change it with only the last message
                message: chat[chat.length - 1].message 
            })
        })

        const data = await response.json()
        return data
    } catch (error) {
        console.log(error);
    }
}