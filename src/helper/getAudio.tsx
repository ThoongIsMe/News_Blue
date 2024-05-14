interface AudioResponse {
    async: string;
    error: number;
    message: string;
    request_id: string;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getAudio(context: string): Promise<AudioResponse> {
    const url = 'https://api.fpt.ai/hmi/tts/v5';
    const response = await fetch(url, {
        method: "POST",
        headers: {
            //'api-key': 'pzmj9mjM3U1BUDM0BYvUZuK6hKyTdNSc',
            'api-key': 'OfYPrJCXglKKX3C0cnvRzCI0TQYWyBBr',

            'speed': '1',
            'voice': 'banmai',
        },
        body: context,
    });
    const data = await response.json();
    return data.async;
}

export default getAudio;