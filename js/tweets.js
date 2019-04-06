((tweeter) => {
	if (!tweeter) {
		return;
	}
	
	// Load the scheduled tweets.
	tweeter.schedule("Cmdr_Hadfield", "Thanks, Vancouver, for the beautiful evening.", "2h", "renewables");
	tweeter.schedule("SchatzEd", "Wow, my son @jfdoming just made this really cool app! Check it out here! http://example.com/ #cool", "5m");
})(window.tweeter);
