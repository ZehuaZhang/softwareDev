function findLowestCommonTerritory(territoryList, inputs) {
    const parents = {};
    territoryList.forEach(t => {
        t.forEach((a, i) => {
            if (i !== 0) {
                parents[a] = t[0];
            }
        });  
    });

    const result = [];
    for (const input of inputs) {
        result.push(lca(parents, input[0], input[1]));       
    }

    return result;
}

function lca(parents, node1, node2) {
    const ancestors = new Set();
    while (node1) {
        ancestors.add(node1);
        node1 = parents[node1];
    }

    while (node2 && !ancestors.has(node2)) {
        node2 = parents[node2];
    }
    return node2;
}

const testInputs = [
    [
        [
            ['Earth', 'South America', 'North America', 'Asia', 'Pacific', 'Africa'],
            ['Asia', 'China', 'Korea', 'Japan'],
            ['North America', 'USA', 'Canada'],
            ['South America', 'Brazil', 'Columbia'],
            ['Africa', 'Algeria', 'Lybia'],
            ['China', 'Beijing', 'Shanhai'],
            ['Japan', 'Tokyo', 'Kyoto'],
            ['Korea', 'Seoul']
        ],
        [
            ['Tokyo', 'Kyoto'], 
            ['Beijing', 'Japan'], 
            ['Seoul', 'Africa']
        ]
    ]
]

testInputs.forEach((input, index) => {
    const result = findLowestCommonTerritory(...input);
    console.log(`Test ${index}:`, result);
})
