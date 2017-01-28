class GameService {
    constructor() {
        this.wholeWord = null;
        this.isCountry = false;
        this.isAnimal = false;
        this.counterTime = null;
        this.category = null;
        this.word = null;
        this.selectedWord = null;
        this.hint = null;
        this.words = null;
        this.wordsCounries = null;
        this.wordsAnimals = null;
        this.guess = null;
        this.countGuess = null;
        this.geusses = [];
        this.myButtons = null;
        this.letters = null;
        this.list = null;
        this.lives = null;
        this.space = null;
        this.counter = null; // Count correct geussesd
        this.correct = null;
        this.alphabet = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
            'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
            't', 'u', 'v', 'w', 'x', 'y', 'z'
        ];
    }

    chat(word) {
        var gameChat = $.connection.gameHub;
        gameChat.client.addNewMessageToPage = function (name, word) {
            $('#discussion')
                .append('<li><strong>' + htmlEncode(name) + '</strong>: ' + htmlEncode(word) + '</li>');
        };
        $.connection.hub.start().done(function () {
            gameChat.server.send("", word);
        });

    }

    setTimeCounter(param) {
        this.counterTime = setInterval(timer, 1000); //1000 will  run it every 1 second
        var count = param;
        function timer() {
            if (++count > 200) {
                clearInterval(counterTime);
                return;
            }

            var seconds = count % 60;
            var minutes = Math.floor(count / 60);
            var hours = Math.floor(minutes / 60);
            minutes %= 60;
            hours %= 60;

            $("#counterTime").html(minutes + ":" + seconds);
        }
    }

    createGameResult(data) {
        $.ajax({
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            url: '/Game/CreateResult',
            success: function (result) {             
            },
            async: false
        });
    }
    showLive() {
        $("#mylives").html("You have " + this.lives + " lives");
        if (this.lives < 1) {
            $("#mylives").html("Game Over");

            $("#counterTime").text();
            var minAndSeconds = $("#counterTime").text().split(':');

            $('#counterTime').remove();

            var countryId = null;
            var animalId = null;
            if (this.isAnimal) {
                animalId = this.selectedWord.Id;
            }
            if (this.isCountry) {
                countryId = this.selectedWord.Id;
            }
            var data = {
                CountryId: countryId,
                AnimalId:animalId,
                IsAnswered: false,
                Guesses: this.countGuess,
                Duration: new Date(new Date().setHours(minAndSeconds[0] * 60, minAndSeconds[0], minAndSeconds[1], 0)),
                Answer: this.word
            }
            this.createGameResult(data);

            setTimeout(function () { window.location.reload(); }, 3000);

            this.word = "";

            return false;
        }
        for (var i = 0; i < this.geusses.length; i++) {
            if (this.counter + this.space === this.geusses.length) {
                $("#mylives").html("You Win!");

                var minAndSeconds = $("#counterTime").text().split(':');

                $('#counterTime').remove();

                var countryId = null;
                var animalId = null;
                if (this.isAnimal) {
                    animalId = this.selectedWord.Id;
                }
                if (this.isCountry) {
                    countryId = this.selectedWord.Id;
                }
                var data = {
                    CountryId: countryId,
                    AnimalId: animalId,
                    IsAnswered: true,
                    Guesses: this.countGuess,
                    Duration: new Date(new Date().setHours(minAndSeconds[0] * 60, minAndSeconds[0], minAndSeconds[1], 0)),
                    Answer: this.word
                }

                this.createGameResult(data);

                setTimeout(function () { window.location.reload(); }, 3000);

                return false;
            }
        }
    }
    showLiveMultiplayer() {
        $("#mylives").html("You have " + this.lives + " lives");
        if (this.lives < 1) {
            $("#mylives").html("Game Over");

            this.chat("Game Over. The word is: " + this.word);

            $("#counterTime").text();
            var minAndSeconds = $("#counterTime").text().split(':');

            $('#counterTime').hide();

            var countryId = null;
            var animalId = null;
            if (this.isAnimal) {
                animalId = this.selectedWord.Id;
            }
            if (this.isCountry) {
                countryId = this.selectedWord.Id;
            }
            var data = {
                CountryId: countryId,
                AnimalId: animalId,
                IsAnswered: false,
                Guesses: this.countGuess,
                Duration: new Date(new Date().setHours(minAndSeconds[0] * 60, minAndSeconds[0], minAndSeconds[1], 0)),
                Answer: this.word
            }
            this.createGameResult(data);

            this.word = "";

            return false;
        }
        for (var i = 0; i < this.geusses.length; i++) {
            if (this.counter + this.space === this.geusses.length) {
                $("#mylives").html("You Win!");

                this.chat("I Win. The word is: " + this.word);

                var minAndSeconds = $("#counterTime").text().split(':');

                $('#counterTime').hide();

                var countryId = null;
                var animalId = null;
                if (this.isAnimal) {
                    animalId = this.selectedWord.Id;
                }
                if (this.isCountry) {
                    countryId = this.selectedWord.Id;
                }
                var data = {
                    CountryId: countryId,
                    AnimalId: animalId,
                    IsAnswered: true,
                    Guesses: this.countGuess,
                    Duration: new Date(new Date().setHours(minAndSeconds[0] * 60, minAndSeconds[0], minAndSeconds[1], 0)),
                    Answer: this.word
                }

                this.createGameResult(data);
                return false;
            }
        }
    }
    buttons() {
        this.myButtons = document.getElementById('buttons');
        this.letters = document.createElement('ul');

        for (var i = 0; i < this.alphabet.length; i++) {
            this.letters.id = 'alphabet';
            this.list = document.createElement('li');
            this.list.id = 'letter';
            this.list.innerHTML = this.alphabet[i];
            this.check();
            this.myButtons.appendChild(this.letters);
            this.letters.appendChild(this.list);
        }
    }

    buttonsMultiplayer() {
        this.myButtons = document.getElementById('buttons');
        this.letters = document.createElement('ul');

        for (var i = 0; i < this.alphabet.length; i++) {
            this.letters.id = 'alphabet';
            this.list = document.createElement('li');
            this.list.id = 'letter';
            this.list.innerHTML = this.alphabet[i];
            this.checkMultiplayer();
            this.myButtons.appendChild(this.letters);
            this.letters.appendChild(this.list);
        }
    }

    check() {
        $(this.list).on("click", { that: this }, buttonClick);

        function buttonClick(parm) {
            if (!parm.data.that.word) {
                return;
            }

            parm.data.that.countGuess += 1;
            var geuss = (this.innerHTML);
            this.setAttribute("class", "active");
            $(this).unbind("click");
            for (var i = 0; i < parm.data.that.word.length; i++) {
                if (parm.data.that.word[i].toLowerCase() === geuss.toLowerCase()) {
                    parm.data.that.geusses[i].innerHTML = geuss.toLowerCase();
                    parm.data.that.counter += 1;                   
                }
            }
            var j = (parm.data.that.word.toLowerCase().indexOf(geuss));
            if (j === -1) {
                parm.data.that.lives -= 1;
                parm.data.that.showLive();
                parm.data.that.animation(parm.data.that.lives);
            } else {
                parm.data.that.showLive();
            }
        }
    }

    checkMultiplayer() {
        $(this.list).on("click", { that: this }, buttonClick);

        function buttonClick(parm) {
            if (!parm.data.that.word) {
                return;
            }

            parm.data.that.countGuess += 1;
            var geuss = (this.innerHTML);
            this.setAttribute("class", "active");
            $(this).unbind("click");

            parm.data.that.chat(geuss);

            for (var i = 0; i < parm.data.that.word.length; i++) {
                if (parm.data.that.word[i].toLowerCase() === geuss.toLowerCase()) {
                    parm.data.that.geusses[i].innerHTML = geuss.toLowerCase();
                    parm.data.that.counter += 1;
                }
            }
            var j = (parm.data.that.word.toLowerCase().indexOf(geuss));
            if (j === -1) {
                parm.data.that.lives -= 1;
                parm.data.that.showLiveMultiplayer();
                parm.data.that.animation(parm.data.that.lives);
            } else {
                parm.data.that.showLiveMultiplayer();
            }
        }
    }
    result() {
        var wordHolder = document.getElementById('hold');
        this.correct = document.createElement('ul');
        for (var i = 0; i < this.word.length; i++) {
            this.correct.setAttribute('id', 'my-word');
            this.guess = document.createElement('li');
            this.guess.setAttribute('class', 'guess');
            if (this.word[i] === "-") {
                this.guess.innerHTML = "-";
                this.space = 1;
            } else {
                this.guess.innerHTML = "_";
            }

            this.geusses.push(this.guess);
            wordHolder.appendChild(this.correct);
            this.correct.appendChild(this.guess);
        }
    }
    getAllCountries() {
        var countries;
        $.ajax({
            url: '/Game/GetAllCountries',
            type: 'GET',
            dataType: 'json', // added data type
            success: function(res) {
                countries = res;
            },
            async: false
        });
        this.wordsCounries = countries;
        return this.wordsCounries;
    }
    getAllAnimals() {
        var animals;
        $.ajax({
            url: '/Game/GetAllAnimals',
            type: 'GET',
            dataType: 'json', // added data type
            success: function(res) {
                animals = res;
            },
            async: false
        });
        this.wordsAnimals = animals;
        return this.wordsAnimals;
    }
    play() {
        this.isCountry = false;
        this.isAnimal = false;

        switch (this.category) {
        case "animals":
            this.selectedWord = this.wordsAnimals[Math.floor(Math.random() * this.wordsAnimals.length)];
            this.hint = this.selectedWord.Hint;
            this.word = this.selectedWord.Name.replace(/\s/g, "-");
            this.isAnimal = true;
            break;
        case "countries":
            this.selectedWord = this.wordsCounries[Math.floor(Math.random() * this.wordsCounries.length)];
            this.hint = this.selectedWord.Hint;
            this.word = this.selectedWord.Name.replace(/\s/g, "-");
            this.isCountry = true;
            break;
        default:
            this.selectedWord = this.wordsCounries[Math.floor(Math.random() * this.wordsCounries.length)];
            this.hint = this.selectedWord.Hint;
            this.word = this.selectedWord.Name.replace(/\s/g, "-");
            this.isCountry = true;
            break;
        }

        console.log(this.word);

        this.countGuess = 0;
        clearInterval(this.counterTime);
        this.setTimeCounter(0);

        if ($("#buttons #alphabet").length > 0) {
            if (this.letters.parentNode) {
                this.letters.parentNode.removeChild(this.letters);
            }
            this.buttons();
        }

        this.animation();
        $("#my-word").remove();
        $("#guess").remove();
        this.geusses = [];
        $("#help").hide();
        this.lives = 6;
        this.counter = 0;
        this.space = 0;
        this.result();
        this.showLive();
    }

    playMultiplayer() {

        this.isCountry = false;
        this.isAnimal = false;

        switch (this.category) {
        case "animals":
            this.selectedWord = this.wordsAnimals[Math.floor(Math.random() * this.wordsAnimals.length)];
            this.hint = this.selectedWord.Hint;
            this.word = this.selectedWord.Name.replace(/\s/g, "-");
            this.isAnimal = true;
            break;
        case "countries":
            this.selectedWord = this.wordsCounries[Math.floor(Math.random() * this.wordsCounries.length)];
            this.hint = this.selectedWord.Hint;
            this.word = this.selectedWord.Name.replace(/\s/g, "-");
            this.isCountry = true;
            break;
        default:
            this.selectedWord = this.wordsCounries[Math.floor(Math.random() * this.wordsCounries.length)];
            this.hint = this.selectedWord.Hint;
            this.word = this.selectedWord.Name.replace(/\s/g, "-");
            this.isCountry = true;
            break;
        }

        console.log(this.word);

        this.chat("Play");

        this.countGuess = 0;
        clearInterval(this.counterTime);
        this.setTimeCounter(0);
        $('#counterTime').show();

        if ($("#buttons #alphabet").length > 0) {
            if (this.letters.parentNode) {
                this.letters.parentNode.removeChild(this.letters);
            }
            this.buttonsMultiplayer();
        }

        this.animation();
        $("#my-word").remove();
        $("#guess").remove();
        this.geusses = [];
        $("#help").hide();
        this.lives = 6;
        this.counter = 0;
        this.space = 0;
        this.result();
        this.showLiveMultiplayer();
    }

    animation(imgId) {
        switch (imgId) {
        case 5:
            var src = "/Content/Images/main2.png";
            $("#imageBox").attr("src", src);
            break;
        case 4:
            var src = "/Content/Images/main3.png";
            $("#imageBox").attr("src", src);
            break;

        case 3:
            var src = "/Content/Images/main4.png";
            $("#imageBox").attr("src", src);
            break;

        case 2:
            var src = "/Content/Images/main5.png";
            $("#imageBox").attr("src", src);
            break;

        case 1:
            var src = "/Content/Images/main6.png";
            $("#imageBox").attr("src", src);
            break;

        case 0:
            var src = "/Content/Images/main7.png";
            $("#imageBox").attr("src", src);
            break;
        default:
            var src = "/Content/Images/main1.png";
            $("#imageBox").attr("src", src);
        }
    }

    checkWithWholeWord(wholeWord) {
        if (!this.word) {
            return;
        }
        if (wholeWord.toLowerCase() != this.word.toLowerCase()) {
            $("#mylives").html("Game Over");

            $("#counterTime").text();
            var minAndSeconds = $("#counterTime").text().split(':');

            $('#counterTime').remove();

            var countryId = null;
            var animalId = null;
            if (this.isAnimal) {
                animalId = this.selectedWord.Id;
            }
            if (this.isCountry) {
                countryId = this.selectedWord.Id;
            }
            var data = {
                CountryId: countryId,
                AnimalId: animalId,
                IsAnswered: false,
                Guesses: this.countGuess,
                Duration: new Date(new Date().setHours(minAndSeconds[0] * 60, minAndSeconds[0], minAndSeconds[1], 0)),
                Answer: this.word
            }
            this.createGameResult(data);

            setTimeout(function () { window.location.reload(); }, 3000);

            this.word = "";

            return false;
        } else {
            $("#mylives").html("You Win!");

            var minAndSeconds = $("#counterTime").text().split(':');

            $('#counterTime').remove();

            var countryId = null;
            var animalId = null;
            if (this.isAnimal) {
                animalId = this.selectedWord.Id;
            }
            if (this.isCountry) {
                countryId = this.selectedWord.Id;
            }
            var data = {
                CountryId: countryId,
                AnimalId: animalId,
                IsAnswered: true,
                Guesses: this.countGuess,
                Duration: new Date(new Date().setHours(minAndSeconds[0] * 60, minAndSeconds[0], minAndSeconds[1], 0)),
                Answer: this.word
            }

            this.createGameResult(data);

            setTimeout(function () { window.location.reload(); }, 3000);

            return false;
        }
    }
}


Game.Env.set('Game', new GameService());


function clickAnimals(id) {
    $("#catagoryName").html("The Chosen Category is " + id);
    Game.Env.get('Game').category = id;
}

function clickCountries(id) {
    $("#catagoryName").html("The Chosen Category is " + id);
    Game.Env.get('Game').category = id;
}

function clickHelp(id) {
    $("#help").html(Game.Env.get('Game').hint);
    $("#help").show();
}

function clickPlay(id) {
    Game.Env.get('Game').play();
}

function clickPlayMultiplayer(id) {
    Game.Env.get('Game').playMultiplayer();
}

function clickWholeWord(id) {
    var wholeword = prompt();

    if (wholeword) {
        Game.Env.get('Game').checkWithWholeWord(wholeword);
    }
}