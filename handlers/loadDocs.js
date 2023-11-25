const { Collection } = require("discord.js");
const fs = require("fs");
const join = require("path").join;
const docsPath = "../vendor/openmp_web/docs";
const mainDocsPath = `${docsPath}/scripting`;
const translatedDocsPath = `${docsPath}/translations/scripting`;
const link = "https://www.open.mp/docs/scripting/";
//const categories = ['scripting']
const docsToShow = ["callbacks"];
module.exports = async (client) => {
    client.docs = {};
    for (let folder of docsToShow) {
        client.docs[folder] = new Collection();
        let files = fs.readdirSync(
            join(__dirname, `${mainDocsPath}/${folder}`)
        );
        for (let file of files) {
            let doc = fs.readFileSync(
                join(__dirname, `${mainDocsPath}/${folder}/${file}`),
                "utf-8"
            );
            let result = doc
                .split(/##\s+Related/)[0] //Remove related callbacks/functions  section
                .replace(/\.\.\//g, link); //place open.mp links

            let docData = {};
            //
            // Extracting the docs sections
            //table
            let regex3 = /\|.*\|/g;
            let table = result.match(regex3);
            if (table) tableRows = formatTable(table) ?? null;
            docData.table = tableRows ?? null;

            //code
            let regex2 = /```c[^`]*```/gm;
            let code = result.match(regex2);
            docData.code = code;

            //notes
            let regex1 = /##[^#]*:::/g;
            let notes = result.match(regex1);
            docData.notes = notes;

            let f = result
                .replace(regex1, "")
                .replace(regex2, "")
                .replace(regex3, "")
                .replace(/##\s+[^#]*#/, "");

            let regex4 = /#[^#]*/;
            let returns = f.match(regex4);
            if (returns) {
                docData.returns =
                    "#" +
                    returns[0]
                        .slice(0, -1)
                        .trim()
                        .split(/\r\n\r\n/)
                        .join("\n");
                if (docData.returns.trim().length < 15) {
                    docData.returns = null;
                }
            }
            //description
            let description = result.match(/##[^\|]*/)[0].split(/[\n\r]+/)[1];
            description
                ? (docData.description = description)
                : (docData.description = null);

            let docName = file.substring(0, file.length - 3);
            docData.name = docName;

            client.docs[folder].set(docName, docData);
        }
    }
    module.exports = client;
};

function formatTable(table) {
    table = table.slice(2); //remove the table headers

    //get the table data
    let filtered = table.map((row) =>
        row
            .split("|")
            .map((str) => str.trim())
            .filter((str) => str !== "")
    );

    //formats the data to a array of objects
    return filtered.map((row) => ({
        [row[0].trim()]: row[1].trim(),
    }));
}
