export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.API_KEY = '19837297-3c1eb29d6cccb9d5ee4225e8f';
    this.totalHits = 0;
  }
  fetchArticles() {
    return fetch(
      `https://pixabay.com/api/?key=${this.API_KEY}&q=${this.searchQuery}&image_type=photo&page=${this.page}&per_page=12&orientation=horizontal`,
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.totalHits = data.totalHits;
        console.log(this.totalHits);
        this.incrementPage();
        return data;
      })
      .catch(err => console.log(err));
  }
  // delay(ms) {
  //   return new Promise(resolve => setTimeout(() => resolve(''), ms));
  // }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.totalHits = 0;
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
