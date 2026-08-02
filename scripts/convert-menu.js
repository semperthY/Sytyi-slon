const fs = require("fs");
const path = require("path");


const sourceDir = path.join(
    __dirname,
    "..",
    "src",
    "data",
    "menu"
);


const outputDir = path.join(
    __dirname,
    "..",
    "data",
    "menu"
);



const prefixes = {

    salads: "SAL",
    soups: "SOU",
    meat: "MEA",
    homemade: "HOM",
    bakery: "BAK",
    drinks: "DRI",
    "cold-rolls": "CLR",
    "baked-rolls": "BLR",
    sides: "SID",
    sets: "SET"

};



function now() {

    return new Date()
        .toISOString();

}



function extractItems(content) {


    const result = [];


    const itemRegex =
        /\{\s*id:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"([\s\S]*?)price:\s*(\d+)[\s\S]*?\}/g;



    let match;


    while ((match = itemRegex.exec(content)) !== null) {


        const slug = match[1];

        const name = match[2];

        const block = match[3];

        const price = Number(match[4]);



        let value = "";



        const weight =
            block.match(/weight:\s*"([^"]+)"/);



        if (weight) {

            value = weight[1];

        }



        const pieces =
            block.match(/pieces:\s*(\d+)/);



        if (pieces) {

            value = `${pieces[1]} шт.`;

        }



        result.push({

            slug,

            name,

            description: "",

            value,

            price,

            image: "",

            visible: true,

            available: true,

            popular: false,

            deleted: false,

            sort: result.length + 1,

            createdAt: now(),

            updatedAt: now()

        });


    }


    return result;

}



function convertCategory(file) {


    const category =
        path.basename(file, ".ts");


    if (!prefixes[category]) {

        return;

    }



    const content =
        fs.readFileSync(
            file,
            "utf8"
        );



    const items =
        extractItems(content);



    const prefix =
        prefixes[category];



    items.forEach((item, index) => {

        item.id =
            prefix +
            String(index + 1)
                .padStart(3, "0");

    });



    const output =
        path.join(
            outputDir,
            category + ".json"
        );



    fs.writeFileSync(

        output,

        JSON.stringify(
            items,
            null,
            4
        ),

        "utf8"

    );



    console.log(
        category,
        "→",
        items.length,
        "items"
    );

}



if (!fs.existsSync(outputDir)) {

    fs.mkdirSync(
        outputDir,
        {
            recursive: true
        }
    );

}



fs.readdirSync(sourceDir)
    .filter(
        file => file.endsWith(".ts")
    )
    .forEach(
        file =>
            convertCategory(
                path.join(
                    sourceDir,
                    file
                )
            )
    );



console.log("Готово.");