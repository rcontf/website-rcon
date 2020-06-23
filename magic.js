const ipElement = document.getElementById("ip-field")
const rconElement = document.getElementById("rcon-field")
const cmdElement = document.getElementById("command-field")
const resultElement = document.getElementById("results")
const submitButton = document.getElementById("submit-button-post")

submitButton.addEventListener('click', async ev => {
    ev.preventDefault()

    const result = await fetch('https://payload.tf/api/rcon', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ip: ipElement.value,
            password: rconElement.value,
            command: cmdElement.value
        })
    })

    const resJson = await result.json()

    if (resJson.success && cmdElement.value.includes("changelevel")) {
        resultElement.innerText = `Changed level to: ${cmdElement.value.slice(12)}`
    } else if (resJson.success) {
        resultElement.innerText = JSON.stringify(resJson.response).replace(/\\n/g, "\n").slice(1, -1).replace(/[\\\"]/g, "%QUOTE").replace(/%QUOTE%QUOTE/g, "\"")
    } else alert(JSON.stringify(resJson))
})

