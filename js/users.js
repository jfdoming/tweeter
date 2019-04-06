((tweeter) => {
	if (!tweeter) {
		return;
	}
	
	// Load the test users.
	tweeter.users.push("Cmdr_Hadfield", "Chris Hadfield", true);
	tweeter.users.push("JustinTrudeau", "Justin Trudeau", true, ".jpg");
	tweeter.users.push("SchatzEd", "Edward Schatz", false, ".jpg");
})(window.tweeter);
