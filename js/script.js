

$(document).ready(function(){
    let countries;
    let inputCountry;

    //Get list of countries from API
    const getCountries = async () =>{
        const res = await fetch('https://api.covid19api.com/countries');
        countries = await res.json();
       
    };
   
    //On keypress
    $(".userInput").on('keyup',function(e){
        let input = e.target.value;
        let html ='';

        //Match input to list of countries
        let matches = countries.filter(country =>{
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
            inputCountry = this.innerHTML;
            console.log(inputCountry);
            $("ul").html("");
            $(".userInput").val(inputCountry);
        });

        if (input.length==0){
            $("ul").html("");
            matches=[];
        }
        console.log(matches);

    });
    window.addEventListener('DOMContentLoaded',getCountries());
});
