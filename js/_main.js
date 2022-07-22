$(function () {
    document.execCommand('insertHTML',false,'<br>');
    // Variables
    var result = "";
    var day, month, year;
    var da = new Date();
    var fulldate;
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    day = da.getDate();
    month = da.getMonth();
    year = da.getFullYear();

    fulldate = day + "/" + month + "/" + year;
    $("#_date").text(fulldate + " (" + days[da.getDay()] + ")");

    const regex = /^(&gt;)(.*$)/gm;
    const subst = '<span class="text-success">$1</span>';
    var random_id, date;
    random_id = Math.floor(10000000 + Math.random() * 9000000);
    // Selectors
    $("#_id").text("No."+random_id);

    $("#_gtcontent").focusout(function(){
        const nodo = $(this)[0].innerHTML;
        var a = nodo.split("<br>");
        var _result = [];
        var str_result; 
        a.forEach(func);
        function func(item, index){
            var aux = item.replace(regex, '<span class="gt">>$2</span>');
            _result.push(aux + "<br>");
        }
        str_result = _result.join('');

        console.log($(str_result));
        var parsed = $($.parseHTML(str_result));
        $(this).html(parsed);
    });
    
    document.getElementById("btn_convert").addEventListener("click", function() {
        html2canvas(document.getElementById("result")).then(function (canvas) {			
                var anchorTag = document.createElement("a");
                document.body.appendChild(anchorTag);
                $("#preview").attr('hidden', true);
                document.getElementById("preview").appendChild(canvas);
                anchorTag.download = $("#_title").text().split(' ').join('_') + "_greentexter.jpg";
                anchorTag.href = canvas.toDataURL();
                anchorTag.target = '_blank';
                anchorTag.click();
            });
     });
});
