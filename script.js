/*Handle requests from background.html*/
function handleRequest(
	//The object data with the request params
	request, 
	//These last two ones isn't important for this example, if you want know more about it visit: http://code.google.com/chrome/extensions/messaging.html
	sender, sendResponse
	) {
	console.log("Barra pronta pra ativar");
	if (request.callFunction == "toggleSidebar")
		toggleSidebar();
	sendResponse({return: true});
}
chrome.runtime.onMessage.addListener(handleRequest);

/*Small function wich create a sidebar(just to illustrate my point)*/
// var sidebarOpen = false;
// function toggleSidebar()

var sidebarOpen = false;
{
	if(sidebarOpen) {
		var el = document.getElementById('mySidebar');
		el.parentNode.removeChild(el);
		sidebarOpen = false;
	}
	else {
        var overlay = document.createElement('div');
        var sidebar = document.createElement('div');
		sidebar.id = "mySidebar";
		sidebar.style.cssText = "\
			position:fixed;\
			top:0px;\
			left:0px;\
			width:4%;\
			height:100%;\
			background-color:blue;\
			box-shadow:inset 0 0 1em black;\
			z-index:999999;\
		";
        sidebar.onmouseenter = toggleOnOff;
		document.body.appendChild(sidebar);
		sidebarOpen = true;

        function toggleOnOff() {
            if (sidebar.style.backgroundColor == 'blue')
            {
                sidebar.style.cssText = "\
			    position:fixed;\
			    top:0px;\
			    left:0px;\
			    width:4%;\
			    height:100%;\
			        background-color:red;\
			        box-shadow:inset 0 0 1em black;\
			        z-index:999999;\
		            ";
                overlay.id = "myOverlay";
                overlay.style.cssText = "\
                    background-color: rgba(0,0,0,0);\
                    bottom: 0;\
                    left: 4%;\
                    position:fixed;\
                    right: 0;\
                    top: 0;\
                    // display: none;\
                    width: 96%;\
                    height: 100%;\
                    box-shadow:inset 0 0 1em black;\
                    z-index:999999;\
                ";
                document.body.appendChild(sidebar);
                document.body.appendChild(overlay);
                sidebarOpen = true;
            }
            else{
                sidebar.style.cssText = "\
			    position:fixed;\
			    top:0px;\
			    left:0px;\
			    width:4%;\
			    height:100%;\
			        background-color:blue;\
			        box-shadow:inset 0 0 1em black;\
			        z-index:999999;\
		            ";
                document.body.appendChild(sidebar);
                overlay.style.cssText = "\
                display : none;\
                ";
                sidebarOpen = true;
            }
        }
	}

}