// DEBUG
var trace = function(msg){ console.log(msg); };

var ram;

var gifDisplay;

function pageLoad_init()
{
	trace("pageLoad_init();");

	build();
}

function build()
{
	gifDisplay = document.querySelector("#gif-wrapper .gif-content");
	
	ram = {};
	ram.url = "https://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC";

	data_load(ram.url, data_found);
}

function data_load(file, callback)
{
	var xobj = new XMLHttpRequest();

	xobj.overrideMimeType("application/json");
	xobj.open('GET', file, true);
	xobj.onreadystatechange = function()
	{
		if(xobj.readyState == 4 && xobj.status == "200")
		{
			callback(xobj.responseText);
		}
	};

	xobj.send();
}

function data_found(data)
{
	ram.data = JSON.parse(data);

	trace(ram.data);

	gif_use();
}

function gif_use()
{
	// var selector = Math.floor(Math.random() * (h - l) + l);
	var selector = Math.floor(Math.random() * ram.data.data.length);

	var g = ram.data.data[selector].images.downsized_large.url;

	gifDisplay.style.backgroundImage = "url(" + g + ")";
	trace(g);
}