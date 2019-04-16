((tweeter) => {
	if (!tweeter) {
		return;
	}
	
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
	//		tweetObj.commentSize = timerParams["commentSize"] || 1;
	//		tweetObj.retweetSize = timerParams["retweetSize"] || 1;
	//		tweetObj.likeSize = timerParams["likeSize"] || 1;
	//		tweetObj.maxComments = timerParams["maxComments"] || -1;
	//		tweetObj.maxRetweets = timerParams["maxRetweets"] || -1;
	//		tweetObj.maxLikes = timerParams["maxLikes"] || -1;
	
	// Load the scheduled tweets.
	tweeter.schedule("Cmdr_Hadfield", "Thanks, Vancouver, for the beautiful evening.", "renewables", CONTROVERSIAL);
	tweeter.schedule("SchatzEd", "Wow, my son @jfdoming just made this really cool app! Check it out here! example.com #cool");
	tweeter.schedule("Cmdr_Hadfield", "Wow, @SchatzEd, that's really #cool!", "renewables", NORMAL, ["SchatzEd"]);
})(window.tweeter);
