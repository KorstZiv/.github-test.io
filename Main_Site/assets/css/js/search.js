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

        document.addEventListener('click', function(event) {
            if (!searchResults.contains(event.target) && event.target !== searchInput) {
                searchResults.style.display = 'none';
            }
        });
    } else {
        console.error('Элементы поиска не найдены');
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
        { name: 'Lithium Ore', url: 'Main_Site/guides/Resources.html#lithium-ore', keywords: ['литий', 'руда'] },
        { name: 'Quartz', url: 'Main_Site/guides/Resources.html#quartz', keywords: ['кварц'] },
        { name: 'Rare Earth Elements', url: 'Main_Site/guides/Resources.html#rare-earth-elements', keywords: ['редкоземельный', 'элемент'] },
        { name: 'Magnetite', url: 'Main_Site/guides/Resources.html#magnetite', keywords: ['магнетит'] },
        { name: 'Robotic Module', url: 'Main_Site/guides/Resources.html#robotic-module', keywords: ['роботик', 'модуль'] },
        { name: 'Energy Crystal', url: 'Main_Site/guides/Resources.html#energy-crystal', keywords: ['энергетический', 'кристалл'] },
        { name: 'Photon Gel', url: 'Main_Site/guides/Resources.html#photon-gel', keywords: ['фотонный', 'гель'] },
        { name: 'Plasma Condensate', url: 'Main_Site/guides/Resources.html#plasma-condensate', keywords: ['плазма', 'конденсат'] },
        { name: 'Organic Polymers', url: 'Main_Site/guides/Resources.html#organic-polymers', keywords: ['органические', 'полимеры'] },
        { name: 'Biological Extract', url: 'Main_Site/guides/Resources.html#biological-extract', keywords: ['биологический', 'экстракт'] },
        { name: 'Genetically-Modified Enzymes', url: 'Main_Site/guides/Resources.html#genetically-modified-enzymes', keywords: ['генетически', 'модифицированные', 'ферменты', 'энзимы', 'ензимы'] },
        { name: 'Exotic Spores', url: 'Main_Site/guides/Resources.html#exotic-spores', keywords: ['экзотические', 'споры'] },
        { name: 'Heat Regulating Glands', url: 'Main_Site/guides/Resources.html#heat-regulating-glands', keywords: ['терморегулирующие', 'железы', 'гланды'] },
        { name: 'Protein Fiber', url: 'Main_Site/guides/Resources.html#protein-fiber', keywords: ['протеин', 'волокно', 'файбер'] },
        { name: 'Nanofibers', url: 'Main_Site/guides/Resources.html#nanofibers', keywords: ['нановолокно', 'нанофайбер', 'файбер'] },
        { name: 'Radioactive Isotopes', url: 'Main_Site/guides/Resources.html#radioactive-isotopes', keywords: ['радиоактивый', 'изотоп'] },
        { name: 'Uncommon Shard', url: 'Main_Site/guides/Resources.html#uncommon-shard', keywords: ['анкомон', 'зелёный', 'осколок', 'шард'] },
        { name: 'Rare Shard', url: 'Main_Site/guides/Resources.html#rare-shard', keywords: ['редкий', 'синий', 'осколок', 'шард'] },
        { name: 'Epic Shard', url: 'Main_Site/guides/Resources.html#epic-shard', keywords: ['эпический', 'фиолетовый', 'осколок', 'шард'] },
        { name: 'Rare Lootbox', url: 'Main_Site/guides/Resources.html#rare-lootbox', keywords: ['синий', 'редкий', 'лутбокс', 'ящик'] },
        { name: 'Coal', url: 'Main_Site/guides/Resources.html#coal', keywords: ['уголь', 'чёрный'] },
        { name: 'Copper Ore', url: 'Main_Site/guides/Resources.html#copper-ore', keywords: ['медь', 'руда'] },
        { name: 'Acid', url: 'Main_Site/guides/Resources.html#acid', keywords: ['кислота', 'асид'] },
        { name: 'Rare Key', url: 'Main_Site/guides/Resources.html#rare-key', keywords: ['редкий', 'синий', 'ключ'] },
        { name: 'Epic Lootbox', url: 'Main_Site/guides/Resources.html#epic-lootbox', keywords: ['эпический', 'эпик', 'фиолетовый', 'лутбокс', 'ящик'] },
        { name: 'Iron Ore', url: 'Main_Site/guides/Resources.html#iron-ore', keywords: ['железо', 'руда'] },
        { name: 'Epic Key', url: 'Main_Site/guides/Resources.html#epic-key', keywords: ['эпический', 'эпик', 'фиолетовый', 'ключ'] },
        { name: 'Uncommon Lootbox', url: 'Main_Site/guides/Resources.html#uncommon-lootbox', keywords: ['необычная', 'зелёный', 'анкомон', 'лутбокс'] },
        { name: 'Uncommon Key', url: 'Main_Site/guides/Resources.html#uncommon-key', keywords: ['необычный', 'зелёный', 'анкомон', 'ключ'] }
    ],
    avatars: [
        { name: 'Зелёный Аватар', url: 'Main_Site/guides/Avatars.html#green-avatar', keywords: ['зеленый', 'лицензионный'] },
        { name: 'Синий Аватар', url: 'Main_Site/guides/Avatars.html#blue-avatar', keywords: ['синий'] },
        { name: 'Фиолетовый Аватар', url: 'Main_Site/guides/Avatars.html#purple-avatar', keywords: ['фиолетовый'] },
        { name: 'Серый Аватар', url: 'Main_Site/guides/Avatars.html#gray-avatar', keywords: ['серый'] }
    ],
    mobs: [
        { name: 'Лицензионный Аватар', url: 'Main_Site/guides/Resources.html#licensed-avatar', keywords: ['лицензионный', 'зеленый'] },
        { name: 'Серый Аватар', url: 'Main_Site/guides/Resources.html#gray-avatar', keywords: ['серый'] },
        { name: 'Жаба', url: 'Main_Site/guides/Resources.html#frog', keywords: ['лягушка'] },
        { name: 'Улитка', url: 'Main_Site/guides/Resources.html#snail', keywords: ['ништяк'] },
        { name: 'Горилла', url: 'Main_Site/guides/Resources.html#gorilla', keywords: ['обезьяна'] },
        { name: 'Баран', url: 'Main_Site/guides/Resources.html#ram', keywords: ['овца', 'козёл'] },
        { name: 'Мама-жаба', url: 'Main_Site/guides/Resources.html#mother-frog', keywords: ['большая', 'лягушка'] },
        { name: 'Дрон', url: 'Main_Site/guides/Resources.html#drone', keywords: ['робот', 'летающий'] },
        { name: 'Гвард', url: 'Main_Site/guides/Resources.html#guard', keywords: ['охранник', 'босс', 'большой', 'луч', 'лазер', 'робот'] },
        { name: 'Лазер-гриб', url: 'Main_Site/guides/Resources.html#laser-mushroom', keywords: ['гриб', 'лазер'] },
        { name: 'Турель', url: 'Main_Site/guides/Resources.html#turret', keywords: ['паук', 'робот'] }
    ],
    ores: [
        { name: 'Камень Синий', url: 'Main_Site/guides/Resources.html#blue-stone', keywords: ['синий', 'камень'] },
        { name: 'Камень Жёлтый', url: 'Main_Site/guides/Resources.html#yellow-stone', keywords: ['желтый', 'камень'] },
        { name: 'Камень Фиолетовый', url: 'Main_Site/guides/Resources.html#purple-stone', keywords: ['фиолетовый', 'камень'] },
        { name: 'Камень Зелёный', url: 'Main_Site/guides/Resources.html#green-stone', keywords: ['зеленый', 'камень'] },
        { name: 'Камень Тёмный', url: 'Main_Site/guides/Resources.html#dark-stone', keywords: ['темный', 'камень'] }
    ]
};

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
