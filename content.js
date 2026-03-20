
function injectStyles() {
  if (document.getElementById('wiki-extension-styles')) return;
  if (!document.head) return; // Safety check
  
  const style = document.createElement('style');
  style.id = 'wiki-extension-styles';
  style.textContent = `
    :root {
      --wiki-bg: #ffffff;
      --wiki-surface: #f7f8fa;
      --wiki-border: #e4e7ed;
      --wiki-text-primary: #111827;
      --wiki-text-secondary: #6b7280;
      --wiki-text-muted: #9ca3af;
      --wiki-accent: #3366cc;
      --wiki-accent-hover: #254fa0;
      --wiki-accent-soft: #eff3fc;
      --wiki-error: #dc2626;
      --wiki-error-soft: #fef2f2;
      --wiki-shadow: 0 4px 6px -1px rgba(0,0,0,0.07), 0 12px 32px -4px rgba(0,0,0,0.13);
      --wiki-radius: 14px;
      --wiki-font: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --wiki-bg: #1e1e2e;
        --wiki-surface: #27273a;
        --wiki-border: #3a3a52;
        --wiki-text-primary: #e2e8f0;
        --wiki-text-secondary: #a0aec0;
        --wiki-text-muted: #718096;
        --wiki-accent: #7da4f0;
        --wiki-accent-hover: #5b87e8;
        --wiki-accent-soft: #1e2a45;
        --wiki-error: #f87171;
        --wiki-error-soft: #2d1515;
        --wiki-shadow: 0 4px 6px -1px rgba(0,0,0,0.4), 0 12px 32px -4px rgba(0,0,0,0.5);
      }
    }

    /* ── Trigger Bubble ── */
    #wiki-trigger-bubble {
      position: fixed;
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 5px;
      background: var(--wiki-accent);
      color: #fff;
      font-family: var(--wiki-font);
      font-size: 12px;
      font-weight: 600;
      padding: 5px 11px;
      border-radius: 20px;
      cursor: pointer;
      box-shadow: 0 2px 10px rgba(51,102,204,0.4);
      user-select: none;
      white-space: nowrap;
      opacity: 0;
      transform: translateY(4px) scale(0.95);
      transition: opacity 0.15s ease, transform 0.15s ease;
      pointer-events: none;
    }
    #wiki-trigger-bubble.visible {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: all;
    }
    #wiki-trigger-bubble svg {
      width: 13px;
      height: 13px;
      flex-shrink: 0;
    }
    #wiki-trigger-bubble:hover {
      background: var(--wiki-accent-hover);
      transform: scale(1.04);
    }

    /* ── Tooltip Shell ── */
    #wiki-summary-tooltip {
      position: fixed;
      z-index: 10000;
      width: 360px;
      max-width: calc(100vw - 24px);
      background: var(--wiki-bg);
      border: 1px solid var(--wiki-border);
      border-radius: var(--wiki-radius);
      box-shadow: var(--wiki-shadow);
      font-family: var(--wiki-font);
      cursor: default;
      overflow: hidden;
      display: none;
      opacity: 0;
      transform: translateY(-6px) scale(0.97);
      transition: opacity 0.2s ease, transform 0.2s ease;
    }
    #wiki-summary-tooltip.visible {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    #wiki-summary-tooltip.pinned {
      border-color: var(--wiki-accent);
      box-shadow: var(--wiki-shadow), 0 0 0 2px var(--wiki-accent-soft);
    }

    /* ── Toolbar (top action bar) ── */
    .wiki-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      border-bottom: 1px solid var(--wiki-border);
      background: var(--wiki-surface);
    }
    .wiki-toolbar-brand {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 600;
      color: var(--wiki-text-muted);
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
    .wiki-toolbar-brand svg {
      color: var(--wiki-accent);
    }
    .wiki-toolbar-actions {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .wiki-icon-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--wiki-text-muted);
      border-radius: 8px;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s, color 0.15s;
      flex-shrink: 0;
    }
    .wiki-icon-btn:hover {
      background: var(--wiki-border);
      color: var(--wiki-text-primary);
    }
    .wiki-icon-btn.active {
      background: var(--wiki-accent-soft);
      color: var(--wiki-accent);
    }
    .wiki-icon-btn svg {
      width: 14px;
      height: 14px;
    }

    /* ── Thumbnail ── */
    .wiki-thumb {
      width: 100%;
      height: 140px;
      object-fit: cover;
      display: block;
      border-bottom: 1px solid var(--wiki-border);
    }

    /* ── Body ── */
    .wiki-body {
      padding: 14px 16px;
    }
    .wiki-title {
      margin: 0 0 8px 0;
      font-size: 15px;
      font-weight: 600;
      color: var(--wiki-text-primary);
      line-height: 1.3;
    }
    .wiki-extract {
      margin: 0;
      font-size: 13px;
      color: var (--wiki-text-secondary);
      line-height: 1.6;
    }
    .wiki-extract.collapsed {
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .wiki-toggle-btn {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
      color: var(--wiki-accent);
      padding: 0;
      margin-top: 6px;
      display: block;
      font-family: var(--wiki-font);
    }
    .wiki-toggle-btn:hover { text-decoration: underline; }

    /* ── Footer ── */
    .wiki-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 16px 14px;
      gap: 8px;
    }
    .wiki-read-btn {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      color: var(--wiki-text-primary);
      background: var(--wiki-surface);
      text-decoration: none;
      font-size: 12px;
      font-weight: 600;
      padding: 7px 13px;
      border-radius: 8px;
      border: 1px solid var(--wiki-border);
      transition: background 0.15s, transform 0.1s, border-color 0.15s;
      font-family: var(--wiki-font);
      cursor: pointer;
    }
    .wiki-read-btn:hover {
      background: var(--wiki-border);
      border-color: var(--wiki-text-muted);
      transform: translateY(-1px);
    }
    .wiki-read-btn svg { width: 12px; height: 12px; }
    .wiki-copy-toast {
      font-size: 11px;
      color: var(--wiki-text-muted);
      opacity: 0;
      transition: opacity 0.2s;
      pointer-events: none;
    }
    .wiki-copy-toast.show { opacity: 1; }

    /* ── Skeleton Loader ── */
    .wiki-skeleton {
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .wiki-skel-line {
      background: linear-gradient(90deg, var(--wiki-border) 25%, var(--wiki-surface) 50%, var(--wiki-border) 75%);
      background-size: 200% 100%;
      border-radius: 6px;
      animation: wiki-shimmer 1.4s infinite;
    }
    @keyframes wiki-shimmer {
      0%   { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    /* ── Error State ── */
    .wiki-error-state {
      padding: 20px 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      text-align: center;
    }
    .wiki-error-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--wiki-error-soft);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--wiki-error);
      font-size: 18px;
    }
    .wiki-error-state p {
      margin: 0;
      font-size: 13px;
      color: var(--wiki-text-secondary);
      line-height: 1.5;
    }
    .wiki-error-state strong {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: var(--wiki-text-primary);
    }
  `;
  document.head.appendChild(style);
}

