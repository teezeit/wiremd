/**
 * Wiremd Preview Provider
 * Handles webview creation and content rendering
 */

import * as vscode from 'vscode';
import { parse, resolveIncludes, renderToHTML } from 'wiremd';

export class WiremdPreviewProvider implements vscode.WebviewPanelSerializer {
  public static readonly viewType = 'wiremd.preview';

  private panel: vscode.WebviewPanel | undefined;
  private currentEditor: vscode.TextEditor | undefined;
  private updateTimeout: NodeJS.Timeout | undefined;
  private currentStyle: string = 'sketch';
  private currentViewport: string = 'full';
  private disposables: vscode.Disposable[] = [];

  constructor(private readonly context: vscode.ExtensionContext) {
    // Watch for document changes
    vscode.workspace.onDidChangeTextDocument(
      (e) => this.onDocumentChanged(e),
      null,
      this.disposables
    );

    // Watch for active editor changes
    vscode.window.onDidChangeActiveTextEditor(
      (editor) => this.onActiveEditorChanged(editor),
      null,
      this.disposables
    );

    // Watch for configuration changes
    vscode.workspace.onDidChangeConfiguration(
      (e) => {
        if (e.affectsConfiguration('wiremd')) {
          this.refresh();
        }
      },
      null,
      this.disposables
    );

    // Get default style from config
    const config = vscode.workspace.getConfiguration('wiremd');
    this.currentStyle = config.get('defaultStyle', 'sketch');
  }

  /**
   * Restore webview panel from saved state
   */
  async deserializeWebviewPanel(
    webviewPanel: vscode.WebviewPanel,
    state: any
  ): Promise<void> {
    this.panel = webviewPanel;
    this.panel.webview.options = this.getWebviewOptions();
    this.panel.webview.html = await this.getWebviewContent();

    // Restore state
    if (state) {
      this.currentStyle = state.style || 'sketch';
      this.currentViewport = state.viewport || 'full';
    }

    // Set up message handling
    this.panel.webview.onDidReceiveMessage(
      (message) => this.handleMessage(message),
      null,
      this.disposables
    );

    this.panel.onDidDispose(() => {
      this.panel = undefined;
    }, null, this.disposables);

    this.refresh();
  }

  /**
   * Open preview in specified column
   */
  public openPreview(column: vscode.ViewColumn): void {
    this.currentEditor = vscode.window.activeTextEditor;

    if (!this.currentEditor) {
      vscode.window.showErrorMessage('No active markdown file');
      return;
    }

    if (this.currentEditor.document.languageId !== 'markdown') {
      vscode.window.showWarningMessage('Active file is not a markdown file');
      return;
    }

    if (this.panel) {
      // Panel already exists, reveal it
      this.panel.reveal(column);
    } else {
      // Create new panel
      this.panel = vscode.window.createWebviewPanel(
        WiremdPreviewProvider.viewType,
        'Wiremd Preview',
        column,
        this.getWebviewOptions()
      );

      // Handle panel disposal
      this.panel.onDidDispose(() => {
        this.panel = undefined;
      }, null, this.disposables);

      // Handle messages from webview
      this.panel.webview.onDidReceiveMessage(
        (message) => this.handleMessage(message),
        null,
        this.disposables
      );
    }

    // Update content
    this.refresh();
  }

