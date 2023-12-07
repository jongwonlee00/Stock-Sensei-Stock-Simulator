const questions = [
    {
        question: "A business organized as a separate legal entity is a",
        optionA: "corporation",
        optionB: "proprietor",
        optionC: "government unit",
        optionD: "partnership",
        correctOption: "optionA"
    },

    {
        question: "Which of the following is not one of the three forms of business organization?",
        optionA: "Corporations",
        optionB: "Partnerships",
        optionC: "Proprietorships",
        optionD: "Investors",
        correctOption: "optionD"
    },

    {
        question: "Which of the following would not be considered an internal user of accounting data for the Xanadu Company",
        optionA: "President of the company",
        optionB: "Production manager",
        optionC: "Merchandise inventory clerk",
        optionD: "President of the employee's labor union",
        correctOption: "optionD"
    },

    {
        question: "The liability created by a business when it purchases coffee beans and coffee cups on credit from suppliers is termed a(n)",
        optionA: "account payable.",
        optionB: "account receivable.",
        optionC: "revenue",
        optionD: "expense",
        correctOption: "optionA"
    },

    {
        question: "The right to receive money in the future is called a(n)",
        optionA: "account payable",
        optionB: "account receivable",
        optionC: "liability",
        optionD: "revenue",
        correctOption: "optionB"
    },

    {
        question: "The cost of assets consumed or services used is also known as",
        optionA: "a revenue",
        optionB: "an expense",
        optionC: "a liability",
        optionD: "an asset",
        correctOption: "optionB"
    },

    {
        question: "The best definition of assets is the",
        optionA: "cash owned by the company",
        optionB: "collections of resources belonging to the company and the claims on these resources.",
        optionC: "owners’ investment in the business",
        optionD: "resources belonging to a company that have future benefit to the company",
        correctOption: "optionD"
    },

    {
        question: "Dividends are reported on the",
        optionA: "income statement.",
        optionB: "retained earnings statement",
        optionC: "balance sheet",
        optionD: "income statement and balance sheet.",
        correctOption: "optionB"
    },

    {
        question: "Which of the following is an asset?",
        optionA: "Accounts Receivable",
        optionB: "Accounts Payable",
        optionC: "Common Stock",
        optionD: "Dividends",
        correctOption: "optionA"
    },

    {
        question: "To show how successfully your business performed during a period of time, you would report its",
        optionA: "Balance sheet",
        optionB: "Income statement",
        optionC: "statement of cash flows",
        optionD: "retained earnings statements",
        correctOption: "optionB"
    },

    {
        question: "Which of the following financial statements is concerned with the company at a point in time?",
        optionA: "Balance sheet",
        optionB: "Income statement",
        optionC: "Retained earnings statement",
        optionD: "Statement of cash flows",
        correctOption: "optionA"
    },

    {
        question: "An income statement",
        optionA: "summarizes the changes in retained earnings for a specific period of time.",
        optionB: "reports the changes in assets, liabilities, and stockholders’ equity over a period of time.",
        optionC: "reports the assets, liabilities, and stockholders’ equity at a specific date",
        optionD: "presents the revenues and expenses for a specific period of time.",
        correctOption: "optionD"
    },


    {
        question: "Ashley’s Accessory Shop started the year with total assets of $210,000 and total liabilities of $120,000. During the year the business recorded $330,000 in revenues, $165,000 in expenses, and dividends of $60,000. The net income reported by Ashley’s Accessory Shop for the year was",
        optionA: "$120,000",
        optionB: "$150,000",
        optionC: "$195,000",
        optionD: "$165,000",
        correctOption: "optionD"
    },

]


let shuffledQuestions = [] //empty array to hold shuffled selected questions out of all available questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
//app would be dealing with 10questions per session
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 //holds the current question number
let playerScore = 0  //holds the player score
let wrongAttempt = 0 //amount of wrong answers picked by player
let indexNumber = 0 //will be used in displaying next question

// function for displaying next question in the array to dom
//also handles displaying players and quiz information to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })

    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ //adding to player's score
            indexNumber++ //adding 1 to index so has to display next question..
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ //adds 1 to wrong attempts 
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer() //check if player picked right or wrong option
    unCheckRadioButtons()
    //delays next question displaying for a second just for some effects so questions don't rush in on player
    setTimeout(() => {
        if (indexNumber <= 9) {
//displays next question as long as index number isn't greater than 9, remember index number starts from 0, so index 9 is question 10
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()//ends game if index number greater than 9 meaning we're already at the 10th question
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal, resets game and reshuffles questions
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}