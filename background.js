console.log( 'Background.html starting!' );


	/*Put page action icon on all tabs*/
	chrome.tabs.onUpdated.addListener(function(tabId) {
		chrome.pageAction.show(tabId);
	});

	/*chrome.tabs.onCreated.addListener(function(tabId)
	{
		chrome.pageAction.show(tabId);
	});
	*/



	chrome.tabs.query({},function(tabs) 
	{
		for(let i = 0; i < tabs.length; i++)
		{
			chrome.pageAction.show(tabs[i].id);
		}
	});


	/*Send request to current tab when page action is clicked*/
	chrome.pageAction.onClicked.addListener(function(tab)
	{
		chrome.tabs.query({},function(tabs) {
			for(let i = 0; i < tabs.length; i++)
			{
				chrome.tabs.sendMessage
				(
					//Selected tab id
					tabs[i].id,
					//Params inside a object data
					{callFunction: "toggleSidebar"},
					function(response)
					{
						console.log(response);
					}
				)
			}
		});
	});


	chrome.tabs.onUpdated.addListener(function (updatedTabId) {
		{
			chrome.tabs.sendMessage
			(
				updatedTabId,
				{callFunction: "toggleSidebar"},
				function (response) {
					console.log(response + "UPDATEEEEEE!!!");
				})
		}
	});




console.log( 'Background.html done.' );