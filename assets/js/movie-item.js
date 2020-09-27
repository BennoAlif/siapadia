function renderDetail(data) {
  let html = `
        <div id="wrapper">
            <span class="closeBtn">&times;</span>
            <div class="detail row">
                <div class="col-12 col-md-4">
                    <img class="img-fluid rounded-lg shadow-lg" src="https://image.tmdb.org/t/p/w500${
                      data.poster_path
                    }" onerror="this.onerror=null;this.src='./assets/no-image.png';" alt="${
    data.title ? data.title : data.name
  }" />
                </div>
                <div class="col-12 col-md-8">
                    <div class="overview">
                        <h1 class="title">${
                          data.title ? data.title : data.name
                        }</h1>
                        <p class="year">(${data.release_date.substring(
                          0,
                          4
                        )})</p>
                        <div class="synopsis">
                        <h3 class="text-light">Overview</h3>
                        <p>
                            ${data.overview}
                        </p>
                        </div>
                        <div class="tagline">
                        <i>${data.tagline}</i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      `;
  document.querySelector(".movie-details").innerHTML = html;
}

class MovieItem extends HTMLElement {
  set movie(movie) {
    this._movie = movie;
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class="movie-item">
          <img class="poster" src="https://image.tmdb.org/t/p/w500/${
            this._movie.poster_path
          }" onerror="this.onerror=null;this.src='./assets/no-image.png';" alt="poster shadow-lg" />
          <div class="poster-title">
            <h4 class="text-truncate py-3" style="max-width: 160px;">${
              this._movie.title ? this._movie.title : this._movie.name
            }</h4>
          </div>
        </div>`;
    const data = this._movie;

    this.querySelector(".movie-item").addEventListener("click", () => {
      fetch(
        `https://api.themoviedb.org/3/movie/${data.id}?api_key=c23473caa5af6be7b7da26c0efda04e7`
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          renderDetail(res);

          const bgDetail = document.querySelector(".detail");
          res.backdrop_path
            ? (bgDetail.style.backgroundImage = `linear-gradient(0deg,rgba(34, 40, 49, 1) 0%,
          rgba(120, 62, 62, 0.5) 25%,rgba(120, 62, 62, 0.5) 100%),
          url('https://image.tmdb.org/t/p/original${res.backdrop_path}')`)
            : (bgDetail.style.backgroundImage = `linear-gradient(0deg,rgba(34, 40, 49, 1) 0%,
          rgba(120, 62, 62, 0.5) 25%,rgba(120, 62, 62, 0.5) 100%),
          url('./assets/no-backdrop.png')`);

          const closeBtn = document.querySelector(".closeBtn");

          closeBtn.addEventListener("click", function () {
            document.querySelector("#wrapper").remove();
          });
        })
        .catch((err) => console.log(err));
    });
  }
}

customElements.define("movie-item", MovieItem);
