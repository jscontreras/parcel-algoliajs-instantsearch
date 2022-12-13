const { algoliasearch, instantsearch } = window;

//1. Instance client using API key and App Name
const searchClient = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');

// Create instantSearch instance using instant_search index and client
const myInstantSearch = instantsearch({
  indexName: 'instant_search',
  searchClient,
});

/**
 * INSTANT SEARCH WIDGETS
 */

// Instant Search Global Configuration Widget
const myInstantSearchGlobalConfig = instantsearch.widgets.configure({
  hitsPerPage: 5,
});

// Defining searchbox Widget
const mySearchBox = instantsearch.widgets.searchBox({
  container: '#searchbox__container',
  placeholder: 'Search for products',
});


const myPaginator = instantsearch.widgets.pagination({
  container: '#pagination',
});

// CUSTOM CONNECTOR EXAMPLE

// 1. Create a render function](#create-a-render-function)
const renderHits = (renderOptions, isFirstRender) => {
  const { hits, widgetParams } = renderOptions;
  document.querySelector(widgetParams.container).innerHTML = `
    <ul class="cat-list">
      ${hits
      .map(
        (item) =>
          `<li>
              <img src="https://cataas.com/cat/says/${encodeURI(item.name.split(' ').slice(0, 5).join(' '))}?width=450&height=450" />
            </li>`
      )
      .join('')}
    </ul>
  `;
};


// 2. Create the custom widget](#create-and-instantiate-the-custom-widget)
const customHits = instantsearch.connectors.connectHits(renderHits)
 //3 Instanciate
const myCustomCatHits = customHits({
  container: '#custom-hits__container'
});


// Array for InstantSearch widgets
const widgets = [
  myInstantSearchGlobalConfig,
  mySearchBox,
  myCustomCatHits,
  myPaginator
]

// Adding the widgets to the InstantSearch instance
myInstantSearch.addWidgets(widgets);

// Initialize InstantSearch
myInstantSearch.start();
