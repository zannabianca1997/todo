import FileSaver from "https://cdn.jsdelivr.net/npm/file-saver@2.0.5/+esm";

/**
 * Export todo data to markdown and trigger download
 * @param {Array<TodoItem & {id: string}>} todoData - Array of todo objects with id, title, text, done properties
 * @returns {void}
 */
export function exportTodosToMarkdown(todoData) {
    const date = new Date().toISOString(); // YYYY-MM-DD format

    let markdown = `# Todo List - ${date}\n\n`;

    for (const todo of todoData) {
        markdown += `- [${todo.done ? 'x' : ' '}] ${todo.title.trim()}\n`;
        if (todo.text && todo.text.trim()) {
            for (const line of todo.text.split('\n')) {
                markdown += `    ${line.trim()}\n`;
            }
        }
    }

    // Create and trigger download
    const blob = new Blob([markdown], { type: 'text/markdown' });
    FileSaver.saveAs(blob, `todos-${date}.md`);
}