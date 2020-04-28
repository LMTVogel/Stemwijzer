var vraagCounter = 0;

subjects.forEach(subject => {
    subject.myAnswer = '';
});

parties.forEach(party => {
    party.points = 0;
});


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

function nextStatement() {
    if(vraagCounter == subjects.length-1) {

        calculatePoints();

    }else {
        vraagCounter++;
        console.log(subjects[vraagCounter]);
        displayVraag();
    }
}

function previousStatement() {
    if(vraagCounter == 0) {
        document.getElementById('homePage').style.display='block';
        document.getElementById('stellingPage').style.display='none';
    }else {
        vraagCounter--;
        displayVraag();
    }
}

function saveAnswer(answer) {
    subjects[vraagCounter].myAnswer=answer;
    nextStatement();
}

function calculatePoints() {
    subjects.forEach(subject => {
        subject.parties.forEach(function(party, partyIndex){
             if(subject.myAnswer == subject.parties[partyIndex].position){
                var scoreParty = parties.find(party => party.name == subject.parties[partyIndex].name);
                scoreParty.points += 1;
            }
        })
    })
}