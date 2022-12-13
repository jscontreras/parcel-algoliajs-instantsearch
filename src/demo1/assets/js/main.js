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

const myHits = instantsearch.widgets.hits({
  container: '#hits-default__container',
})

const myPaginator = instantsearch.widgets.pagination({
  container: '#pagination',
})


// Array for InstantSearch widgets
const widgets = [
  myInstantSearchGlobalConfig,
  mySearchBox,
  myHits,
  myPaginator
]

// Adding the widgets to the InstantSearch instance
myInstantSearch.addWidgets(widgets);

// Initialize InstantSearch
myInstantSearch.start();
