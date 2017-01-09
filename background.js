// only perform actions on the following hosts
var runOnHosts = ["fb.com", "facebook.com", "facebook.de", "youtube.com"];
var stopWords = ["stupid","idiot","Retard","retarded","Fuck","Faggot","fag","Moron","Bitch","Creation","Flat","Nigger","Dyke","Sinner","Hell","Whore","Slut","Jesus","Bastard","Dike","Wetback","Wop","Twink","Spic","Spick","Gook","Illuminati","Douche","Coon","Dick","Dickhead","Kike","Gringo","Butch"];

$.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function(elem) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

// run script every second or something
window.setInterval(function() {

	var host = location.host.replace("www.", "");
	if (runOnHosts.indexOf(host) >= 0) {

		// we have a candidate, check for comments
		for (var i in stopWords) {
			var w = stopWords[i];

			var $s = $(".UFIComment, .comment-thread-renderer").find(":contains(' " + w + " ')");
			if ($s.length > 0) {

				// facebook comments hiding
				var $c = $s.parents(".UFIComment");
				$c.next(".UFIReplyList").hide();
				$c.hide();

				// youtube comments hiding
				var $y = $s.parents(".comment-thread-renderer");
				$y.hide();
			}
		}
	}
}, 10000);
