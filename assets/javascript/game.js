var word = {
	word: "",
	words: ["Linux", "UNIX", "Macintosh", "Apple", "Windows", "Microsoft", "Terminal", "Bash"],
	word_count: -1,
	guessed_letters: [],
	guessed: true,
	guesses_left: 8,
	instructions: document.getElementById("instructions"),
	output: document.getElementById("output"),

	start() {
		for (var i = this.words.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var x = this.words[i];
			this.words[i] = this.words[j];
			this.words[j] = x;
		}
	},

	next_word() {
		this.word_count++;
		if (this.guesses_left <= 0) {
			this.instructions.textContent = "You ran out of wrong guesses. Please refresh the page to try again."
			this.output = "";
			return;
		}

		if (this.word_count >= this.words.length) {
			this.instructions.textContent = "Congratulations! Refresh the page to play again. END OF LINE";
			this.output.textContent = "";
			return;
		} else {
			this.guesses_left = 8;
			this.word = this.words[this.word_count];
			this.guessed_letters = [];
			this.guessed = false;
			this.write();
		}
	},

	check_guessed: function(word_output) {
		this.guessed = true;
		for (var i = 0; i < word_output.length; i++) {
			if (word_output[i] === "_") {
				this.guessed = false;
			}
		}

		if (this.guessed) {
			this.instructions.textContent = "Congratulations! Press any key to continue.";
		}

		if (this.guesses_left === 0) {
			this.next_word();
		}
	},

	check_new_guess: function(letter) {
		for (var i = 0; i < this.word.length; i++) {
			if (this.word[i].toLowerCase() === letter) {
				return;
			}
		}

		this.guesses_left--;
	},

	write: function() {
		var word_output = "";
		for (var i = 0; i < this.word.length; i++) {
			var letter = this.word[i].toLowerCase();
			var write_letter = false;
			for (var j = 0; j <= this.guessed_letters.length; j++) {
				if (this.guessed_letters[j] === letter) {
					write_letter = true;
					break;
				}
			}

			if (write_letter) {
				word_output += this.word[i] + " ";
			} else {
				word_output += "_ ";
			}
		}
		this.output.textContent = word_output;
		this.instructions.textContent = "Wrong guesses left: " + this.guesses_left;
		this.check_guessed(word_output);
	},

	add_guess: function(new_guess) {
		if (this.guessed || this.guesses_left === 0) {
			this.next_word();
			return;
		}

		new_guess = new_guess.toLowerCase();
		var previous_guess = false;
		for (var i = 0; i < this.guessed_letters.length; i++) {
			if (this.guessed_letters[i] === new_guess) {
				previous_guess = true;
				break;
			}
		}

		if (!previous_guess) {
			this.guessed_letters.push(new_guess);
			this.check_new_guess(new_guess);
			this.write();
		}
	}
};

word.start()

document.onkeyup = function(event) {
	word.add_guess(event.key);
}
