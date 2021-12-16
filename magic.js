const ipElement = document.getElementById("ip-field");
const portElement = document.getElementById("port-field");
const rconElement = document.getElementById("rcon-field");
const cmdElement = document.getElementById("command-field");
const resultElement = document.getElementById("results");
const submitButton = document.getElementById("submit-button-post");

const API_URL = "https://beta-api.rcon.tf/";

submitButton.addEventListener("click", async ev => {
    ev.preventDefault();
	try {
        const startTime = window.performance.now();
        console.log("%c[rcon.tf] %cSending request to %crcon.tf...", 'color: #fb8c00;', 'color: #fff;', 'color: #fb8c00;');
        const { body, ...response } = await sendRequest();
        const endTime = window.performance.now();
        console.log(`%c[rcon.tf] %cRecieved response from %crcon.tf %cin ${(endTime - startTime).toFixed(0)} ms`, 'color: #fb8c00;', 'color: #fff;', 'color: #fb8c00;', 'color: #fff;');

        if (cmdElement.value.includes("changelevel"))
            return (resultElement.innerText = `Changed level to: ${cmdElement.value.slice(12)}`);
            
		if (!body) {
            console.log(`%c[rcon.tf] %cRecieved bad response from %crcon.tf%c:\nCode: ${response.statusCode}\nMessage: ${response.message}\nError: ${response.error}`, 'color: #fb8c00;', 'color: #fff;', 'color: #fb8c00;', 'color: #fff;');
			return (resultElement.innerText = `${response.error}\n${response.message}`);
		}

		return (resultElement.innerText = JSON.stringify(body)
			.replace(/\\n/g, "\n")
			.slice(1, -1)
			.replace(/[\\\"]/g, "%QUOTE")
			.replace(/%QUOTE%QUOTE/g, '"'));
	} catch (err) {
		return (resultElement.innerText = `Error while executing command.`);
	}
});

async function sendRequest() {
	const res = await fetch(API_URL, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			ip: ipElement.value,
			password: rconElement.value,
            command: cmdElement.value,
            port: parseInt(portElement.value, 10)
		})
	});

	return await res.json();
}
