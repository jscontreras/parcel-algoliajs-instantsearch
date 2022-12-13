import { tagsMiddleware } from './../../../extra/utils.js'
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
  hitsPerPage: 10,
});

// Defining searchbox Widget
const mySearchBox = instantsearch.widgets.searchBox({
  container: '#searchbox__container',
  placeholder: 'Search for products',
});

const myHitsCustomTemplate = instantsearch.widgets.hits({
  container: '#hits-custom__container',
  templates: {
    item: `
    <article>
      <img src="{{{image}}}"/>
      <div class="article__description">
        <a href="#" class="text-blue-400">{{{_highlightResult.name.value}}}</a>
        <p>{{{_highlightResult.description.value}}}</p>
      </div>
    </article>
    `
  },
  transformItems(items) {
    return items.map(item => {
      item._highlightResult.name.value = item._highlightResult.name.value.toUpperCase() + '!!!'
      return {
      ...item
    }});
  },
})

const myPaginator = instantsearch.widgets.pagination({
  container: '#pagination',
})


// Array for InstantSearch widgets
const widgets = [
  myInstantSearchGlobalConfig,
  mySearchBox,
  myHitsCustomTemplate,
  myPaginator
]

// Adding the widgets to the InstantSearch instance
myInstantSearch.addWidgets(widgets);

// Use custom Middleware
myInstantSearch.use(tagsMiddleware);

// Initialize InstantSearch
myInstantSearch.start();
