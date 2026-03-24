const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let dirpath = './to do list';
if(!fs.existsSync(dirpath)){
    fs.mkdirSync(dirpath);
}

let filepath = './to do list/todos.json'
if(!fs.existsSync(filepath)){
    fs.writeFileSync(filepath, "[]")
}

function main(){
    console.log('\n=== TO DO LIST CLI ===')
    console.log('1. Tambah Tugas')
    console.log('2. Hapus Tugas')
    console.log('3. Lihat Tugas')
    console.log('4. Keluar')
    rl.question('Pilih Menu Seusai Number: ', (answer)=>{
        if(answer === '1'){
            addtodos();
        } else if (answer === '2'){
            deltodos();
        } else if (answer === '3'){
            showtodos();
        } else if (answer === '4') {
            rl.close();
        } else {
            console.log('Pilihan Tidak Valid')
            main();
        }
    });
};


function addtodos(){
    let result = fs.readFileSync(filepath, 'utf-8');
    let json = JSON.parse(result)
    rl.question('silahkan masukan nama tugas: ', (answer)=>{
        json.push(answer)
        fs.writeFileSync(filepath, JSON.stringify(json));
        console.log(`${answer} berhasil ditambahkan !`)
        main();
    });
}

function showtodos(){
    console.log('\n===== TUGAS TERDAFTAR =====')
    let file = fs.readFileSync(filepath, 'utf-8');
    let json = JSON.parse(file);
    if(json.length === 0){
        console.log('Belum Ada Tugas')
        main();
    } else {
        json.forEach((item, index)=>{
            console.log(`${index + 1}. ${item}`)
        });
        main();
    };
};

function deltodos(){
    console.log('==== HAPUS TUGAS ====')
    let task = fs.readFileSync(filepath, 'utf-8')
    let json = JSON.parse(task)

    if(json.length === 0){
        console.log('Tugas Masih  Kosong')
    } else {
        json.forEach((item, index)=>{
            console.log(`${index + 1}. ${item}`)
        });
        rl.question('Pilih Nomor Tugas yang Ingin Dihapus: ', (answer)=>{
            let Pilihan = parseInt(answer)
            if(Pilihan> 0 && Pilihan <= json.length){
                json.splice(Pilihan -1, 1)
                fs.writeFileSync(filepath, JSON.stringify(json))
                console.log(`Tugas Telah Dihapus`)
                main();
            } else {
                console.log('Pilihan Tidak Valid')
                main();
            }

        })
    }
}



main();