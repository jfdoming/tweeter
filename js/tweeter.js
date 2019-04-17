{
	const SCHEDULE_MEAN_TIME = 15000;
	const SCHEDULE_INSTANT = false;
	
	let randomTime = () => {
		return !SCHEDULE_INSTANT * -SCHEDULE_MEAN_TIME * Math.log(Math.random());
	};
	
	
	const TIMER_INTERVAL = 50;
	
	let visibleTweets = [];
	setInterval(() => {
		const now = Date.now();
		
		const manage = (t, lcsname, lcpname, ucpname) => {
			const maxk = "max" + ucpname;
			const valk = lcpname;
			const timek = lcsname + "Time";
			const sizek = lcsname + "Size";
			const freqk = lcsname + "Frequency";
			const elk = lcsname + "El";
			if ((t[maxk] == -1 || t[valk] < t[maxk]) && now - t[timek] > (1000 / t[freqk])) {
				t[valk] += t[sizek];
				if (t[maxk] != -1 && t[valk] > t[maxk]) {
					t[valk] = t[maxk];
				}
				
				t[timek] = now;
				t[elk].textContent = t[valk];
			}
		};
		
		visibleTweets.forEach((t) => {
			if (now - t.eTime > 2000) {
				++t.time;
				t.eTime = now;
				
				if (t.time < 24) {
					t.timeEl.textContent = t.time + "h";
				} else if (t.time < 24 * 30) {
					t.timeEl.textContent = Math.floor(t.time / 24) + "d";
				} else if (t.time < 24 * 365) {
					t.timeEl.textContent = Math.floor(t.time / (24 * 30)) + "mo";
				} else {
					t.timeEl.textContent = Math.floor(t.time / (24 * 365)) + "y";
				}
			}
			
			manage(t, "comment", "comments", "Comments");
			manage(t, "retweet", "retweets", "Retweets");
			manage(t, "like", "likes", "Likes");
			/*if ((t.maxComments == -1 || t.comments < t.maxComments) && now - t.commentTime > (1000 / t.commentFrequency)) {
				t.comments += t.commentSize;
				if (t.maxComments != -1 && t.comments > t.maxComments) {
					t.comments = t.maxComments;
				}
				
				t.commentTime = now;
				t.commentEl.textContent = t.comments;
			}
			
			if ((t.maxRetweets == -1 || t.retweets < t.maxRetweets) && now - t.retweetTime > (1000 / t.retweetFrequency)) {
				t.retweets += t.retweetSize;
				if (t.maxRetweets != -1 && t.retweets > t.maxRetweets) {
					t.retweets = t.maxRetweets;
				}
				
				t.retweetTime = now;
				t.retweetEl.textContent = t.retweets;
			}
			
			if ((t.maxLikes == -1 || t.likes < t.maxLikes) && now - t.likeTime > (1000 / t.likeFrequency)) {
				t.likes += t.likeSize;
				if (t.maxLikes != -1 && t.likes > t.maxLikes) {
					t.likes = t.maxLikes;
				}
				
				t.likeTime = now;
				t.likeEl.textContent = t.likes;
			}*/
		});
	}, TIMER_INTERVAL);
	
	let el = (type, className, parent = null) => {
		let e = document.createElement(type);
		
		if (className) {
			if (typeof className == "string") {
				e.classList.add(className);
			} else {
				className.forEach((itm) => e.classList.add(itm));
			}
		}
		
		if (parent) {
			parent.appendChild(e);
		}
		return e;
	};
	let div = (className, parent, content = "") => {
		let e = el("div", className, parent);
		e.textContent = content;
		return e;
	};
	let span = (className, parent, content = "") => {
		let e = el("span", className, parent);
		e.textContent = content;
		return e;
	};
	let img = (className, parent, src = "", size = null, useErrorImg = false) => {
		let e = el("img", className, parent);
		
		if (useErrorImg) {
			e.addEventListener("error", () => {
				e.src = "img/profile/default.png";
			});
		}
		e.src = src;
		
		if (size) {
			e.width = size;
			e.height = size;
		}
		return e;
	};
	let icon = (className, parent) => {
		let e = el("span", className, parent);
		e.classList.add("icon");
		return e;
	};
	let action = (parent, name, text) => {
		let action = span(["tweet-footer-action", "tweet-footer-action-" + name], parent);
		icon(["tweet-footer-icon", "icon-" + name], action);
		span("tweet-footer-label", action, text);
		
		action.addEventListener("click", () => {
			action.classList.add("clicked");
		});
		return action;
	};
	
	let userList = [];
	let embedList = [];
	
	let scheduled = false;
	let tweetSchedule = [];
	
	document.addEventListener("keypress", (e) => {
		if (e.code == "Space") {
			if (tweetSchedule.length <= 0) {
				return;
			}
			
			e.preventDefault();
			let scheduledTweet = tweetSchedule.shift();
			tweeter.tweet(...scheduledTweet);
		}
	});
	
	window.tweeter = {
		users: {
			push: (handle, fullname = "--", verified = false, profileExtension = ".png") => {
				userList.push({handle: handle, fullname: fullname, verified: verified, profileExtension: profileExtension});
			},
			find: (handle) => {
				let result = userList.find((user) => user.handle == handle);
				if (result) {
					return result;
				}
				return {
					handle: handle,
					fullname: "--",
					verified: false,
					profileExtension: ".png",
				};
			},
		},
		embeds: {
			contains: (key) => {
				return !!embedList.find((embed) => embed.key == key);
			},
			push: (key = null, url = "example.com", title = "--", description = "--", imgSource = null) => {
				if (!key) {
					return;
				}
				
				embedList.push({key: key, url: url, title: title, description: description, imgSource: imgSource});
			},
			find: (key) => {
				let result = embedList.find((embed) => embed.key == key);
				if (result) {
					return result;
				}
				return {
					key: key,
					url: "example.com",
					title: "--",
					description: "--",
					imgSource: null,
				};
			},
		},
		
		tweet: (handle, tweetBodyText = "...", timerParams = {}, replyUsers = [], embedUrl = "") => {
			let user = tweeter.users.find(handle);
			
			let fullpage = document.getElementById("fullpage");
			if (!fullpage) {
				return;
			}
			
			const randScale = (rangeSize = 0.25) => {
				return (1 - rangeSize) + (2 * Math.random() * rangeSize);
			};
			
			const now = Date.now();
			let tweetObj = {};
			tweetObj.eTime = now;
			tweetObj.commentTime = now;
			tweetObj.retweetTime = now;
			tweetObj.likeTime = now;
			tweetObj.commentFrequency = ((timerParams["commentFrequency"] || 0.5) * randScale(0.1));
			tweetObj.retweetFrequency = ((timerParams["retweetFrequency"] || 0.1) * randScale(0.1));
			tweetObj.likeFrequency = ((timerParams["likeFrequency"] || 0.9) * randScale(0.1));
			tweetObj.commentSize = timerParams["commentSize"] || 1;
			tweetObj.retweetSize = timerParams["retweetSize"] || 1;
			tweetObj.likeSize = timerParams["likeSize"] || 1;
			tweetObj.maxComments = Math.ceil(timerParams["maxComments"] * randScale()) || -1;
			tweetObj.maxRetweets = Math.ceil(timerParams["maxRetweets"] * randScale()) || -1;
			tweetObj.maxLikes = Math.ceil(timerParams["maxLikes"] * randScale()) || -1;
			tweetObj.time = 0;
			tweetObj.comments = 0;
			tweetObj.retweets = 0;
			tweetObj.likes = 0;
			
			let section = div("section");
			fullpage.insertBefore(section, fullpage.firstChild);
			
			let wrapper = div("wrapper", section);
			let body = div("tweet", wrapper);
			let header = div("tweet-header", body);
			img("avatar", header, "img/profile/" + handle + user.profileExtension, 48, true);
			let accGroup = div("account-group", header);
			span("fullname", accGroup, user.fullname);
			
			if (user.verified) {
				img("verified", accGroup, "img/icon/check.png", 15);
			}
			
			span("username", accGroup, "@" + handle);
			span("middot", accGroup, "\u00B7");
			tweetObj.timeEl = span("time", accGroup, "Just now");
			
			let tweetBody = div("tweet-body", body);
			if (replyUsers.length > 0) {
				let text = "Replying to";
				replyUsers.forEach((u) => {
					text += " <a>@" + u + "</a>";
				});
				let replyText = span("reply-text", tweetBody);
				replyText.innerHTML = text;
			}
			let tweetText = div("tweet-text", tweetBody);
			
			const URL_REGEX = /((http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))/g;
			tweetText.innerHTML = tweetBodyText.replace(/((?:#|@)\w+)(\b)/g, "<a>$1</a>$2").replace(URL_REGEX, "<a>$1</a>");
			
			if (tweeter.embeds.contains(embedUrl)) {
				let embed = tweeter.embeds.find(embedUrl);
			
				let tweetEmbed = div("tweet-embed", tweetBody);
				
				let tweetEmbedBody = null;
				if (embed.imgSource) {
					img("tweet-embed-preview", tweetEmbed, embed.imgSource);
					tweetEmbedBody = div("tweet-embed-body", tweetEmbed);
				} else {
					tweetEmbedBody = div(["tweet-embed-body", "tweet-embed-body-full"], tweetEmbed);
				}
				span("tweet-embed-title", tweetEmbedBody, embed.title)
				span("tweet-embed-description", tweetEmbedBody, embed.description);
				div("tweet-embed-url", tweetEmbedBody, embed.url);
			}
			
			let footer = div("tweet-footer", body);
			tweetObj.commentEl = action(footer, "message", "0").querySelector(".tweet-footer-label");
			tweetObj.retweetEl = action(footer, "retweet", "0").querySelector(".tweet-footer-label");
			tweetObj.likeEl = action(footer, "heart", "0").querySelector(".tweet-footer-label");
			action(footer, "dm");
			
			fullpage.classList.remove("entered");
			fullpage.style.transform = "translateY(-" + section.offsetHeight + "px)";
			
			setTimeout(() => {
				body.classList.add("entered");
				fullpage.style.transform = "";
				fullpage.classList.add("entered");
			}, 0);
			
			visibleTweets.push(tweetObj);
		},
		schedule: (...tweetToSchedule) => {
			if (!scheduled) {
				let timer = () => {
					let time = randomTime();
					setTimeout(() => {
						if (tweetSchedule.length <= 0) {
							scheduled = false;
							return;
						}
						
						let scheduledTweet = tweetSchedule.shift();
						tweeter.tweet(...scheduledTweet);
						timer();
					}, time);
				};
				timer();
				scheduled = true;
			}
			tweetSchedule.push(tweetToSchedule);
		}
	};
};