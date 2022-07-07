const money = document.getElementById('money');
const time = document.getElementById('time');
const myButton = document.getElementById('myButton');

money.innerHTML = '646';
time.innerHTML = '1';

// RETURNS THE BASEPATH BY ASSUMING MOST USED URL IS THE BASEPATH
const getBasePath = (text) => {
    let Domains = {};
    // LOOK THROUGH EVERY LINE FOR URLS AND STORE INFO INTO AN OBJECT
    text.forEach((line, i) => {
        // ONLY IF URL INCLUDES HTTP DO WE STORE INTO OBJECT
        if (line.includes('http')) {
            // START LOOKING AT EACH LINE FROM HTTP AND FORWARD
            line = line.slice(line.indexOf('http'));
            if (!line.includes('.com')) {
                console.log('ATTENTION: This line might not be included in your file: ' + line);
            }
            let domain = line.slice(line.indexOf('http'),line.indexOf('.com')+4);
            if (domain.includes('www')) {
                domain = domain.slice(domain.indexOf('www')+3)
            }
            if (!Domains[domain]) {
                Domains = {...Domains, [domain]: {count: 1, url: domain} };
            } else {
                Domains[domain].count ++;
            }
        }
    })
    let mostUsed = {domain: '', count: 0}
    Object.values(Domains).forEach((each, i) => {
        if (each.count > mostUsed.count) {
            mostUsed = each; // new most used url found
        }
    })
    // some clean up..
    if (mostUsed.url.includes('//')) {
        mostUsed.url = mostUsed.url.split('//')[1];
    }
    if (mostUsed.url.includes('www.')) {
        mostUsed.url = mostUsed.url.split('www')[1];
    }
    mostUsed.url = mostUsed.url.split('.com')[0];
    return mostUsed.url
}

// GET DESTINATION FOR OUR REDIRECTS
const getDestination = (lineEdit, basePath) => {
    // IF EXTIOROR URLS FLAG THEM AS BASEPATH FALSE (I personally know their specific lengths of good urls, this isn't a very good method, but works for now)
    if (![0,8,12].includes(lineEdit[3].split('.com')[0].split(basePath)[0].length)) {
        return {destination: lineEdit[3], basePath: false};
    } else {
        return {destination: lineEdit[3]};
    }
}

// USER GRABS FILE
let fileHandle;
async function button() {try{
    let [fileHandle] = await window.showOpenFilePicker({
        types: [
            {
                description: 'txt',
                accept: {
                    'file/*': '.txt'
                }
            }
        ],
        excludeAcceptAllOption: true,
        multiple: false
    });
    let fileData = await fileHandle.getFile();
    let text = await fileData.text();

    // DECLARE NEW FILE
    let newJSfile = [];

    // LETS LOOK AT THIS FILE ONE LINE AT A TIME
    text = text.split(/\r|\n/.exec(text))
    // SAVE MOST FOUND DOMAIN AS BASEPATH
    const basePath = getBasePath(text);
    
    text.forEach((line, i) => {
        let lineEdit;

        // ADD COMMENTED LINES
        if (line.charAt(1) === '#') {
            lineEdit = '//'+line.substring(2, line.length)+'\n';
            newJSfile.push(lineEdit);
        }
        // ADD REDIRECTS IF THEY HAVE NOT ALREADY BEEN ADDED AS A COMMENT
        if ((line.charAt(1) !== '#') && (line.includes('Redirect'))) {
            let object = {};
            lineEdit = line.split(' ');
            let thisDestination = getDestination(lineEdit, basePath)
            object = {source: lineEdit[2], destination: thisDestination.destination}
            if (thisDestination.basePath === false ) {
                object = {...object, basePath: thisDestination.basePath};
            }
            object = {...object, permanent: lineEdit[1] == 301 ? true : false};

            newJSfile.push('\n'+JSON.stringify(object)+'\n')

        }
    })
    newJSfile = '// ADD THIS TO YOUR next.config.js file\nconst array = ['+newJSfile+'];';
    // FIX ADDED COMMAS
    let FIX = '';
    newJSfile.split(/\r|\n/.exec(newJSfile)).forEach((line, i) => {
        if (line.length > 1) {
            let thisEdit = line;
            if (line.charAt(0) === ',') {
                thisEdit = line.slice(1);
            }
            FIX = FIX+thisEdit+',\n';
        }
    })
    console.log('Note to developer: there is an extra comma at the very end of the file, you should delete it or if desired, change this code. I personally did not waste more time on this project...');
    newJSfile = FIX;
    const fileToSave = {file: newJSfile, fileName: 'newJSfile.js'};

    // SAVE FILE
    async function saveAs(file) {try{
        // CREATE BLOB
        var myBlob = new Blob([file.file], {type: '.js'})
        // FILE HANDLE / STREAM
        const fileHandle = await window.showSaveFilePicker({
            suggestedName: file.fileName,
            types: [{
                description: 'Translated Redirects of a txt file into JS file',
                accept: {"text/plain": [".js"]}
            }]
        });

        const fileStream = await fileHandle.createWritable();
        // WRITE FILE
        await fileStream.write(myBlob);
        await fileStream.close();
        return;
    }
    catch{
        console.log('Save has been canceled, Sorry for this mishap.');
    }}
    saveAs(fileToSave);
}
catch{
    console.log('Selection of file came up empty. Sorry about that.');
}}