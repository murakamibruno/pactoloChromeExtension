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

/*Small function which create a sidebar(just to illustrate my point)*/
// var sidebarOpen = false;
// function toggleSidebar()

function toggleSidebar()
{
    let sidebarOpen = false;
    if(sidebarOpen) {
        const el = document.getElementById('mySidebar');
        el.body.removeChild(el);
        sidebarOpen = false;
    }
    else {

        let overlay = document.createElement('div');
        let sidebar = document.createElement('div');
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

        sidebarOpen = true;
        document.body.appendChild(sidebar);
        sidebar.onmouseenter = toggleOnOff;
        document.onwebkitfullscreenchange = fullscreenSidebar(sidebar);
        //let fullscreen = false;

        function fullscreenSidebar(sidebar) {
            //  if (fullscreen == false){
            //fullscreen = true;
            document.getElementById("movie_player").appendChild(sidebar);
            document.getElementById("movie_player").appendChild(overlay);
            sidebar.onmouseenter = toggleOnOff;
            console.log('entrou no full screen')
            //   } else {
            //  fullscreen = false;
            //    }

        }

        function toggleOnOff()
        {
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
                    width: 96%;\
                    height: 100%;\
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
