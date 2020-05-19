var vraagCounter = 0;

var endParties = [];
var partySize = 10;

subjects.forEach(subject => {
    subject.myAnswer = '';
    subject.important = false;
});

parties.forEach(party => {
    party.points = 0;
});

// Als je op de knop klikt word de HTML met ID homePage op none gezet en de stellingPage op block om zo de vragen te laten zien
function startKnop() {
    document.getElementById('homePage').style.display='none';
    document.getElementById('stellingPage').style.display='block';

    displayVraag();
}
// Laat de vraag zien met behulp van de vraagCounter om zo te weten welke vraag ie moet laten zien.
function displayVraag() {
    var vraagNummer = vraagCounter;

    document.getElementById('stellingTitle').innerHTML=(vraagNummer+1).toString() + '. ' + subjects[vraagCounter].title;
    document.getElementById('stellingDes').innerHTML=subjects[vraagCounter].statement;
}
// Slaat de gemaakte keuze van de vraag op.
function saveAnswer(answer) {
    subjects[vraagCounter].myAnswer=answer;
    subjects[vraagCounter].important=document.getElementById('important').checked;
    nextStatement();
}
// Gaat naar de volgende vraag tenzij het de laatste vraag is. Dan wordt calculatePoints() uitgevoerd om de resultaten te laten zien.
function nextStatement() {
    if(vraagCounter == subjects.length-1) {
        
        calculatePoints();

    }else {
        vraagCounter++;
        document.getElementById('important').checked=false;
        displayVraag();
        rememberAnswer(subjects[vraagCounter].myAnswer);
    }
}
// Gaat terug naar de volgende vraag tenzij er vanaf de 1e vraag terug wordt geklikt. Dan wordt de homePage gedisplayd.
function previousStatement() {
    if(vraagCounter == 0) {
        document.getElementById('homePage').style.display='block';
        document.getElementById('stellingPage').style.display='none';
    }else {
        vraagCounter--;
        displayVraag();
        rememberAnswer(subjects[vraagCounter].myAnswer);
    }
}
// Onthoud welke vraag je hebt gekozen om zo de kleur te veranderen zodat je weet dat je die gekozen hebt. Ook kijkt de function of de checkbox gecheckt was om hem weer in gevuld te houden.
function rememberAnswer(answer) {
    var question = document.getElementsByClassName('questions');
    document.getElementById('important').checked = false;
    
    for(i = 0; i < question.length; i++) {
        question[i].style.background='none';
    }

    if(subjects[vraagCounter].important == true) {
        document.getElementById('important').checked = true;
    }

    if(answer == '') {
        return;
    }else {
        document.getElementById(answer).style.backgroundColor='blue';
    }
}
// Berekent de punten van de gekozen antwoorden om zo te kijken wat de partij uitkomst is.
function calculatePoints() {
    subjects.forEach((subject) => {
        subject.parties.forEach(function (subjectParty, partyIndex) {
            if (subject.myAnswer == subject.parties[partyIndex].position) {
                // Loopt door de parties heen en kijkt of de naam van de partij met de naam van het antwoord overeenkomt met de gebruikers gekozen antwoord. Dit moet worden gedaan omdat anders er een punt aan de eerste de beste partij word toegevoegd.
                for (let index = 0; index < parties.length; index++) {
                    // Kijkt of de naam van de gemaakte keuze overeenkomt met de keuzes van de partijen.
                    if (subject.parties[partyIndex].name == parties[index].name) {
                        // Voegt 2 punten toe aan de overeenkomende partijen als de checkbox is aangevinkt.
                        if (subject.important == true) {
                            parties[index].points += 2;
                        // Voegt 1 punt toe aan de overeenkomende partijen als de chekcbox niet is aangevinkt.
                        } else {
                            parties[index].points += 1;
                        }
                    }
                }
            }
        });
    });
    displayPartyPage();
}
// Laat de partij pagina zien om zo te kunnen kiezen welke partijen je wilt zien door middel van een filter.
function displayPartyPage() {
    document.getElementById('stellingPage').style.display='none';
    document.getElementById('partyPage').style.display='block';

    parties.sort(function(a, b) {
        return b.points - a.points;
    });

    parties.forEach(party => {
        var paragraph = document.createElement('p');

        paragraph.innerHTML = party.name;

        document.getElementById('partyOrder').appendChild(paragraph);
    });
}
// Filtert op secular parties.
function getSecularParties() {
    endParties = [];

    endParties = parties.filter(party => {
        return party.secular == true;
    });
    btnFeedback('secular');
}
// Pakt alle parties om ze te laten zien.
function getAllParties() {
    endParties = [];

    endParties = parties;
    btnFeedback('all');
}
// Pakt alleen de grote parties die 10 leden of meer hebben. Dit is gedefineerd in de variabele partySize.
function getBigParties() {
    endParties = [];

    endParties = parties.filter(party => {
        return party.size >= partySize;
    });
    btnFeedback('big');
}
// Veranderd de kleur van de filterknop als je er op klikt.
function btnFeedback(id) {
    var filterBtnColor = document.getElementsByClassName('filterParty');

    for(i = 0; i < filterBtnColor.length; i++) {
        filterBtnColor[i].style.background='none';
    }

    document.getElementById(id).style.background='green';
}
// Laat de partijen zien door middel van de gemaakte keuze. Er moet een keuze gemaakt worden anders volgt er een alert.
function finalResultPage() {
    if(endParties.length == 0) {
        return alert('Kies uit de drie knoppen');
    }

    document.getElementById('partyPage').style.display='none';
    document.getElementById('resultContainer').style.display='block';

    document.getElementById('1stPlace').innerHTML+=endParties[0].long;
    document.getElementById('2ndPlace').innerHTML+=endParties[1].long;
    document.getElementById('3rdPlace').innerHTML+=endParties[2].long;
}