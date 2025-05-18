const searchImput = document.getElementById('search-input'); // serve para pegar o input de busca
const resultQuadros = document.getElementById('result-quadros'); // serve para pegar o resultado dos quadros
const resultContainer = document.getElementById('quadros-container'); // serve para pegar o resultado das playlists

function requestApi(searchTerm) {
    const url = `http://localhost:3000/quadros?name_like=${searchTerm}` // serve para pegar a url da api
    fetch(url) // serve para fazer a requisição da api
        .then((response) => response.json())
        .then((result) => displayResults(result, searchTerm)) //os then estão servindo para pegar o resultado da requisição e transformar em json 
}

function displayResults(result, searchTerm) {
    resultContainer.classList.add('hidden');
    resultQuadros.classList.remove('hidden');
    const gridContainer = document.querySelector('grid-container');
    gridContainer.innerHTML = ''; // serve para limpar os resultados anteriores

    const filteredQuadros = result.filter((quadro) => quadro.name.toLowerCase().includes(searchTerm)); // serve para filtrar os quadros que contém o termo de busca

    filteredQuadros.forEach(quadros => {
        const quadrosCard = document.createElement('div');
        quadrosCard.classList.add('quadros-card');

    quadrosCard.innerHTML = `
    <div class ="card-img">
        <img class ="quadros-img" src="${quadros.urlImg}" />
        <div class="dolla">
            <span class="fas fa-dollar-sign"></span>
            </div>
        </div>
        <div class="card-text">
            <span class="quadros-name">${quadros.name}</span>
            <span class="quadros-categorie">Pintura</span>
        </div>
        `;
        gridContainer.appendChild(quadrosCard);
    });

    resultQuadros.classList.remove('hidden');
}

document.addEventListener('input', function () {
    const searchTerm = searchImput.value.toLowerCase().trim();

    if (searchTerm === '') {
        resultContainer.classList.add('hidden');
        resultQuadros.classList.add('hidden');
        return;
    }

    requestApi(searchTerm);
});