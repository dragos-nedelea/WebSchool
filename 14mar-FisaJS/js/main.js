// function Media() {
//     let nr1 = Number(document.getElementById("nr1").value);
//     let nr2 = Number(document.getElementById("nr2").value);
//     let nr3 = Number(document.getElementById("nr3").value);

//     let media = (nr1 + nr2 + nr3) / 3;
//     document.getElementById("valoare").innerHTML = media.toFixed(2);
//     }

function virstaZile() {
    let ani = document.getElementById("ani").value;
    let zile = ani * 365;

    document.getElementById("valoare").innerHTML = zile + " zile";
}