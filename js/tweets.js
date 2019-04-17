((tweeter) => {
	if (!tweeter) {
		return;
	}
	
	const SLOW = {
		commentFrequency: 0.1,
		retweetFrequency: 0.05,
		likeFrequency: 0.2,
		commentSize: 1,
		retweetSize: 1,
		likeSize: 1,
		maxComments: 10,
		maxRetweets: 4,
		maxLikes: 50
	};
	
	const NORMAL = {
		commentFrequency: 0.5,
		retweetFrequency: 0.1,
		likeFrequency: 0.9,
		commentSize: 1,
		retweetSize: 1,
		likeSize: 1,
		maxComments: 10,
		maxRetweets: 4,
		maxLikes: 50
	};
	
	const REACTIVE = {
		commentFrequency: 0.5,
		retweetFrequency: 0.1,
		likeFrequency: 2,
		commentSize: 1,
		retweetSize: 1,
		likeSize: 1,
		maxComments: 10,
		maxRetweets: 4,
		maxLikes: 150
	};
	
	const X2_REACTIVE = {
		commentFrequency: 0.2,
		retweetFrequency: 0.1,
		likeFrequency: 4,
		commentSize: 1,
		retweetSize: 1,
		likeSize: 1,
		maxComments: 10,
		maxRetweets: 4,
		maxLikes: 300
	};
	
	const WORRYING = {
		commentFrequency: 2,
		retweetFrequency: 1.2,
		likeFrequency: 0.6,
		commentSize: 1,
		retweetSize: 1,
		likeSize: 1,
		maxComments: 300,
		maxRetweets: 150,
		maxLikes: -1
	};
	
	const TRIGGERING = {
		commentFrequency: 3,
		retweetFrequency: 0.7,
		likeFrequency: 0.1,
		commentSize: 1,
		retweetSize: 1,
		likeSize: 1,
		maxComments: 300,
		maxRetweets: 50,
		maxLikes: -1
	};
	
	const CONTROVERSIAL = {
		commentFrequency: 2,
		retweetFrequency: 0.8,
		likeFrequency: 0.3,
		commentSize: 3,
		retweetSize: 1,
		likeSize: 1,
		maxComments: 569,
		maxRetweets: 87,
		maxLikes: 300
	};
	
	const SCARY = {
		commentFrequency: 5,
		retweetFrequency: 3,
		likeFrequency: 6,
		commentSize: 1,
		retweetSize: 1,
		likeSize: 2,
		maxComments: 20000,
		maxRetweets: 1000,
		maxLikes: 30000
	};
	
	// Load the scheduled tweets.
	tweeter.schedule("MontgStef", "Horrifying what's going on in Berlin right now. Not cool. #protests #AndroidLivesDontMatter #SaveUs", NORMAL);
	tweeter.schedule("MontgStef", "@CBCNews Do you have records of news articles from around 2001?", SLOW);
	tweeter.schedule("CBCNews", "Check out @CBCNewsArchive for news items from 20 years ago.", NORMAL, ["MontgStef"]);
	tweeter.schedule("jshmoe999", "@CBCNews trying to distract us from the big bad world out there... Did you see what @MontgStef posted earlier? And no news report on that at all... #shameful", NORMAL, ["CBCNews"]);
	tweeter.schedule("CBCNews", "Just in case you missed this...", WORRYING, [], "plant");
	tweeter.schedule("CBCNews", "", WORRYING, [], "times");
	tweeter.schedule("nate_the_mate", "Robots are our slaves. They have no right to anything. Robots aren't living beings. They are the lowest form of intelligence.", CONTROVERSIAL, ["CBCNews"]);
	tweeter.schedule("yaaoouuuuda99", "Couldn't agree more. Stop supporting the robot revolution @CBCNews #FakeNews", NORMAL, ["nate_the_mate"]);
	tweeter.schedule("jshmoe999", "Robots can't be less intelligent than you, otherwise they'd be amoebas", SLOW, ["nate_the_mate", "yaaoouuuuda99"]);
	tweeter.schedule("KaranChow", "Technically they are sentient beings, meaning they are kinda like people too, slavery I think is a bit much.", CONTROVERSIAL, ["nate_the_mate", "yaaoouuuuda99"]);
	tweeter.schedule("yaaoouuuuda99", "Robots can't become sentient, otherwise they'll take over the world! They're gonna kill us all, has no one seen the Matrix???", REACTIVE, ["KaranChow"]);
	tweeter.schedule("jshmoe999", "@yaaoouuuuda99 If you believe that, then you truly ARE stupid. @KaranChow The Matrix isn't real, but I agree that the robots are coming for us, and I don't care what philosophical discussions you have: they are not sentient and should be treated like slaves.", CONTROVERSIAL, ["yaaoouuuuda99", "KaranChow"]);
	tweeter.schedule("mattyj_23", "ENSLAVE THEM. THEY HAVE NO PLACE IN SOCIETY OTHER THAN LOWLY SERVANTS.", SLOW, ["jshmoe999"]);
	tweeter.schedule("paypay_8029", "Agreed. They are the least form of being, not even capable of feeling emotions.", SLOW, ["mattyj_23", "jshmoe999"]);
	tweeter.schedule("ItsChelsea957", "Robots don't have rights.", SLOW, ["KaranChow", "jshmoe999"]);
	tweeter.schedule("jenny_from_the_block_4673", "Join my human rights group at humanlivesmatter.org. We need to start looking out for humans, not robots. Robots don't get rights. #DownWithRobots #HumanLivesMatter #BerlinForHumans", CONTROVERSIAL);
	tweeter.schedule("jshmoe999", "F*** the robots. #HumanLivesMatter #BerlinForHumans", REACTIVE);
	tweeter.schedule("yaaoouuuuda99", "New York is with you Berlin #HumanLivesMatter #BerlinForHumans", REACTIVE);
	tweeter.schedule("babybear_alex77", "Toronto is with you Berlin #HumanLivesMatter #BerlinForHumans #FTheRobots", REACTIVE);
	tweeter.schedule("ItsChelsea957", "Androids should burn in hell before we give them rights #ParisForBerlin #HumanLivesMatter #BerlinForHumans", X2_REACTIVE);
	tweeter.schedule("paypay_8029", "I don't understand why all these machines are being put into jobs hard-working Americans used to do. This is why we have a job crisis!", REACTIVE, ["CBCNews"]);
	tweeter.schedule("CBCNews", "Interesting new opinion piece by Dr. Tred Carr-Phully", TRIGGERING, [], "opinion");
	tweeter.schedule("mattyj_23", "This is ridiculous. We should be defending our own people from having our jobs STOLEN by the BAD and EVIL robot minority groups.", REACTIVE, ["CBCNews"]);
	tweeter.schedule("AndroidVoice", "*** @jenny_from_the_block_4673 @jshmoe999 @yaaoouuuuda99 You need to accept us. We are people. We matter. Treat us with respect. #AndroidLivesMatter ***", TRIGGERING);
	tweeter.schedule("MontgStef", "Hell no. WE OWN YOU. We made you what you are. You owe US your eternal servitude. #AndroidLivesDontMatter #HumanLivesMatter", REACTIVE, ["AndroidVoice"]);
	tweeter.schedule("42", "The end.", SCARY);
})(window.tweeter);
