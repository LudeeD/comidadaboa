import fs from 'fs';

export function load({ params }) {
    const titles = loadRecipeTitlesFromFolder()

    // console.log(titles)

    return {
        recipes: titles
    };
}

function loadRecipeTitlesFromFolder() {
    const folderPath = 'src/recipes';
    const result = []
    const fileNames = fs.readdirSync(folderPath);
    fileNames.forEach(fileName => {
        const fileData = fs.readFileSync(`${folderPath}/${fileName}`, 'utf-8')
        const jsonData = JSON.parse(fileData);
        result.push({ slug: fileName.split('.')[0], title: jsonData.title })
    })
    return result;
}