import FileSaver from "https://cdn.jsdelivr.net/npm/file-saver@2.0.5/+esm";
import YAML from "https://cdn.jsdelivr.net/npm/yamljs@0.3.0/+esm";

/**
 * Creates standardized export data structure
 * @param {Array<import("./storage").TodoItem & {id: string}>} todoData - Array of todo objects with id, title, text, done properties
 * @returns {Object} Export data structure with metadata and todos
 */
function createExportData(todoData) {
    const date = new Date().toISOString(); // YYYY-MM-DD format

    // Convert array to object with id as key
    const todos = {};
    for (const { id, title, text, done, ...additionals } of todoData) {
        todos[id] = {
            title,
            text,
            done,
        };
        if (additionals && Object.keys(additionals).length > 0) {
            todos[id].additionals = additionals;
        }
    }

    return {
        metadata: {
            date,
            version: 1,
        },
        todos
    };
}

export function exportTodos(type, todoData) {
    switch (type) {
        case 'markdown':
            exportTodosToMarkdown(todoData);
            break;
        case 'json':
            exportTodosToJSON(todoData);
            break;
        case 'yaml':
            exportTodosToYAML(todoData);
            break;
        default:
            throw new Error(`Invalid export type: ${type}`);
    }
}

/**
 * Export todo data to markdown and trigger download
 * @param {Array<import("./storage").TodoItem & {id: string}>} todoData - Array of todo objects with id, title, text, done properties
 * @returns {void}
 */
function exportTodosToMarkdown(todoData) {
    const { metadata: { date }, todos } = createExportData(todoData);

    let markdown = `# Todo List - ${date}\n\n`;

    for (const { done, title, text } of Object.values(todos)) {
        markdown += `- [${done ? 'x' : ' '}] ${title.trim()}\n`;
        if (text && text.trim()) {
            for (const line of text.split('\n')) {
                markdown += `    ${line.trim()}\n`;
            }
        }
    }

    // Create and trigger download
    const blob = new Blob([markdown], { type: 'text/markdown' });
    FileSaver.saveAs(blob, `todos-${date}.md`);
}

/**
 * Export todo data to JSON and trigger download
 * @param {Array<import("./storage").TodoItem & {id: string}>} todoData - Array of todo objects with id, title, text, done properties
 * @returns {void}
 */
function exportTodosToJSON(todoData) {
    const exportData = createExportData(todoData);

    // Convert to JSON with pretty formatting
    const jsonString = JSON.stringify(exportData, null, 2);

    // Create and trigger download
    const blob = new Blob([jsonString], { type: 'application/json' });
    FileSaver.saveAs(blob, `todos-${exportData.metadata.date}.json`);
}

/**
 * Export todo data to YAML and trigger download
 * @param {Array<import("./storage").TodoItem & {id: string}>} todoData - Array of todo objects with id, title, text, done properties
 * @returns {void}
 */
function exportTodosToYAML(todoData) {
    const exportData = createExportData(todoData);

    // Convert to YAML
    const yamlString = YAML.stringify(exportData, 8);

    // Create and trigger download
    const blob = new Blob([yamlString], { type: 'application/x-yaml' });
    FileSaver.saveAs(blob, `todos-${exportData.metadata.date}.yaml`);
}