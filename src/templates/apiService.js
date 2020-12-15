const apiKey = '19525294-22d6d1e180bf9905034ff3396';

export default {
  searchQuery: '',
  page: 1,
  async fetchImages() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${apiKey}`;

    try {
      const resolve = await fetch(url);
      const { hits } = await resolve.json();
      this.nextPage();
      return hits;
    } catch (error) {
      return console.log(error);
    }
  },

  resetPage() {
    this.page = 1;
  },
  nextPage() {
    this.page += 1;
  },
  get query() {
    return this.searchQuery;
  },
  set query(value) {
    this.searchQuery = value;
  },
};
