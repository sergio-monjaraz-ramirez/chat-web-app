export function useGeminiApi() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    const sendPrompt = async (prompt: string) => {
        if (!apiKey) {
            return 'API Key missing. Please add your .env file to enable chat simulation.';
        }

        const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

        const response = await fetch(`${endpoint}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: prompt }],
                    },
                ],
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        return result.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
    };

    return { sendPrompt };
}
