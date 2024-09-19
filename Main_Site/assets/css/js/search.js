const searchData = {
    resources: [
        { name: 'Lithium Ore', url: 'guides/Resources.html#resources' },
        { name: 'Quartz', url: 'guides/Resources.html#resources' },
        { name: 'Rare Earth Elements', url: 'guides/Resources.html#resources' },
        { name: 'Magnetite', url: 'guides/Resources.html#resources' },
        { name: 'Robotic Module', url: 'guides/Resources.html#resources' },
        { name: 'Energy Crystal', url: 'guides/Resources.html#resources' },
        { name: 'Photon Gel', url: 'guides/Resources.html#resources' },
        { name: 'Plasma Condensate', url: 'guides/Resources.html#resources' },
        { name: 'Organic Polymers', url: 'guides/Resources.html#resources' },
        { name: 'Biological Extract', url: 'guides/Resources.html#resources' },
        { name: 'Genetically-Modified Enzymes', url: 'guides/Resources.html#resources' },
        { name: 'Exotic Spores', url: 'guides/Resources.html#resources' },
        { name: 'Heat Regulating Glands', url: 'guides/Resources.html#resources' },
        { name: 'Protein Fiber', url: 'guides/Resources.html#resources' },
        { name: 'Nanofibers', url: 'guides/Resources.html#resources' },
        { name: 'Radioactive Isotopes', url: 'guides/Resources.html#resources' },
        { name: 'Uncommon Shard', url: 'guides/Resources.html#resources' },
        { name: 'Rare Shard', url: 'guides/Resources.html#resources' },
        { name: 'Epic Shard', url: 'guides/Resources.html#resources' },
        { name: 'Rare Lootbox', url: 'guides/Resources.html#resources' },
        { name: 'Coal', url: 'guides/Resources.html#resources' },
        { name: 'Copper Ore', url: 'guides/Resources.html#resources' },
        { name: 'Acid', url: 'guides/Resources.html#resources' },
        { name: 'Rare Key', url: 'guides/Resources.html#resources' },
        { name: 'Epic Lootbox', url: 'guides/Resources.html#resources' },
        { name: 'Iron Ore', url: 'guides/Resources.html#resources' },
        { name: 'Epic Key', url: 'guides/Resources.html#resources' },
        { name: 'Uncommon Lootbox', url: 'guides/Resources.html#resources' },
        { name: 'Uncommon Key', url: 'guides/Resources.html#resources' }
    ],
    avatars: [
        { name: 'Зелёный Аватар', url: 'guides/Avatars.html' },
        { name: 'Синий Аватар', url: 'guides/Avatars.html' },
        { name: 'Фиолетовый Аватар', url: 'guides/Avatars.html' },
        { name: 'Серый Аватар', url: 'guides/Avatars.html' }
    ],
    mobs: [
        { name: 'Лицензионный Аватар', url: 'guides/Resources.html#mobs' },
        { name: 'Серый Аватар', url: 'guides/Resources.html#mobs' },
        { name: 'Жаба', url: 'guides/Resources.html#mobs' },
        { name: 'Улитка', url: 'guides/Resources.html#mobs' },
        { name: 'Горилла', url: 'guides/Resources.html#mobs' },
        { name: 'Баран', url: 'guides/Resources.html#mobs' },
        { name: 'Мама-жаба', url: 'guides/Resources.html#mobs' },
        { name: 'Дрон', url: 'guides/Resources.html#mobs' },
        { name: 'Гвард', url: 'guides/Resources.html#mobs' },
        { name: 'Лазер-гриб', url: 'guides/Resources.html#mobs' },
        { name: 'Турель', url: 'guides/Resources.html#mobs' }
    ],
    ores: [
        { name: 'Камень Синий', url: 'guides/Resources.html#ores' },
        { name: 'Камень Жёлтый', url: 'guides/Resources.html#ores' },
        { name: 'Камень Фиолетовый', url: 'guides/Resources.html#ores' },
        { name: 'Камень Зелёный', url: 'guides/Resources.html#ores' },
        { name: 'Камень Тёмный', url: 'guides/Resources.html#ores' }
    ]
};

const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    if (query.length < 2) {
        searchResults.style.display = 'none';
        return;
    }

    const results = searchData.resources.filter(item => item.name.toLowerCase().includes(query))
        .map(item => ({ ...item, category: 'Ресурсы' }))
        .concat(searchData.avatars.filter(item => item.name.toLowerCase().includes(query))
            .map(item => ({ ...item, category: 'Аватары' })))
        .concat(searchData.mobs.filter(item => item.name.toLowerCase().includes(query))
            .map(item => ({ ...item, category: 'Мобы' })))
        .concat(searchData.ores.filter(item => item.name.toLowerCase().includes(query))
            .map(item => ({ ...item, category: 'Руда' })));

    displayResults(results);
});

function displayResults(results) {
    if (results.length === 0) {
        searchResults.style.display = 'none';
        return;
    }

    searchResults.innerHTML = '';
    let currentCategory = '';

    results.forEach(result => {
        if (result.category !== currentCategory) {
            currentCategory = result.category;
            const categoryElement = document.createElement('div');
            categoryElement.className = 'search-result-category';
            categoryElement.textContent = currentCategory;
            searchResults.appendChild(categoryElement);
        }

        const resultElement = document.createElement('div');
        resultElement.className = 'search-result-item';
        resultElement.textContent = result.name;
        resultElement.addEventListener('click', () => {
            window.location.href = result.url;
        });
        searchResults.appendChild(resultElement);
    });

    searchResults.style.display = 'block';
}

// Автозаполнение
searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const items = searchResults.querySelectorAll('.search-result-item');
        const currentIndex = Array.from(items).findIndex(item => item === document.activeElement);
        let nextIndex;

        if (e.key === 'ArrowDown') {
            nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        } else {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        }

        items[nextIndex].focus();
    }
});

// Подсказки и исправления
const suggestions = [
    { wrong: 'Литий', correct: 'Lithium Ore' },
    { wrong: 'Кварц', correct: 'Quartz' },
    { wrong: 'Редкоземельные', correct: 'Rare Earth Elements' },
    { wrong: 'Магнетит', correct: 'Magnetite' },
    { wrong: 'Кристалл', correct: 'Energy Crystal' },
    { wrong: 'Фотонный', correct: 'Photon Gel' },
    { wrong: 'Плазма', correct: 'Plasma Condensate' },
    { wrong: 'Полимеры', correct: 'Organic Polymers' },
    { wrong: 'Биологический', correct: 'Biological Extract' },
    { wrong: 'Ферменты', correct: 'Genetically-Modified Enzymes' },
    { wrong: 'Споры', correct: 'Exotic Spores' },
    { wrong: 'Нанофибры', correct: 'Nanofibers' },
    { wrong: 'Изотопы', correct: 'Radioactive Isotopes' },
    { wrong: 'Уголь', correct: 'Coal' },
    { wrong: 'Медь', correct: 'Copper Ore' },
    { wrong: 'Кислота', correct: 'Acid' },
    { wrong: 'Железо', correct: 'Iron Ore' }
];

searchInput.addEventListener('blur', function() {
    const query = this.value.toLowerCase();
    const suggestion = suggestions.find(s => s.wrong.toLowerCase() === query);
    if (suggestion) {
        this.value = suggestion.correct;
    }
});

// Закрытие результатов поиска при клике вне области
document.addEventListener('click', function(event) {
    if (!searchResults.contains(event.target) && event.target !== searchInput) {
        searchResults.style.display = 'none';
    }
});
