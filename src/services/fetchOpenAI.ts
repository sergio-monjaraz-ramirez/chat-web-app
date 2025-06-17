const OPENAI_API_KEY = ''; // You can add your OpenAI API key here or prompt user to input

// Helper to call OpenAI chat completions endpoint
type Message = { from: 'user' | 'assistant'; text: string };

export default async function fetchOpenAIReply(userText: string, conversation: { messages: Message[] }) {
    if (!OPENAI_API_KEY) {
        return 'OpenAI API Key missing. Please add your key in the source code to enable chat simulation.';
    }
    try {
        const messagesForAPI = conversation.messages.map((msg) => ({
            role: msg.from === 'user' ? 'user' : 'assistant',
            content: msg.text,
        }));
        messagesForAPI.push({ role: 'user', content: userText });

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + OPENAI_API_KEY,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: messagesForAPI,
                max_tokens: 100,
                temperature: 0.7,
                n: 1,
                stop: null,
            }),
        });
        if (!response.ok) {
            const err = await response.json();
            return 'OpenAI API error: ' + (err.error?.message || response.statusText);
        }
        const data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        return 'OpenAI fetch error: ' + (error instanceof Error ? error.message : String(error));
    }
}
