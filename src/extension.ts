import * as vscode from 'vscode';
import ollama from 'ollama';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "deepseeker" is now active!');

    const disposable = vscode.commands.registerCommand('deepseeker.helloWorld', () => {
        const panel = vscode.window.createWebviewPanel(
            'deepChat',
            'DeepSeeker',
            vscode.ViewColumn.One,
            { enableScripts: true }
        );
        panel.webview.html = getWebviewContent();

        panel.webview.onDidReceiveMessage(async (message: any) => {
            if (message.command === 'chat') {
                const userPrompt = message.text;
                let responseText = '';

                try {
                    const streamResponse = await ollama.chat({
                        model: 'deepseek-r1:8b',
                        messages: [{ role: 'user', content: userPrompt }],
                        stream: true
                    });

                    for await (const part of streamResponse) {
                        responseText += part.message.content;
                        panel.webview.postMessage({ command: 'chatResponse', text: responseText });
                    }
                } catch (e) {
                    console.error('Error in chat request:', e);
                }
            }
        });
    });
    
    context.subscriptions.push(disposable);
}

export function deactivate() {}

function getWebviewContent(): string {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: Arial, sans-serif; margin: 2rem; background-color: #121212; color: #fff; text-align: center; }
            h2 { color: #ffffff; }
            #container { max-width: 500px; margin: auto; padding: 20px; border-radius: 10px; background-color: #1e1e1e; box-shadow: 0 0 10px rgba(255, 255, 255, 0.1); }
            #prompt { width: 100%; box-sizing: border-box; padding: 10px; border-radius: 5px; border: none; background-color: #333; color: #fff; }
            #seekBtn { margin-top: 10px; padding: 10px 20px; background-color: #ffccff; color: #000; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; }
            #seekBtn:hover { background-color: #ffffff; }
            #response { margin-top: 1rem; padding: 10px; min-height: 100px; border-radius: 5px; background-color:rgb(65, 65, 65); border: 1px solid #444; color: #ffddff; }
        </style>
    </head>
    <body>
        <div id="container">
            <h2>DeepSeeker</h2>
            <textarea id="prompt" rows="4" placeholder="What do you SEEK?"></textarea><br>
            <button id="seekBtn">SEEK</button>
            <div id="response"></div>
        </div>
        <script>
            const vscode = acquireVsCodeApi();
            document.getElementById('seekBtn').addEventListener('click', () => {
                const text = document.getElementById('prompt').value;
                vscode.postMessage({ command: 'chat', text });
            });

            window.addEventListener('message', event => {
                const { command, text } = event.data;
                if (command === 'chatResponse') {
                    document.getElementById('response').innerText = text;
                }
            });
        </script>
    </body>
    </html>`;
}
