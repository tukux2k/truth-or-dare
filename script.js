function startGame() {
    let player1 = document.getElementById("player1").value.trim();
    let player2 = document.getElementById("player2").value.trim();

    if (!player1 || !player2) {
        alert("Please enter both Telegram usernames.");
        return;
    }

    // Spin the pointer
    let spinDegrees = Math.floor(Math.random() * 360) + 720;
    document.querySelector(".circle").style.transform = `rotate(${spinDegrees}deg)`;

    // Determine selected player
    setTimeout(() => {
        let selectedPlayer = spinDegrees % 360 < 180 ? player1 : player2;
        let truthOrDare = Math.random() < 0.5 ? "Truth" : "Dare";

        document.getElementById("result").innerText = `${selectedPlayer} gets: ${truthOrDare}`;

        // Send notification to Telegram bot
        sendToTelegram(selectedPlayer, truthOrDare);
    }, 3000);
}

function sendToTelegram(username, choice) {
    const botToken = "7609668402:AAGWOLDkkQIAEzXqL75TjtD6vAQqaLgehM4";  // Replace with your bot's token
    const chatID = "6715819149";  // Replace with your bot's chat ID
    let message = `🎲 Truth or Dare Game!\n@${username} got: ${choice}`;

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatID}&text=${encodeURIComponent(message)}`)
        .then(response => response.json())
        .then(data => console.log("Message sent:", data))
        .catch(error => console.error("Error sending message:", error));
}
