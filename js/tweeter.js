{
	const SCHEDULE_MEAN_TIME = 15000;
	const SCHEDULE_INSTANT = false;
	
	let randomTime = () => {
		return !SCHEDULE_INSTANT * -SCHEDULE_MEAN_TIME * Math.log(Math.random());
	};
	
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
	let img = (className, parent, src = "", size = null) => {
		let e = el("img", className, parent);
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
		return action;
	};
	
	let userList = [];
	let embedList = [];
	
	let scheduled = false;
	let tweetSchedule = [];
	
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
		
		tweet: (handle, tweetBodyText = "...", time = "2h", embedUrl = "") => {
			let user = tweeter.users.find(handle);
			
			let fullpage = document.getElementById("fullpage");
			if (!fullpage) {
				return;
			}
			
			let section = div("section");
			fullpage.insertBefore(section, fullpage.firstChild);
			
			let wrapper = div("wrapper", section);
			let body = div("tweet", wrapper);
			let header = div("tweet-header", body);
			img("avatar", header, "img/profile/" + handle + user.profileExtension, 48);
			let accGroup = div("account-group", header);
			span("fullname", accGroup, user.fullname);
			
			if (user.verified) {
				img("verified", accGroup, "img/icon/check.png", 15);
			}
			
			span("username", accGroup, "@" + handle);
			span("middot", accGroup, "\u00B7");
			span("time", accGroup, time);
			
			let tweetBody = div("tweet-body", body);
			let tweetText = div("tweet-text", tweetBody);
			
			const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
			tweetText.innerHTML = tweetBodyText.replace(/((?:#|@)\w+)(\b)/g, "<a>$1</a>$2").replace(URL_REGEX, "<a>$1</a>");
			
			if (tweeter.embeds.contains(embedUrl)) {
				let embed = tweeter.embeds.find(embedUrl);
			
				let tweetEmbed = div("tweet-embed", tweetBody);
				img("tweet-embed-preview", tweetEmbed, embed.imgSource);
				let tweetEmbedBody = div("tweet-embed-body", tweetEmbed);
				span("tweet-embed-title", tweetEmbedBody, embed.title)
				span("tweet-embed-description", tweetEmbedBody, embed.description);
				div("tweet-embed-url", tweetEmbedBody, embed.url);
			}
			
			let footer = div("tweet-footer", body);
			action(footer, "message", "14");
			action(footer, "retweet", "14");
			action(footer, "heart", "14");
			action(footer, "dm");
			
			fullpage.classList.remove("entered");
			fullpage.style.transform = "translateY(-" + section.offsetHeight + "px)";
			
			setTimeout(() => {
				body.classList.add("entered");
				fullpage.style.transform = "";
				fullpage.classList.add("entered");
			}, 0);
		},
		schedule: (...tweetToSchedule) => {
			if (!scheduled) {
				let timer = () => {
					let time = randomTime();
					setTimeout(() => {
						if (tweetSchedule.length <= 0) {
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