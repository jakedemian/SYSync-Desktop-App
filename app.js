if(typeof app == "undefined"){
window.app = {

	conversationData: [],
	currentConversationNumber: null,

	obtainAllConversationData : function(){
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
						"msg" : "what's up",
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
					app.loadConversation(phoneNumber);
				}
			});
			
			// set some meta data for the contact card that can be referenced later
			contactCard.data("name", contactName);
			contactCard.data("number", phoneNumber);

			$(".contact-list").append(contactCard);
		}
	},

	loadConversation : function(number){
		console.log("TODO: loading the conversation from the stored conversationData json object!");
	}
};
}

$(document).ready(function(){
	app.obtainAllConversationData();
});