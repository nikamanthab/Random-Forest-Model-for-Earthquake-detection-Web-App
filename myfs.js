const fs=require('fs');

function read(path){

    return new Promise((res,rej)=>{
        fs.readFile(path,(err,data)=>{
            if(err)
            rej(err);
            res(data);
        });
    });
}

function write(path,data){
    return new Promise((res,rej)=>{
        fs.writeFile(path,data,(err)=>{
            if(err)
            rej(err);
            res(1);
        });
    });
    
}


module.exports={
    read,
    write
}

