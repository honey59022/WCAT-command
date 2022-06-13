#!/usr/bin/env node

let fs=require("fs");

let inputArr=process.argv.splice(2);

let optionArr=[];
let fileArr=[];

for(let i=0;i<inputArr.length;i++){
    if(inputArr[i].charAt(0)=='-')optionArr.splice(0,0,inputArr[i]); // option check
    else fileArr.push(inputArr[i]);   // path check
}



// check for all correct file paths
for(let i=0;i<fileArr.length;i++){
    if(fs.existsSync(fileArr[i])==false || fs.lstatSync(fileArr[i]).isFile()==false){
        console.log(`${fileArr[i]} file path not exist`);
        return;
    }
}


if(optionArr.length==0){
    for(let i=0;i<fileArr.length;i++){
        console.log(fs.readFileSync(fileArr[i])+"\n");
    }
}
else if(optionArr.includes("-b") && optionArr.includes("-n")){
    //check if -n and -b both are present together or not
    console.log("Error etiher use -n or -b option");

}
else{
    let content="";

    //Reading content from all files
    for(let i=0;i<fileArr.length;i++){
        content+=fs.readFileSync(fileArr[i])+"\n";
    }

    let contentArr=content.split("\n");
    

    if(optionArr.includes("-s")){ // remove extra line breaks 
        for(let i=1;i<contentArr.length;i++){
            if(contentArr[i]=='' && contentArr[i-1]==''){
                contentArr[i]=null;
            }
            else if(contentArr[i]=='' && contentArr[i-1]==null){
                contentArr[i]=null;
            }
        }

        let tempArr=[];
        for(let i=0;i<contentArr.length;i++){
            if(contentArr[i]!=null)
                tempArr.push(contentArr[i]);
        }

        contentArr=tempArr;
    }
    
    if(optionArr.includes("-n")){ // add number to each line
        for(let i=0;i<contentArr.length;i++){
            contentArr[i]=`${i+1} ${contentArr[i]}`;
        }

    }

    if(optionArr.includes("-b")){ // add number to content lines only
        for(let i=0,lineNo=1;i<contentArr.length;i++){
            if(contentArr[i]!=''){
                contentArr[i]=`${lineNo} ${contentArr[i]}`;
                lineNo++;
            }
        }

    }


    console.log(contentArr.join("\n"));
}







/*
    Here the options are -s -n and -b 
    
    -s -> to remove extra line breaks
    -n -> to add numbers to the lines
    -b -> to add number to only content lines

    
    ** -b and -n is not used togethere 
    ** wcat is the global command for this 
*/



