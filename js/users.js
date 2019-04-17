((tweeter) => {
	if (!tweeter) {
		return;
	}
	
	// Load the test users.
	tweeter.users.push("Cmdr_Hadfield", "Chris Hadfield", true);
	tweeter.users.push("JustinTrudeau", "Justin Trudeau", true, ".jpg");
	tweeter.users.push("MontgStef", "Stefan Montgomery", false, ".jpg");
	tweeter.users.push("CBCNews", "CBC News", true, ".jpg");
	tweeter.users.push("ItsChelsea957", "Chelsea Allen", false);
	tweeter.users.push("jshmoe999", "My Name Is Not Joe Shmoe", false);
	tweeter.users.push("nate_the_mate", "Nathan Brown", false);
	tweeter.users.push("jenny_from_the_block_4673", "Jennifer Zheng", false);
	tweeter.users.push("KaranChow", "Karan Chowdhry", true);
	tweeter.users.push("babybear_alex77", "Alexia Hernandez", false);
	tweeter.users.push("yaaoouuuuda99", "Patrick", false, ".jpg");
	tweeter.users.push("paypay_8029", "Paytyn Anne-Midgeley", false);
	tweeter.users.push("mattyj_23", "Mathhieu Jameson", false);
	tweeter.users.push("AndroidVoice", "Android Collective", true);
})(window.tweeter);
