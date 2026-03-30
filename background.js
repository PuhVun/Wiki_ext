
const WIKI_API = 'https://en.wikipedia.org/api/rest_v1/page/summary/';


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getWikiSummary') {
    fetchWikiSummary(request.query)
      .then((data) => {
        sendResponse({ success: true, data });
      })
      .catch((error) => {
        console.error('Error fetching summary:', error);
        sendResponse({ success: false, error: error.message });
      });
    
  
    return true;
  }
});

async function fetchWikiSummary(query) {
  try {
    const encodedQuery = encodeURIComponent(query);
    const response = await fetch(`${WIKI_API}${encodedQuery}`);
    
    if (!response.ok) {
      throw new Error('Page not found');
    }
    
    const data = await response.json();
   
    return {
      title: data.title,
      extract: data.extract || 'No summary available',
      url: data.content_urls.desktop.page,
      thumbnail: data.thumbnail?.source || null
    };
  } catch (error) {
    throw new Error(`Failed to fetch summary: ${error.message}`);
  }
}
