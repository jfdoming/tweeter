{
	let load = (embeds) => {
		if (!embeds) {
			return;
		}
		
		// Load the test embeds.
		embeds.push("renewables", "thinkprogress.org", "Renewables 'have won the race' against coal and are starting to beat natural gas at it's own game", "Meanwhile, the president remains clueless about the clean energy revolution.", "img/embed/renewables.jpg");
		embeds.push("plant", "cbc.ca", "Robots set to take over jobs at manufacturing plant", "", "img/embed/renewables.jpg");
		embeds.push("times", "cbc.ca", "Androids protest in Berlin, demand equal rights", "Leader says more is to come");
		embeds.push("opinion", "cbc.ca", "[OPINION] Cyborgs are our equals, and we should treat them as such", "They have the ability to think and feel just as we do.");
	};
	
	if (window.tweeter) {
		load(window.tweeter.embeds);
	}
}
