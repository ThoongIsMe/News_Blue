async function getAudio(context) {
    const url = 'https://api.fpt.ai/hmi/tts/v5'

    const response = await fetch(url, {
        method: "POST",
        headers: {
            'api-key': 'qpMrDkFwEIK6hBtUR2wVCD0fiRnXC5AK',
            'speed': '1',
            'voice': 'banmai',
        },
        body: context,
    })
    const data = await response.json();
    console.log(data);
}

export default getAudio;