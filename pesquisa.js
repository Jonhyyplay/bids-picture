const searchImput = document.getElementById('search-input'); // serve para pegar o input de busca
const resultQuadros = document.getElementById('result-quadros'); // serve para pegar o resultado dos quadros
const resultContainer = document.getElementById('quadros-container'); // serve para pegar o resultado das playlists

function requestApi(searchTerm) {
    const url = `http://localhost:3000/quadros?name_like=${searchTerm}` // serve para pegar a url da api
    fetch(url) // serve para fazer a requisição da api
        .then((response) => response.json())
        .then((result) => displayResults(result, searchTerm)) //os then estão servindo para pegar o resultado da requisição e transformar em json 
}

function displayResults(result) {
    resultContainer.classList.add('hidden');

    const quadrosName = document.getElementById('quadros-name');
    const quadrosImage = document.getElementById('quadros-img');

    if (result.length > 0) {
        const quadro = result[0]; // pega o primeiro resultado
        quadrosName.innerText = quadro.name;
        quadrosImage.src = quadro.urlImg;
        resultQuadros.classList.remove('hidden');
    } else {
        resultQuadros.classList.add('hidden');
    }
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
