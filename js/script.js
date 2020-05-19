

$(document).ready(function(){
    let inputCountry;
    let data;

   const getData = async () =>{
       const res = await fetch('https://api.covid19api.com/summary');
       data = await res.json();
       console.log(data);
       $("#confirmed").append(`<br>${formatNumber(data.Global.TotalConfirmed)}`);
       $("#recoveries").append(`<span class = "text-success"> <br>${formatNumber(data.Global.TotalRecovered)}</span><span> (+${formatNumber(data.Global.NewRecovered)})</span>`);
       $("#deaths").append(`<span class="text-danger"><br>${formatNumber(data.Global.TotalDeaths)}</span> <span> (+${formatNumber(data.Global.NewDeaths)})</span>`);
   };
     
    //On keypress
    $(".userInput").on('keyup',function(e){
        let input = e.target.value;
        let html ='';

        //Filters list of countries based on user input
        let matches = data.Countries.filter(country =>{
            const regex = new RegExp(`^${input}`,'gi');
            return country.Country.match(regex);
        });

        matches.forEach(element => {
            html+= `<a href="#"><li class="list-group-item">${element.Country}</li></a>`;
        });
        $(".countryList").html(html);
        $("li").hover(function(){
            $(this).addClass("active");
        }, function(){  
            $(this).removeClass("active");
        });

        //When user clicks an option
        $("li").click(function(){
            let dataHTML ='';
            let totalHTML = '<div><h2>Total</h2></div> ';
            let todayHTML ='<div><h2>Today</h2></div>';
            inputCountry = this.innerHTML;
            $("ul").html("");
            $(".userInput").val(inputCountry);
            data.Countries.forEach(element =>{
                if(element.Country==inputCountry){
                    dataHTML+= `<h3>COVID-19 Data for ${element.Country} as of ${element.Date.substring(0,element.Date.indexOf("T"))}</h3>`;
                    totalHTML+=`<div>  <h2>Confirmed Cases: </h2> <h4>${formatNumber(element.TotalConfirmed)}</h4> </div> <div><h2>Recoveries: </h2><h4 class="text-success">${formatNumber(element.TotalRecovered)} </h4></div> <div> <h2>Deaths: </h2> <h4 class="text-danger"> ${formatNumber(element.TotalDeaths)}</h4></div>`;
                    todayHTML+=`<div> <h2>Confirmed Cases:</h2> <h4>${formatNumber(element.NewConfirmed)}</h4></div> <div> <h2>Recoveries:</h2> <h4 class="text-success">${formatNumber(element.NewRecovered)}</h4> </div> <div> <h2>Deaths:</h2> <h4 class="text-danger">${formatNumber(element.NewDeaths)}</h4></div>`;
                }
            });
            $("#dataContainer").html(dataHTML);
            $("#total").html(totalHTML);
            $("#today").html(todayHTML);
        });

        if (input.length===0){
            $("ul").html("");
            matches=[];
        }
        console.log(matches);

    });
    const formatNumber = num =>{
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    window.addEventListener('DOMContentLoaded',getData());
});
