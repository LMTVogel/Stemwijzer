var vraagCounter = 0;

function startKnop() {
    document.getElementById('homePage').style.display='none';
    document.getElementById('stellingPage').style.display='block';

    displayVraag();
}

function displayVraag() {
    var vraagNummer = vraagCounter;

    document.getElementById('stellingTitle').innerHTML=(vraagNummer+1).toString() + '. ' + subjects[vraagCounter].title;
    document.getElementById('stellingDes').innerHTML=subjects[vraagCounter].statement;
}