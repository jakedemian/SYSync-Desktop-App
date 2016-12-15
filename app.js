if(typeof app == "undefined"){
window.app = {

	conversationData: [],
	currentConversationNumber: null,
	myNumber: "4408971768",

	obtainAllConversationData : function(){
		/*
				TODO replace this a real call to the webservice
		*/
		this.conversationData = {
			"4405919000" : {
				"name" : "Alison Delaney",
				"pic" : "http://www.facebook.com/somePicOfAlison.jpg",
				"msgs" : [
					{
						"src" : "4408971768",
						"msg" : "hi",
						"timestamp" : "2016-12-14-4:44:13"
					},
					{
						"src" : "4405919000",
						"msg" : "hi",
						"timestamp" : "2016-12-14-4:44:23"
					},
					{
						"src" : "4408971768",
						"msg" : "what's up this is a really long message because I'm testing what happens when i have an incredibly long message just like this one, which as I said is very very very long.",
						"timestamp" : "2016-12-14-4:45:01"
					},
					{
						"src" : "4405919000",
						"msg" : "not much, you?",
						"timestamp" : "2016-12-14-4:45:13"
					},
					{
						"src" : "4408971768",
						"msg" : "same",
						"timestamp" : "2016-12-14-4:45:37"
					}
				]
			}
		};

		this.updateContactList();
	},

	updateContactList : function(){
		var contactCardTemplate = $("#contact-card-template");
		var phoneNumbers = Object.keys(this.conversationData);
		for(var i = 0; i < phoneNumbers.length; i++){
			var phoneNumber = phoneNumbers[i];
			var thisConvoData = this.conversationData[phoneNumber];
			var contactName = thisConvoData.name;
			var pic = thisConvoData.pic;

			var contactCard = contactCardTemplate.clone();
			contactCard[0].id = ""; // removed template id
			contactCard.addClass("contact-card");
			contactCard.find(".name").html(contactName);
			contactCard.css("display", "");
			contactCard.click(function(){
				if(this.currentConversationNumber != phoneNumber){
					// since this is an onclick event, I need to reference my globals as app.x, not this.x
					app.currentConversationNumber = phoneNumber;
					app.loadConversation(app.conversationData[phoneNumber].msgs);
				}
			});
			
			// set some meta data for the contact card that can be referenced later
			contactCard.data("name", contactName);
			contactCard.data("number", phoneNumber);

			$(".contact-list").append(contactCard);
		}

		if(this.currentConversationNumber == null){
			// automatically load the first conversation in the contact-list
			var firstContactInList = $(".contact-list").children().first();
			if(firstContactInList.length > 0){
				var number = firstContactInList.data("number");
				this.loadConversation(this.conversationData[number].msgs);
			}
		}
	},

	loadConversation : function(messages){
		for(var i = 0; i < messages.length; i++){
			var msg = messages[i];
			var myNum = app.myNumber;

			var msgDiv = $("<div>");
			msgDiv.addClass("msg");
			myNum == msg.src ? msgDiv.addClass("msg-me") : msgDiv.addClass("msg-them");
			msgDiv.html(msg.msg);
			$(".conversation-area").append(msgDiv);
		}
	}
};
}

$(document).ready(function(){
	app.obtainAllConversationData();
});