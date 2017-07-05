var fs = require("fs");

//path模块，可以生产相对和绝对路径
var path = require("path");


//获取当前目录绝对路径，这里resolve()不传入参数
var filePath = path.resolve();

//读取文件存储数组
var fileArr = [];

//读取文件目录
fs.readdir(filePath, function(err, files) {
    if (err) {
        console.log(err);
        return;
    }
    var count = files.length;
    var results = {};
    files.forEach(function(filename) {

        //filePath+"/"+filename不能用/直接连接，Unix系统是”/“，Windows系统是”\“
        fs.stat(path.join(filePath, filename), function(err, stats) {
            if (err) throw err;
            //文件
            if (stats.isFile()) {
                if (getdir(filename) === 'json') {
                    // var newUrl = remotePath + filename;
                    // fileArr.push(newUrl);
                    var data = fs.readFile(filename,"utf-8",function(err,data){
                        if(err){
                            console.error("读取文件失败!");
                        }else{
                            writeFile(data,filename.split(".")[0]);
                        }
                    });
                    
                }
            } else if (stats.isDirectory()) {
                //返回指定文件名的扩展名称 
                if (filename == 'css' || filename == 'images') {
                    var name = filename;
                    readFile(path.join(filePath, filename), name);
                }
            }
        });
    });
});


//获取后缀名
function getdir(url) {
    var arr = url.split('.');
    var len = arr.length;
    return arr[len - 1];
}

//获取文件数组
function readFile(readurl, name) {
    console.log(name);
    var name = name;
    fs.readdir(readurl, function(err, files) {
        if (err) {
            console.log(err);
            return;
        }

        files.forEach(function(filename) {
            fs.stat(path.join(readurl, filename), function(err, stats) {
                if (err) throw err;
                //是文件
                if (stats.isFile()) {
                    var newUrl = remotePath + name + '/' + filename;
                    fileArr.push(newUrl);
                    writeFile(fileArr)
                        //是子目录
                } else if (stats.isDirectory()) {
                    var dirName = filename;
                    readFile(path.join(readurl, filename), name + '/' + dirName);
                }
            });
        });
    });
}


// 写txt文件
function writeFile(data,fileName) {
    fs.writeFile(filePath + "/" + fileName + ".txt", data + '\n', function(err) {
        if (err) throw err;
        console.log("写入成功");
    });
}
