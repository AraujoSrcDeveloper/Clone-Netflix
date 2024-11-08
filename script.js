function aba(){
    alert("ABA NÃO ENCONTRADA!")
}


require('dotenv').config();

const apiKey = process.env.API_KEY;
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
    }
};


function formatDate(data) {
    let ano = data.slice(0, 4);
    let mes = data.slice(5, 7);
    let dia = data.slice(8, 10);
    return `${dia}/${mes}/${ano}`;
}

fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
    .then(res => res.json())
    .then(dados => {
        const movieGrid = document.getElementById('movie-grid');
        dados.results.forEach(filme => {
            // Cria o contêiner do item do filme
            const movieItem = document.createElement("div");
            movieItem.classList.add("movie-item");

            // Adiciona a imagem do filme
            const img = document.createElement("img");
            img.src = `https://image.tmdb.org/t/p/w500${filme.backdrop_path}`;
            img.alt = filme.title;
            movieItem.appendChild(img);

            // Contêiner de informações do filme
            const movieInfo = document.createElement("div");
            movieInfo.classList.add("movie-info");

            // Título
            const title = document.createElement("p");
            title.classList.add("movie-title");
            title.innerText = filme.title;
            movieInfo.appendChild(title);

            // Nota do filme
            const rating = document.createElement("span");
            rating.classList.add("movie-rating");
            rating.innerText = `⭐ ${filme.vote_average.toFixed(1)}`;
            movieInfo.appendChild(rating);

            // Data de lançamento
            const release = document.createElement("span");
            release.classList.add("movie-release");
            release.innerText = ` | Lançamento: ${formatDate(filme.release_date)}`;
            movieInfo.appendChild(release);

            // Descrição breve
            const overview = document.createElement("p");
            overview.classList.add("movie-overview");
            overview.innerText = filme.overview;
            movieInfo.appendChild(overview);

            // Adiciona o bloco de informações ao item do filme
            movieItem.appendChild(movieInfo);
            movieGrid.appendChild(movieItem);
        });
    })
    .catch(err => console.error(err));
