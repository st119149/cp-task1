const alphabet = "abcdefghijklmnopqrstuvwxyz";


const data = [];

const fillProp = (maxLenght) => {
    let prop = '';
    const length = Math.round(Math.random()*(maxLenght-1)+1);
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random()*alphabet.length);
        prop += alphabet.split('')[randomIndex];
    }
    prop = prop[0].toUpperCase() + prop.slice(1); 
    return prop;
}

for (let i = 0; i < 95; i++) {
    data.push({
        name: fillProp(7),
        age: Math.round(Math.random()*100),
        weight: Math.round(Math.random()*200),
        color: fillProp(7),
    });
}


export default data;