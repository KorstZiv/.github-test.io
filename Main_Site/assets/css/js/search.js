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

            const results = searchAllData(query);
            displayResults(results);
        }, 300));

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = this.value.toLowerCase();
                console.log('Выполнен поиск по запросу:', query);
                const results = searchAllData(query);
                displayResults(results);
            }
        });

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

    function searchAllData(query) {
        return Object.entries(searchData).flatMap(([category, items]) =>
            items.filter(item => 
                item.name.toLowerCase().includes(query) || 
                (item.keywords && item.keywords.some(keyword => keyword.toLowerCase().includes(query)))
            ).map(item => ({ ...item, category }))
        );
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
        { name: 'Lithium Ore', url: 'guides/Resources.html#lithium-ore', keywords: ['литий', 'руда'] },
        { name: 'Quartz', url: 'guides/Resources.html#quartz', keywords: ['кварц'] },
        { name: 'Rare Earth Elements', url: 'guides/Resources.html#rare-earth-elements', keywords: ['редкоземельные', 'элементы'] },
        { name: 'Magnetite', url: 'guides/Resources.html#magnetite', keywords: ['магнетит'] },
        { name: 'Robotic Module', url: 'guides/Resources.html#robotic-module', keywords: ['робот', 'модуль'] },
        { name: 'Energy Crystal', url: 'guides/Resources.html#energy-crystal', keywords: ['энергетический', 'кристалл'] },
        { name: 'Photon Gel', url: 'guides/Resources.html#photon-gel', keywords: ['фотонный', 'гель'] },
        { name: 'Plasma Condensate', url: 'guides/Resources.html#plasma-condensate', keywords: ['плазма', 'конденсат'] },
        { name: 'Organic Polymers', url: 'guides/Resources.html#organic-polymers', keywords: ['органические', 'полимеры'] },
        { name: 'Biological Extract', url: 'guides/Resources.html#biological-extract', keywords: ['биологический', 'экстракт'] },
        { name: 'Genetically-Modified Enzymes', url: 'guides/Resources.html#genetically-modified-enzymes', keywords: ['генетически', 'модифицированные', 'ферменты'] },
        { name: 'Exotic Spores', url: 'guides/Resources.html#exotic-spores', keywords: ['экзотические', 'споры'] },
        { name: 'Heat Regulating Glands', url: 'guides/Resources.html#heat-regulating-glands', keywords: ['терморегулирующие', 'железы'] },
        { name: 'Protein Fiber', url: 'guides/Resources.html#protein-fiber', keywords: ['протеиновое', 'волокно'] },
        { name: 'Nanofibers', url: 'guides/Resources.html#nanofibers', keywords: ['нановолокна'] },
        { name: 'Radioactive Isotopes', url: 'guides/Resources.html#radioactive-isotopes', keywords: ['радиоактивные', 'изотопы'] },
        { name: 'Uncommon Shard', url: 'guides/Resources.html#uncommon-shard', keywords: ['необычный', 'осколок'] },
        { name: 'Rare Shard', url: 'guides/Resources.html#rare-shard', keywords: ['редкий', 'осколок'] },
        { name: 'Epic Shard', url: 'guides/Resources.html#epic-shard', keywords: ['эпический', 'осколок'] },
        { name: 'Rare Lootbox', url: 'guides/Resources.html#rare-lootbox', keywords: ['редкая', 'лутбокс'] },
        { name: 'Coal', url: 'guides/Resources.html#coal', keywords: ['уголь'] },
        { name: 'Copper Ore', url: 'guides/Resources.html#copper-ore', keywords: ['медная', 'руда'] },
        { name: 'Acid', url: 'guides/Resources.html#acid', keywords: ['кислота'] },
        { name: 'Rare Key', url: 'guides/Resources.html#rare-key', keywords: ['редкий', 'ключ'] },
        { name: 'Epic Lootbox', url: 'guides/Resources.html#epic-lootbox', keywords: ['эпическая', 'лутбокс'] },
        { name: 'Iron Ore', url: 'guides/Resources.html#iron-ore', keywords: ['железная', 'руда'] },
        { name: 'Epic Key', url: 'guides/Resources.html#epic-key', keywords: ['эпический', 'ключ'] },
        { name: 'Uncommon Lootbox', url: 'guides/Resources.html#uncommon-lootbox', keywords: ['необычная', 'лутбокс'] },
        { name: 'Uncommon Key', url: 'guides/Resources.html#uncommon-key', keywords: ['необычный', 'ключ'] }
    ],
    avatars: [
        { name: 'Зелёный Аватар', url: 'guides/Avatars.html#green-avatar', keywords: ['зеленый', 'лицензионный'] },
        { name: 'Синий Аватар', url: 'guides/Avatars.html#blue-avatar', keywords: ['синий'] },
        { name: 'Фиолетовый Аватар', url: 'guides/Avatars.html#purple-avatar', keywords: ['фиолетовый'] },
        { name: 'Серый Аватар', url: 'guides/Avatars.html#gray-avatar', keywords: ['серый'] }
    ],
    mobs: [
        { name: 'Лицензионный Аватар', url: 'guides/Mobs.html#licensed-avatar', keywords: ['лицензионный', 'зеленый'], drops: [
            { name: 'Robotic Module', url: 'guides/Resources.html#robotic-module' },
            { name: 'Energy Crystal', url: 'guides/Resources.html#energy-crystal' }
        ] },
        { name: 'Серый Аватар', url: 'guides/Mobs.html#gray-avatar', keywords: ['серый'], drops: [
            { name: 'Nanofibers', url: 'guides/Resources.html#nanofibers' },
            { name: 'Plasma Condensate', url: 'guides/Resources.html#plasma-condensate' }
        ] },
        { name: 'Жаба', url: 'guides/Mobs.html#frog', keywords: ['лягушка'], drops: [
            { name: 'Biological Extract', url: 'guides/Resources.html#biological-extract' },
            { name: 'Exotic Spores', url: 'guides/Resources.html#exotic-spores' }
        ] },
        { name: 'Улитка', url: 'guides/Mobs.html#snail', keywords: ['моллюск'] },
        { name: 'Горилла', url: 'guides/Mobs.html#gorilla', keywords: ['обезьяна'] },
        { name: 'Баран', url: 'guides/Mobs.html#ram', keywords: ['овца'] },
        { name: 'Мама-жаба', url: 'guides/Mobs.html#mother-frog', keywords: ['большая', 'лягушка'] },
        { name: 'Дрон', url: 'guides/Mobs.html#drone', keywords: ['робот'] },
        { name: 'Гвард', url: 'guides/Mobs.html#guard', keywords: ['охранник'] },
        { name: 'Лазер-гриб', url: 'guides/Mobs.html#laser-mushroom', keywords: ['гриб', 'лазер'] },
        { name: 'Турель', url: 'guides/Mobs.html#turret', keywords: ['пушка'] }
    ],
    ores: [
        { name: 'Камень Синий', url: 'guides/Resources.html#blue-stone', keywords: ['синий', 'камень'] },
        { name: 'Камень Жёлтый', url: 'guides/Resources.html#yellow-stone', keywords: ['желтый', 'камень'] },
        { name: 'Камень Фиолетовый', url: 'guides/Resources.html#purple-stone', keywords: ['фиолетовый', 'камень'] },
        { name: 'Камень Зелёный', url: 'guides/Resources.html#green-stone', keywords: ['зеленый', 'камень'] },
        { name: 'Камень Тёмный', url: 'guides/Resources.html#dark-stone', keywords: ['темный', 'камень'] }
    ]
};

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
