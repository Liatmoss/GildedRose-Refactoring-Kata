type Modifier = { name: string, value: number};

let ValidModifiers = [
    {name: 'Conjured', value: 2},
];

export function calculateModifier(itemName: string): number {
    let defaultModifier = 1;
    
    for(let i = 0; i < ValidModifiers.length; i++) {
        if(containsModifier(itemName, ValidModifiers[i].name)) {
            defaultModifier = defaultModifier * ValidModifiers[i].value;
        }
    }

    return defaultModifier;
}

function containsModifier(name: string, modifier: string) {
    return name.indexOf(modifier) > -1;
}