let tooltip    = null;
let bubble     = null;
let isPinned   = false;
let isExpanded = false;
let currentUrl = '';
let lastSelectedText = '';
let copyToastTimer = null;

function initBubble() {
  const b = document.createElement('div');
  b.id = 'wiki-trigger-bubble';
  b.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
    Wiki
  `;
  document.body.appendChild(b);
  return b;
}


function initTooltip() {
  const t = document.createElement('div');
  t.id = 'wiki-summary-tooltip';
  document.body.appendChild(t);
  return t;
}



function showTooltip() {
  tooltip.style.display = 'block';
  requestAnimationFrame(() => tooltip.classList.add('visible'));
}

function hideTooltip() {
  if (isPinned) return;
  tooltip.classList.remove('visible');
  setTimeout(() => {
    if (!tooltip.classList.contains('visible')) {
      tooltip.style.display = 'none';
    }
  }, 200);
  hideBubble();
}

function showBubble(rect) {
  let left = rect.left + window.scrollX;
  let top  = rect.bottom + window.scrollY + 8;

  if (left + 90 > window.innerWidth) left = window.innerWidth - 100;
  if (left < 8) left = 8;

  bubble.style.left = left + 'px';
  bubble.style.top  = top + 'px';
  bubble.classList.add('visible');
}

function hideBubble() {
  bubble.classList.remove('visible');
}

function positionTooltip(rect) {
  const W = window.innerWidth;
  const H = window.innerHeight;
  const TW = 360;
  const TH = tooltip.offsetHeight || 300;

  let left = rect.left + window.scrollX;
  let top  = rect.bottom + window.scrollY + 36; // below the bubble

  if (left + TW > W - 12) left = W - TW - 12;
  if (left < 8) left = 8;
  if (top + TH > H + window.scrollY - 12) {
    top = rect.top + window.scrollY - TH - 12;
  }

  tooltip.style.left = left + 'px';
  tooltip.style.top  = top + 'px';
}



function showSkeleton() {
  tooltip.innerHTML = `
    <div class="wiki-toolbar">
      <div class="wiki-toolbar-brand">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
        Wikipedia
      </div>
      <div class="wiki-toolbar-actions">
        <button class="wiki-icon-btn" id="wiki-close-btn" title="Close (Esc)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="wiki-skeleton">
      <div class="wiki-skel-line" style="height:16px; width:55%;"></div>
      <div class="wiki-skel-line" style="height:11px; width:100%;"></div>
      <div class="wiki-skel-line" style="height:11px; width:92%;"></div>
      <div class="wiki-skel-line" style="height:11px; width:78%;"></div>
      <div class="wiki-skel-line" style="height:11px; width:85%;"></div>
      <div class="wiki-skel-line" style="height:30px; width:38%; margin-top:4px;"></div>
    </div>
  `;
  attachCloseBtn();
}



function displaySummary(data) {
  const { title, extract, url, thumbnail } = data;
  currentUrl = url;
  isExpanded = false;

  const needsExpand = extract.length > 280;
  const shortExtract = needsExpand ? extract.slice(0, 280).trimEnd() + '…' : extract;

  tooltip.innerHTML = `
    ${thumbnail ? `<img class="wiki-thumb" src="${thumbnail}" alt="${title}">` : ''}
    <div class="wiki-toolbar">
      <div class="wiki-toolbar-brand">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
        Wikipedia
      </div>
      <div class="wiki-toolbar-actions">
        <button class="wiki-icon-btn" id="wiki-copy-btn" title="Copy summary">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
        </button>
        <button class="wiki-icon-btn" id="wiki-pin-btn" title="Pin tooltip">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/>
          </svg>
        </button>
        <button class="wiki-icon-btn" id="wiki-close-btn" title="Close (Esc)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="wiki-body">
      <h3 class="wiki-title">${title}</h3>
      <p class="wiki-extract ${needsExpand ? 'collapsed' : ''}" id="wiki-extract-text">${shortExtract}</p>
      ${needsExpand ? `<button class="wiki-toggle-btn" id="wiki-expand-btn">Show more</button>` : ''}
    </div>
    <div class="wiki-footer">
      <a class="wiki-read-btn" href="${url}" target="_blank" rel="noopener">
        Read on Wikipedia
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
        </svg>
      </a>
      <span class="wiki-copy-toast" id="wiki-copy-toast">Copied!</span>
    </div>
  `;

  attachCloseBtn();

  
  document.getElementById('wiki-pin-btn')?.addEventListener('click', () => {
    isPinned = !isPinned;
    const btn = document.getElementById('wiki-pin-btn');
    btn?.classList.toggle('active', isPinned);
    tooltip.classList.toggle('pinned', isPinned);
  });

  
  document.getElementById('wiki-copy-btn')?.addEventListener('click', () => {
    const text = `${title}\n\n${extract}\n\n${url}`;
    navigator.clipboard.writeText(text).then(() => {
      const toast = document.getElementById('wiki-copy-toast');
      if (!toast) return;
      toast.classList.add('show');
      clearTimeout(copyToastTimer);
      copyToastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
    });
  });

 
  document.getElementById('wiki-expand-btn')?.addEventListener('click', () => {
    const extractEl = document.getElementById('wiki-extract-text');
    const expandBtn = document.getElementById('wiki-expand-btn');
    if (!extractEl || !expandBtn) return;
    isExpanded = !isExpanded;
    if (isExpanded) {
      extractEl.textContent = extract;
      extractEl.classList.remove('collapsed');
      expandBtn.textContent = 'Show less';
    } else {
      extractEl.textContent = shortExtract;
      extractEl.classList.add('collapsed');
      expandBtn.textContent = 'Show more';
    }
  });
}


function displayError(query) {
  tooltip.innerHTML = `
    <div class="wiki-toolbar">
      <div class="wiki-toolbar-brand">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
        Wikipedia
      </div>
      <div class="wiki-toolbar-actions">
        <button class="wiki-icon-btn" id="wiki-close-btn" title="Close (Esc)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="wiki-error-state">
      <div class="wiki-error-icon">✕</div>
      <div>
        <strong>No article found</strong>
        <p>No Wikipedia page matched <em>"${query}"</em>. Try selecting a more specific term.</p>
      </div>
    </div>
  `;
  attachCloseBtn();
}

function attachCloseBtn() {
  document.getElementById('wiki-close-btn')?.addEventListener('click', () => {
    isPinned = false;
    tooltip.classList.remove('pinned');
    hideTooltip();
  });
}


function init() {
  bubble  = initBubble();
  tooltip = initTooltip();
  injectStyles();
  
  bubble.addEventListener('click', () => {
    const sel = window.getSelection();
    const rect = sel?.rangeCount
      ? sel.getRangeAt(0).getBoundingClientRect()
      : { left: parseInt(bubble.style.left), bottom: parseInt(bubble.style.top), top: parseInt(bubble.style.top) };

    hideBubble();
    showSkeleton();
    showTooltip();
    positionTooltip(rect);

    chrome.runtime.sendMessage(
      { action: 'getWikiSummary', query: lastSelectedText },
      (response) => {
        if (response?.success) {
          displaySummary(response.data);
        } else {
          displayError(lastSelectedText);
        }
        positionTooltip(rect);
      }
    );
  });
}

if (document.body) {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}

document.addEventListener('mouseup', (e) => {
  
  if (tooltip?.contains(e.target) || bubble?.contains(e.target)) return;

  const sel = window.getSelection();
  const selectedText = sel?.toString().trim() ?? '';

  if (selectedText.length > 2) {
    lastSelectedText = selectedText;
    const range = sel.getRangeAt(0);
    const rect  = range.getBoundingClientRect();
    showBubble(rect);
  } else {
    hideBubble();
    hideTooltip();
  }
});


document.addEventListener('mousedown', (e) => {
  if (!tooltip || !bubble) return;
  const clickedInside = tooltip.contains(e.target) || bubble.contains(e.target);
  if (!clickedInside) {
    hideBubble();
    if (!isPinned) hideTooltip();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    isPinned = false;
    tooltip?.classList.remove('pinned');
    hideTooltip();
    hideBubble();
  }
});
