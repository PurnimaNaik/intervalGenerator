function uploadDealcsv () {}; 

let table=document.getElementById("tableBody")
let backToTopButton=document.getElementById("backToTop")
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
  }

  backToTopButton.addEventListener("click",()=>{
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  })

  /*------ Method for read uploded csv file ------*/
  uploadDealcsv.prototype.getCsv = function(e) {
       
      let input = document.getElementById('dealCsv');
      input.addEventListener('change', function() {

        if (this.files && this.files[0]) {

            var myFile = this.files[0];
            var reader = new FileReader();
            
            reader.addEventListener('load', function (e) {
                
                let csvdata = e.target.result; 
                parseCsv.getParsecsvdata(csvdata); // calling function for parse csv data 
            });
            
            reader.readAsBinaryString(myFile);
        }
      });
    }

    /*------- Method for parse csv data and display --------------*/
    uploadDealcsv.prototype.getParsecsvdata = function(data) {

        let finaldata = [];
        let test=[]
        let map=new Map()
        let newLinebrk = data.split("\n");
        for(let i = 1; i < newLinebrk.length-1; i++) {
             let time=newLinebrk[i].slice(0,8)
             if(map.get(time)==undefined){
                map.set(time,1)
             }else{
                map.set(time,map.get(time)+1)
             }
            finaldata.push(newLinebrk[i].split(",").slice(0,3))
        }

        // console.log(map);
        

        // demo.innerText=parsedata

        let timer=0
        let i=0

        for(let [key,val] of map){
            let increment=parseFloat((1/parseInt(val)).toFixed(2))
            let counter=parseInt(val)
            let tempTimer=timer
            while(counter>0){
                // test.push(tempTimer.toFixed(2))
                finaldata[i].push(tempTimer.toFixed(2));
                tempTimer+=increment
                // tempTimer=tempTimer.toFixed(2)
                // console.log(tempTimer)
                counter--
                i++
            }

            timer++
        }
        // console.log("test-",test)


        const tableData = finaldata.map(function(value){
            console.log(value)
            return (
                `<tr>
                    <td>${value[0]}</td>
                    <td>${value[1]}</td>
                    <td>${value[2]}</td>
                    <td>${value[3]}</td>
                </tr>`
            );
        }).join("");

        table.innerHTML = tableData;

        // console.table(finaldata)
    }


  
  var parseCsv = new uploadDealcsv();
  parseCsv.getCsv();
