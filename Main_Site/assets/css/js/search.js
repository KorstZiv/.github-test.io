console.log('search.js загружен');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM полностью загружен');
    
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (searchInput && searchResults) {
        console.log('Элементы поиска найдены');
        
        searchInput.addEventListener('input', debounce(function() {
            const query = this.value.toLowerCase();
            console.log('Введен текст:', query);
            
            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }

            const results = Object.entries(searchData).flatMap(([category, items]) =>
                items.filter(item => item.name.toLowerCase().includes(query))
                    .map(item => ({ ...item, category }))
            );

            displayResults(results);
        }, 300));

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = this.value.toLowerCase();
                console.log('Выполнен поиск по запросу:', query);
                // Здесь можно добавить дополнительную логику поиска
            }
        });

        // Закрытие результатов поиска при клике вне области
        document.addEventListener('click', function(event) {
            if (!searchResults.contains(event.target) && event.target !== searchInput) {
                searchResults.style.display = 'none';
            }
        });
    } else {
        console.error('Элементы поиска не найдены');
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

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
});

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
