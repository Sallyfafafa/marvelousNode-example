var fs = require('fs');
// console.log(fs.readdirSync('.'));
// function async (err, files) {
//     console.log(files);
// }
// fs.readdir(process.cwd(), async);
// console.log('我是 scr-index.js');
// console.log(process.argv);
// console.log(process.argv.slice(2));
// console.log(process.cwd());
// console.log(process.chdir('/src'))
// console.log(process.cwd());
// console.log(process.env);
// console.log(process.env.SHELL);
var files = fs.readdirSync(process.cwd()); // 获取当前工作目录下的所有文件
files.forEach(function(file){
    if(/\.css/.test(file)) { //监听以.css后缀的文件
        fs.watchFile(process.cwd()+'/'+file, function(){
            console.log('--'+file);
        })
    }
})
