let app = function () {
    var rightAnswer = {'choice': null, 'answer': null};
    var Statistics = {
        'Correct Answers': 0,
        'Incorrect Answers': 0,
        'Unanswered': 0
    };
    var delayTimeoutOrWrong = 30;
    var delayBetweenQuestions = 3;

    var mainTimer;
    var timeLeft;
    var stopTime = {value: 0};
    var data = [
        {
            'question': 'In the 80s if you turned on your television and saw the characters Tootie, Blair and Natalie, what show would you be watching?',
            'options': {
                'a': 'Saved by the Bell',
                'b': 'Lavern and Shirley',
                'c': 'The Facts of Life',
                'd': 'Family Matters'
            },
            'answer': 'The Facts of Life',
            'full_answer': 'The Facts of Life - This sitcom took place at an exclusive girl\'s school.',
            'ra': 'a'
        },
        {
            'question': 'What 80s fashion trend was inspired by the movie Flashdance?',
            'options': {
                'a': 'Bell Bottoms',
                'b': 'Crocs',
                'c': 'Legwarmers',
                'd': 'Ear Muffs'
            },
            'answer': 'Legwarmers',
            'full_answer': 'Legwarmers - Leg warmers were also called ankle warmers.',
            'ra': 'c'
        },
        {
            'question': 'What men\'s hairstyle was trendy in the 80s?',
            'options': {
                'a': 'The Mulvar',
                'b': 'The Crop',
                'c': 'Mop Top',
                'd': 'The flip'
            },
            'answer': 'The Mulvar',
            'full_answer': 'The Mulvar - The other styles were all popular in the 60s.',
            'ra': 'a'
        },
        {
            'question': 'Care Bears were all the rage during the 80s. Which Care Bear was green?',
            'options': {
                'a': 'Best Friend Bear',
                'b': 'Good Luck Bear',
                'c': 'Funshine Bear',
                'd': 'Birthday Bear'
            },
            'answer': 'Good Luck Bear',
            'full_answer': 'Good Luck Bear - Good Luck Bear had a clover on his tummy.',
            'ra': 'b'
        },
        {
            'question': 'In the 80s, Nintendo released their NES or Nintendo Entertainment System. What game came with the system?',
            'options': {
                'a': 'Breakout',
                'b': 'Super Mario Bros.',
                'c': 'Frogger',
                'd': 'Tetris'
            },
            'answer': 'Super Mario Bros',
            'full_answer': 'Super Mario Bros. - The system was released in 1985.',
            'ra': 'b'
        },
        {
            'question': 'What was the highest grossing movie of the 1980s?',
            'options': {
                'a': 'Kramer Vs. Kramer',
                'b': 'E.T.',
                'c': 'Jaws',
                'd': 'Rocky'
            },
            'answer': 'E.T.',
            'full_answer': 'E.T. - E.T. was the story of an alien who crash lands on earth.',
            'ra': 'b'
        },
        {
            'question': 'Which of these characters was not one of the Cosby children?',
            'options': {
                'a': 'Marsha',
                'b': 'Denise',
                'c': 'Vanessa',
                'd': 'Theo'
            },
            'answer': 'Marsha',
            'full_answer': 'Marsha - Marsha was on The Brady Bunch.',
            'ra': 'a'
        },
        {
            'question': 'During the 1980s if you wanted to be fashionable, which of these things would you own?',
            'options': {
                'a': 'Moccasins',
                'b': 'Jelly shoes',
                'c': 'Saddle shoes',
                'd': 'T-Bars'
            },
            'answer': 'Jelly shoes',
            'full_answer': 'Jelly shoes - You would have also owned a headband.',
            'ra': 'b'
        },
        {
            'question': 'Which of these video games was not introduced in the 1980s?',
            'options': {
                'a': 'Frogger',
                'b': 'Digger',
                'c': 'Snake',
                'd': 'Pac-Man'
            },
            'answer': 'Snake',
            'full_answer': 'Snake - Snake was released in the 70s.',
            'ra': 'c'
        },
        {
            'question': 'Which of these films did not win an Oscar in the 80s?',
            'options': {
                'a': 'Rain Man',
                'b': 'Star Wars',
                'c': 'Chariots of Fire',
                'd': 'The Last Emperor'
            },
            'answer': 'Star Wars',
            'full_answer': 'Star Wars - Star Wars was released in the 70s.',
            'ra': 'b'
        },
        {
            'question': 'In the 80s, Bruce Willis played which of these characters?',
            'options': {
                'a': 'John Hancock',
                'b': 'John McClane',
                'c': 'Martin Riggs',
                'd': 'Robert Neville'
            },
            'answer': 'John McClane',
            'full_answer': 'John McClane - Bruce played his role in the Die Hard movies.',
            'ra': 'b'
        },
        {
            'question': 'Who played the iconic character J.R. on the TV show Dallas?',
            'options': {
                'a': 'Patrick Duffy',
                'b': 'Howard Keel',
                'c': 'Larry Hagman',
                'd': 'Jim Davis'
            },
            'answer': 'Larry Hagman',
            'full_answer': 'Larry Hagman - Larry also played the role of Major Nelson on the show I Dream of Jeannie.',
            'ra': 'c'
        },
        {
            'question': 'Which one of these toys made its debut in the 80s?',
            'options': {
                'a': 'G.I. Joe',
                'b': 'Troll Doll',
                'c': 'Strawberry Shortcake',
                'd': 'Suzy Homemaker'
            },
            'answer': 'Strawberry Shortcake',
            'full_answer': 'Strawberry Shortcake - Strawberry Shortcake was introduced by the company American Greeting.',
            'ra': 'c'
        },
        {
            'question': 'Which of these toys, sold by Mattel, became a trend during the 80s?',
            'options': {
                'a': 'Rainbow Brite',
                'b': 'Care Bears',
                'c': 'Strawberry Shortcake',
                'd': 'Pound Puppies'
            },
            'answer': 'Rainbow Brite',
            'full_answer': 'Rainbow Brite - These plush stuffed toys were sold in 35 different nations.',
            'ra': 'a'
        },
        {
            'question': 'During the 80s, everyone wanted a pair of Ray-Ban sunglasses. What film helped to start this trend?',
            'options': {
                'a': 'Top Gun',
                'b': 'Lethal Weapon',
                'c': 'The Godfather',
                'd': 'Dirty Harry'
            },
            'answer': 'Top Gun',
            'full_answer': 'Top Gun - Top Gun starred Tom Cruise.',
            'ra': 'a'
        }
    ];
    var questions;

    function countDownTimer(time, refreshTime, func, args) {
        timeLeft = time;
        var elem = document.getElementById('game_timer');

        countdown();
        mainTimer = setInterval(countdown, 1000);

        function countdown() {
            if (timeLeft === 0) {
                if(mainTimer) {
                    clearTimeout(mainTimer);
                }
                func.apply(this, args);
            } else {
                if(refreshTime){
                    elem.innerHTML = '<div class="t-remaining">Time Remaining: ' + timeLeft + ' Seconds<div>';
                }
                timeLeft--;
            }
        }
    }

    function generateQuestion() {
        var q = questions.pop();
        if(q) {
            var src = '<div id="game_timer"></div>';
            
            src += '<div id="game_question">' + q.question + '</div>';

            src += '<div class="btn-group">';
            for(var i in q.options) {
                src += '<button class="answ-btn" option="' + i +'">' + q.options[i] +'</button>';
            }
            src += '</div>';
            rightAnswer = {'choice': q.ra, 'answer': q.answer};
            return src;
        }
        return;
    }

    function runGame(refresh=false) {
        if(refresh) {
            refreshData();
        }
        var question = generateQuestion();
        if (question) {
            $('#game_field').html(question);
            countDownTimer(delayTimeoutOrWrong, true, showAnswerDisplay, ['timeout']);
        } else {
            showAnswerDisplay('finish')

        }
    }

    function showAnswerDisplay(ansOpt) {
        function doAction(action) {
            var src = `<div id="game_timer"><div class="t-remaining">Time Remaining: ${stopTime.value} Seconds<div></div>`;
            src += `<div id="game_question"><h4>${action}</h4><br>
                    <span class="correct-answer">
                    The Correct Answer was: ${rightAnswer.answer}</span>
                    
                    </div>`;

            $('#game_field').html(src);
        }
        clearTimeout(mainTimer);
        if(ansOpt === rightAnswer.choice) {
            doAction('Correct!', stopTime);
            Statistics["Correct Answers"] += 1;
            countDownTimer(delayBetweenQuestions, false, runGame);

        } else if (ansOpt === "finish") {
            doAction('All Done, heres how you did!', stopTime);
            var gf = '#game_field';
            var src = $(gf).html();

            src += "<div class='stats'>";
            for(var i in Statistics) {
                src += '<p>' + i + ': ' + Statistics[i] + '</p>';
            }
            src += '</div>';
            src += '<button class="new-game-btn">Start Over?</button>';
            $(gf).html(src)

        }
        else if (ansOpt === 'timeout') {
            stopTime = {value: 0}
            doAction('Out of Time!', stopTime);
            Statistics["Unanswered"] += 1;
            countDownTimer(delayBetweenQuestions, false, runGame);
        }
        else {
            doAction('Nope!', stopTime);
            clearTimeout(mainTimer);
            Statistics["Incorrect Answers"] += 1;
            countDownTimer(delayBetweenQuestions, false, runGame);
        }
    }

    function refreshData() {
        questions = [];
        for(var i in data) {
            questions.push(jQuery.extend(true, {}, data[i]))
        }
        Statistics = {
            'Correct Answers': 0,
            'Incorrect Answers': 0,
            'Unanswered': 0
        };
    }

    function init() {

        $("#square").on('click', '.start-btn, .new-game-btn', function () {
            runGame(true);
        });

        $("#game_field").on('click', '.answ-btn', function () {
            stopTime.value = (function (i) {
                return i;
            })(timeLeft);
            showAnswerDisplay($(this).attr('option'));
        });
    }

    return {
        init: init
    };
}();