  /**
   * Refresh preview content
   */
  public async refresh(): Promise<void> {
    if (!this.panel) {
      return;
    }

    try {
      const html = await this.getWebviewContent();
      this.panel.webview.html = html;
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  /**
   * Change visual style
   */
  public changeStyle(style: string): void {
    this.currentStyle = style;
    this.refresh();
  }

  /**
   * Change viewport size
   */
  public changeViewport(viewport: string): void {
    this.currentViewport = viewport;
    this.refresh();
  }

  /**
   * Get viewport label for display
   */
  private getViewportLabel(viewport: string): string {
    const labels: Record<string, string> = {
      full: 'Full Width',
      desktop: '💻 Desktop',
      laptop: '💻 Laptop',
      tablet: '📱 Tablet',
      mobile: '📱 Mobile'
    };
    return labels[viewport] || 'Full Width';
  }

  /**
   * Show error in preview
   */
  private showError(message: string): void {
    if (!this.panel) {
      return;
    }

    const config = vscode.workspace.getConfiguration('wiremd');
    const showOverlay = config.get('showErrorOverlay', true);

    if (showOverlay) {
      this.panel.webview.postMessage({
        type: 'error',
        message: message
      });
    }
  }

  /**
   * Handle document changes
   */
  private onDocumentChanged(e: vscode.TextDocumentChangeEvent): void {
    if (
      !this.panel ||
      !this.currentEditor ||
      e.document !== this.currentEditor.document
    ) {
      return;
    }

    const config = vscode.workspace.getConfiguration('wiremd');
    const autoRefresh = config.get('autoRefresh', true);

    if (!autoRefresh) {
      return;
    }

    // Debounce updates
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
    }

    const delay = config.get('refreshDelay', 300);
    this.updateTimeout = setTimeout(() => {
      this.refresh();
    }, delay);
  }

  /**
   * Handle active editor changes
   */
  private onActiveEditorChanged(editor: vscode.TextEditor | undefined): void {
    if (!editor || editor.document.languageId !== 'markdown') {
      return;
    }

    this.currentEditor = editor;
    this.refresh();
  }

  /**
   * Handle messages from webview
   */
  private handleMessage(message: any): void {
    switch (message.type) {
      case 'ready':
        // Webview is ready
        this.refresh();
        break;

      case 'changeStyle':
        this.changeStyle(message.style);
        break;

      case 'changeViewport':
        this.changeViewport(message.viewport);
        break;

      case 'requestStyleChange':
        // Trigger the VS Code command to show style picker
        vscode.commands.executeCommand('wiremd.changeStyle');
        break;

      case 'requestViewportChange':
        // Trigger the VS Code command to show viewport picker
        vscode.commands.executeCommand('wiremd.changeViewport');
        break;

      case 'requestInstallSkill':
        vscode.commands.executeCommand('wiremd.installClaudeSkill');
        break;

      case 'requestQuickReference':
        vscode.commands.executeCommand('wiremd.openQuickReference');
        break;

      case 'error':
        vscode.window.showErrorMessage(`Wiremd: ${message.message}`);
        break;

      case 'info':
        vscode.window.showInformationMessage(`Wiremd: ${message.message}`);
        break;

      case 'navigate':
        if (this.currentEditor) {
          this.resolveLink(message.href).then((targetUri) => {
            if (!targetUri) {
              vscode.window.showErrorMessage(`Wiremd: Cannot resolve ${message.href}`);
              return;
            }
            vscode.workspace.openTextDocument(targetUri).then(
              (doc) => { vscode.window.showTextDocument(doc, this.currentEditor!.viewColumn); },
              (err) => { vscode.window.showErrorMessage(`Wiremd: Cannot open ${message.href}: ${err.message}`); }
            );
          });
        }
        break;
    }
  }

  private async resolveLink(href: string): Promise<vscode.Uri | undefined> {
    if (!this.currentEditor) return undefined;

    if (!href.startsWith('/')) {
      const currentDir = vscode.Uri.joinPath(this.currentEditor.document.uri, '..');
      return vscode.Uri.joinPath(currentDir, href);
    }

    // Absolute path: walk up directory tree until the file is found
    const relative = href.slice(1);
    let dir = vscode.Uri.joinPath(this.currentEditor.document.uri, '..');
    for (let i = 0; i < 10; i++) {
      const candidate = vscode.Uri.joinPath(dir, relative);
      try {
        await vscode.workspace.fs.stat(candidate);
        return candidate;
      } catch {
        const parent = vscode.Uri.joinPath(dir, '..');
        if (parent.fsPath === dir.fsPath) break;
        dir = parent;
      }
    }
    return undefined;
  }

  /**
   * Get webview content HTML
   */
  private async getWebviewContent(): Promise<string> {
    if (!this.currentEditor) {
      return this.getEmptyStateHTML();
    }

    const document = this.currentEditor.document;
    const raw = document.getText();
    const markdown = resolveIncludes(raw, document.uri.fsPath);

    try {
      const ast = parse(markdown);
      const html = renderToHTML(ast, { style: this.currentStyle as any, pretty: true });
      return this.injectToolbar(html);
    } catch (error: any) {
      return this.getErrorHTML(error.message);
    }
  }

  /**
   * Inject toolbar and VS Code bridge into the full wiremd HTML output
   */
  private injectToolbar(html: string): string {
    const viewportWidths: Record<string, string> = {
      desktop: '1440px',
      laptop: '1024px',
      tablet: '768px',
      mobile: '375px',
      full: '100%'
    };
    const viewportWidth = viewportWidths[this.currentViewport] || '100%';

    const toolbarCSS = `
    <style id="wmd-toolbar-styles">
      #wmd-toolbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #ffffff;
        border-bottom: 1px solid #e0e0e0;
        padding: 8px 16px;
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 9999;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }
      #wmd-toolbar button {
        padding: 6px 12px;
        border: 1px solid #d0d0d0;
        border-radius: 4px;
        background: white;
        font-size: 13px;
        cursor: pointer;
        font-family: inherit;
      }
      #wmd-toolbar button:hover { background: #f0f0f0; border-color: #999; }
      #wmd-toolbar .wmd-sep { width: 1px; height: 20px; background: #e0e0e0; margin: 0 4px; }
      #wmd-toolbar span { font-size: 13px; color: #333; }
      #wmd-toolbar-spacer { margin-left: auto; font-size: 12px; color: #666; }
      #wmd-help, #wmd-skill { width: 28px; height: 28px; padding: 0; font-weight: bold; border-radius: 50%; display: flex; align-items: center; justify-content: center; line-height: 1; }
      #wmd-error-overlay {
        display: none;
        position: fixed;
        top: 52px;
        left: 50%;
        transform: translateX(-50%);
        background: #ff4444;
        color: white;
        padding: 10px 18px;
        border-radius: 6px;
        z-index: 10000;
        max-width: 600px;
        font-family: -apple-system, sans-serif;
        font-size: 13px;
      }
      #wmd-error-overlay.show { display: block; }
      #wmd-preview-wrapper { margin-top: 44px; }
    </style>`;

    const toolbarHTML = `
  <div id="wmd-toolbar">
    <button id="wmd-refresh">&#x1F504; Refresh</button>
    <div class="wmd-sep"></div>
    <span>Style:</span>
    <button id="wmd-style">${this.currentStyle.charAt(0).toUpperCase() + this.currentStyle.slice(1)} &#x25BE;</button>
    <div class="wmd-sep"></div>
    <span>Viewport:</span>
    <button id="wmd-viewport">${this.getViewportLabel(this.currentViewport)} &#x25BE;</button>
    <span id="wmd-toolbar-spacer">${viewportWidth}</span>
    <button id="wmd-skill" title="Install Wireframe Agent Skill">&#x2728;</button>
    <button id="wmd-help" title="Quick Reference">?</button>
  </div>
  <div id="wmd-error-overlay"></div>
  <script>
    const vscode = acquireVsCodeApi();
    // Wrap existing body content in preview wrapper so margin-top on the wrapper
    // pushes content below the fixed toolbar without touching body padding
    const body = document.body;
    const wrapper = document.createElement('div');
    wrapper.id = 'wmd-preview-wrapper';
    while (body.firstChild && body.firstChild.id !== 'wmd-toolbar' && body.firstChild.id !== 'wmd-error-overlay') {
      wrapper.appendChild(body.firstChild);
    }
    body.appendChild(wrapper);

    document.getElementById('wmd-refresh').addEventListener('click', () => vscode.postMessage({ type: 'ready' }));
    document.getElementById('wmd-style').addEventListener('click', () => vscode.postMessage({ type: 'requestStyleChange' }));
    document.getElementById('wmd-viewport').addEventListener('click', () => vscode.postMessage({ type: 'requestViewportChange' }));
    document.getElementById('wmd-skill').addEventListener('click', () => vscode.postMessage({ type: 'requestInstallSkill' }));
    document.getElementById('wmd-help').addEventListener('click', () => vscode.postMessage({ type: 'requestQuickReference' }));
    window.addEventListener('message', (event) => {
      if (event.data.type === 'error') {
        const el = document.getElementById('wmd-error-overlay');
        el.textContent = '⚠️ ' + event.data.message;
        el.classList.add('show');
        setTimeout(() => el.classList.remove('show'), 5000);
      }
    });
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (href && href.endsWith('.md')) {
        e.preventDefault();
        vscode.postMessage({ type: 'navigate', href });
      }
    });
    vscode.postMessage({ type: 'ready' });
  <\/script>`;

    // Inject CSP into <head>, toolbar styles just before </head> (after wiremd styles so they win),
    // and toolbar HTML at start of <body>
    const withCSP = html.replace(
      '<head>',
      `<head>\n  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com data:; img-src https: data:; script-src 'unsafe-inline';">`
    );
    const withStyles = withCSP.replace('</head>', `${toolbarCSS}\n</head>`);
    return withStyles.replace(/(<body[^>]*>)/, `$1\n${toolbarHTML}`);
  }

  /**
   * Get empty state HTML
   */
  private getEmptyStateHTML(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wiremd Preview</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      background: #f5f5f5;
      color: #333;
    }
    .empty-state {
      text-align: center;
      padding: 40px;
    }
    .empty-state h2 {
      font-size: 24px;
      margin-bottom: 12px;
    }
    .empty-state p {
      color: #666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="empty-state">
    <h2>👀 No Markdown File Open</h2>
    <p>Open a markdown file to see the wiremd preview</p>
  </div>
</body>
</html>`;
  }

  /**
   * Get error state HTML
   */
  private getErrorHTML(message: string): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wiremd Preview - Error</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      background: #f5f5f5;
      color: #333;
    }
    .error-state {
      text-align: center;
      padding: 40px;
      max-width: 600px;
    }
    .error-state h2 {
      font-size: 24px;
      margin-bottom: 12px;
      color: #d32f2f;
    }
    .error-state pre {
      background: #fff3e0;
      border: 1px solid #ff9800;
      padding: 16px;
      border-radius: 4px;
      text-align: left;
      font-size: 13px;
      overflow-x: auto;
      margin-top: 16px;
    }
  </style>
</head>
<body>
  <div class="error-state">
    <h2>⚠️ Preview Error</h2>
    <p>Failed to render the wiremd preview:</p>
    <pre>${this.escapeHtml(message)}</pre>
  </div>
</body>
</html>`;
  }

  /**
   * Get webview options
   */
  private getWebviewOptions(): vscode.WebviewOptions {
    return {
      enableScripts: true,
      localResourceRoots: [this.context.extensionUri]
    };
  }

  /**
   * Escape HTML
   */
  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Dispose resources
   */
  public dispose(): void {
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
    }

    this.disposables.forEach((d) => d.dispose());
    this.disposables = [];

    if (this.panel) {
      this.panel.dispose();
    }
  }
}
