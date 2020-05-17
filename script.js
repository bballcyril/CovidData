

$(document).ready(function(){
    let countries;
    let inputCountry;

    const getCountries = async () =>{
        const res = await fetch('https://api.covid19api.com/countries');
        countries = await res.json();
       
    };
   
    $(".userInput").on('keyup',function(e){
        let input = e.target.value;
        let html ='';
        countries.forEach(element => {
            $(".countryList").append(`<a href="#"><li class="list-group-item">${element.Country}</li></a>`);
        })
        $("li").hover(function(){
            $(this).addClass("active");
        }, function(){
            $(this).removeClass("active");
        });
        $("li").click(function(){
            inputCountry = this.innerHTML;
            console.log(inputCountry);
            $("ul").html("");
            $(".userInput").val(inputCountry);
        });
        if (input.length==0){
            $("ul").html("");
        }
    });
    window.addEventListener('DOMContentLoaded',getCountries());
});
