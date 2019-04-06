{
	let load = (embeds) => {
		if (!embeds) {
			return;
		}
		
		// Load the test embeds.
		embeds.push("renewables", "thinkprogress.org", "Renewables 'have won the race' against coal and are starting to beat natural gas at it's own game", "Meanwhile, the president remains clueless about the clean energy revolution.", "img/embed/renewables.jpg");
	};
	
	if (window.tweeter) {
		load(window.tweeter.embeds);
	}
}
