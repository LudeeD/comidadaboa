var elasticlunr = require("elasticlunr"); // don't forget to run npm install
require('./static/search/lunr.stemmer.support.cjs')(elasticlunr);
require('./static/search/lunr.pt.cjs')(elasticlunr);
const glob = require("glob")
const commonmark = require('commonmark');
const fs = require("fs");

var reader = new commonmark.Parser();
//var writer = new commonmark.HtmlRenderer();
//var result = writer.render(parsed); // result is a String

var index = elasticlunr(function () {
    this.use(elasticlunr.pt);
    this.addField('title');
    this.addField('ingredients');
});

let id = 1;
glob("./recipes/*.md", (er, files) => {

    files.forEach((file) => {
        console.log(file)
        const buffer = fs.readFileSync(file);
        const fileContent = buffer.toString();
        const parsed = reader.parse(fileContent)

        var walker = parsed.walker();
        var event, node;

        var headings = 0;
        var title = ""
        var ingredients = []
        var instruction_order = 0
        var instructions = []

        while ((event = walker.next())) {
            node = event.node;
            if (event.entering && node.type === 'heading') {
                headings += 1;
                if (headings == 1) {
                    title = node.firstChild.literal
                }
            }

            if (headings == 2 && event.entering && node.type === 'item') {
                const ingredient = node.firstChild.firstChild.literal
                let name = ingredient.split(" ")
                let quantity_type = name.pop()
                let quantity = name.pop()
                name = name.join(" ")
                ingredients.push({
                    name: name,
                    quantity: quantity,
                    quantity_type: quantity_type
                })
            }

            if (headings == 3 && event.entering && node.type === 'item') {
                const instruction = node.firstChild.firstChild.literal
                instructions.push({ order: instruction_order, text: instruction })
                instruction_order += 1
            }

        }

        const recipe = {
            "details": {
                "id": id,
                "title": title
            },
            "ingredients": ingredients,
            "instructions": instructions
        }

        console.log(recipe)

        fs.writeFile('./src/routes/recipes/data/' + id + '.json', JSON.stringify(recipe), function (err) {
            if (err) throw err;
            console.log('recipe ' + recipe.details.id + ' written');
        });

        let ingredients_string = ingredients.map((ing) => ing.name).join(" ")

        //console.log(ingredients_string)


        const doc = {
            "title": title,
            "ingredients": ingredients_string
        }

        //console.log(doc)

        //index.addDoc(doc);

        id += 1
        //console.log("inside")

        return
    })

    console.log(index.search("cogumelos"));

    //fs.writeFile('./src/lib/search.json', JSON.stringify(index), function (err) {
    //    if (err) throw err;
    //    console.log('search index written done');
    //});
})
