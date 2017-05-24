// DEBUG
var trace = function(msg){ console.log(msg); };

// REFERENCE
// https://github.com/Giphy/GiphyAPI

var ram;

var gifDisplay;
var channelNumber;

var cycle;

function pageLoad_init()
{
	trace("pageLoad_init();");

	build();
}

function build()
{
	gifDisplay = document.querySelector("#gif-wrapper .gif-content");
	channelNumber = document.querySelector("#gif-wrapper .channel");

	ram = {};
	ram.url = "https://api.giphy.com/v1/gifs/search?q=adventure+time&api_key=dc6zaTOxFJmzC";
	// ram.url = "https://api.giphy.com/v1/gifs/search?q=alan+partridge&api_key=dc6zaTOxFJmzC";

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

	cycle = setInterval(gif_use, 3 * 1000);
}

function gif_use()
{
	var delay;
	var selector;
	var file;
	var channelString = "";

	// selector = Math.floor(Math.random() * (h - l) + l);
	selector = Math.floor(Math.random() * ram.data.data.length);

	file = ram.data.data[selector].images.downsized_large.url;

	gifDisplay.style.backgroundImage = "url()";
	gifDisplay.classList.add("gif-hide");
	channelNumber.classList.remove("gif-hide");

	if(selector < 10)
	{
		channelString = "0" + selector;
	}

	else
	{
		channelString = selector;
	}

	channelNumber.innerHTML = channelString;

	delay = setTimeout(gif_add, 200, file);
}

function gif_add(file)
{
	var delay;

	gifDisplay.style.backgroundImage = "url(" + file + ")";
	gifDisplay.classList.remove("gif-hide");

	delay = setTimeout(gif_addExtra, 1 * 1000);
}

function gif_addExtra()
{
	channelNumber.classList.add("gif-hide");	
}


