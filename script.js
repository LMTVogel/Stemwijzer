var vraagCounter = 0;

subjects.forEach(subject => {
    subject.myAnswer = '';
    subject.important = false;
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

function previousStatement() {
    if(vraagCounter == 0) {
        document.getElementById('homePage').style.display='block';
        document.getElementById('stellingPage').style.display='none';
    }else {
        vraagCounter--;
        document.getElementById('important').checked=false;
        displayVraag();
        rememberAnswer(subjects[vraagCounter].myAnswer);
    }
}

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

function saveAnswer(answer) {
    subjects[vraagCounter].myAnswer=answer;
    subjects[vraagCounter].important=document.getElementById('important').checked;
    nextStatement();
}

function calculatePoints() {
    subjects.forEach(subject => {
        subject.parties.forEach(function(subjectParty, partyIndex){
            if(subject.myAnswer == subject.parties[partyIndex].position) {
                var scoreParty = parties.find(party => party.name == subject.parties[partyIndex].name);
                
                if(subject.important == true) {
                    scoreParty.points+=2;
                }else {
                    subject.important++;
                }
            }
        });
    });
}

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