var fs = require('fs');
// console.log(fs.readdirSync('.'));
// function async (err, files) {
//     console.log(files);
// }
// fs.readdir(process.cwd(), async);
var stats = [];

fs.readdir(process.cwd(), function (err, files) {
    console.log('接下来是输入输出的学习'); 
    if(!files.length) { // 如果空文件夹，没有文件列表，则
        return console.log('\033[31m No files to show!\033[0m\n'); // \033[31m 用来给字体加颜色红色31m， \033[0m 颜色结束标志
    }
    console.log('select which file or directory you want to see\n');
    function file(i) { // 这是每个元素都会执行的一个函数 （串行执行）
        var filename = files[i];
        fs.stat(__dirname + '/' + filename, function (err, stat) { // fs.stat给出文件或目录的元数据
                                // 回调function函数中的err
            stats[i] = stat;
            if(stat.isDirectory()) { // 如果是目录则
                console.log(' ' + i + '\033[31m' + filename + '\033[0m');
            } else {
                console.log(' ' + i + '\033[32m' + filename + '\033[0m');
            }
            if (++i == files.length) {
                read();
            } else {
                file(i);
            }
        });
    }
    file(0);
    function read() {
        console.log('');
        process.stdout.write('Enter your choice：'); //无需换行的提示
        process.stdin.resume(); //等待用户输入
        process.stdin.setEncoding('utf8'); // 设置流编码，这样就支持特殊字符了
        process.stdin.on('data', option); // 监听输入
    }
    function option (data) {
        console.log('data:'+data);
        console.log('files[Number(data)]:', files[Number(data)]);
        let filename = files[Number(data)];
         if(!filename) { // 这里判断输入如果不是数字，则提示
            process.stdout.write('enter your choice!');
        } else {
            if(stats[Number(data)].isDirectory()) {
                fs.readdir(__dirname+'/'+filename, function(err,files) {
                    console.log('('+files.length+'files)');
                    files.forEach(file => {
                        console.log('\033[31m-'+file+'\033[0m');
                    });
                } )
            } else {
                process.stdout.pause();
                fs.readFile(__dirname + '/' + filename, 'utf8', function (err, data) {
                    console.log('file');
                    console.log(filename);
                    console.log('\033[32m' + data.replace(/(.*)g/, '     $1') + '\033[0m');
                })
    
            }
        }
    }
})