const money = document.getElementById('money');
const time = document.getElementById('time');
const myButton = document.getElementById('myButton');

money.innerHTML = '646';
time.innerHTML = '1';


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
    console.log(fileData);
    let text = await fileData.text();
    console.log('RESULTS:', text);
}
catch{

}}