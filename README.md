# DeepSeeker - VSCode Chatbot Extension

The **DeepSeeker** extension for Visual Studio Code brings a chatbot experience directly to your development environment. It leverages Ollama's chat model to provide AI-powered responses based on user input.

---

## Features

- **Chat Interface**: Allows you to interact with the chatbot directly from the VSCode editor.
- **Real-time Streaming**: Chatbot responses are streamed live as they're generated, providing a dynamic experience.
- **Customizable**: Built with webview technology, you can easily modify the HTML and CSS for custom styling.

---
## Requirements

- Node
- Ollama
- [Deepseek-r1:8b](https://ollama.com/library/deepseek-r1:8b)

---
## Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/deepseeker.git
   ```
   
2. Navigate to the extension folder:
   ```bash
   cd deepseeker
   ```

3. Install dependencies using `npm`:
   ```bash
   npm install
   ```

4. Launch the extension in VSCode:
   - Open the folder in VSCode.
   - Press `F5` to launch the extension in the VSCode Extension Host.


---

## Development

To contribute or modify the extension:

1. Clone the repository and install dependencies as shown above.
2. Modify the `src/extension.ts` for backend logic or `src/webview.html` for frontend styling.
3. Use the `vscode` APIs to create new commands, views, or interactions.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

