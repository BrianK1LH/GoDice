const connectedDice = {};

// Open the Bluetooth connection dialog for choosing a GoDice to connect
function openConnectionDialog() {
	const newDice = new GoDice();
	newDice.requestDevice();
}

function getPowerOfDice() {
	for (let diceId in connectedDice) {
		let diceElem = connectedDice[diceId];
		diceElem.getBatteryLevel();
	}
}

function checkSummary() {
	var summaryChecked = document.getElementById('sumCheckbox');
	if ( sumCheckboxElme.checked ) {
        let sumCount = getSumTotalOfDice();
		summaryElem = document.getElementById("dice-sum-total");
		summaryElem.textContent = "Sum: " + sumCount;
    } 
}
function getSumTotalOfDice() {
	var countingDice = 0;
	for (let diceId in connectedDice) {
		//let diceElem = connectedDice[diceId];
		let diceElem = document.getElementById(diceId + "-die-status");
		countingDice += parseInt(countingDice+diceElem.textContent || 0)
	}
	return countingDice;
}

/**
 * Get a new dice element or it's instance if it already exists
 * @param {string} diceID - the die unique identifier	 
 */
function getDiceHtmlEl(diceID) {
	if (!document.getElementById(diceID)) {
		const newDiceEl = document.createElement("div");
		newDiceEl.id = diceID;
		newDiceEl.className = "dice-wrapper";
		return newDiceEl;
	}
	return document.getElementById(diceID);
}

GoDice.prototype.onDiceConnected = (diceId, diceInstance) => {
	console.log("Dice connected: ", diceId);
	
	// Called when a new die is connected - create a dedicate panel for this die
	connectedDice[diceId] = diceInstance;

	// get new die element or it's instance if it's already exists
	const diceHtmlEl = getDiceHtmlEl(diceId);
	
	// clear existing die element content if it exists
	while (diceHtmlEl.firstChild) {
        	diceHtmlEl.removeChild(diceHtmlEl.lastChild);
	}

	// get die host from html, where we will put our connected dices
	const diceHost = document.getElementById("dice-host");

	// add name to die element
	const diceName = document.createElement('div');
	diceName.className = 'dice-name';
	diceName.textContent = `Dice ID: ${diceId}`;
	//diceHtmlEl.append(diceName)

	// add battery level button goDice.getBatteryLevel(diceID);
	const batteryLevelButton = document.createElement('button');
	batteryLevelButton.className = 'btn btn-outline-primary';
	batteryLevelButton.onclick = diceInstance.getBatteryLevel.bind(diceInstance);
	batteryLevelButton.textContent = 'Get Battery Level';
	//diceHtmlEl.append(batteryLevelButton)

	// add battery level indicator
	const batteryIndicator = document.createElement('div');
	batteryIndicator.id = `${diceId}-battery-indicator`;
	//diceHtmlEl.append(batteryIndicator)

	// get Dice color to use goDice.getDiceColor(diceID) function
	const getDiceColorButton = document.createElement('button');
	getDiceColorButton.className = 'btn btn-outline-primary';
	getDiceColorButton.onclick = diceInstance.getDiceColor.bind(diceInstance)
	getDiceColorButton.textContent = 'Get Dice Color';
	//diceHtmlEl.append(getDiceColorButton)
	
	
	// add battery level indicator
	const colorIndicator = document.createElement('div');
	colorIndicator.id = `${diceId}-color-indicator`;
	//diceHtmlEl.append(colorIndicator)

	// add die status indicator
	const dieStatus = document.createElement('div');
	dieStatus.id = `${diceId}-die-status`;
	//dieStatus.className = 'dice-name';
	diceHtmlEl.append(dieStatus)

	// inject dice into html
	diceHost.appendChild(diceHtmlEl);
	
	diceInstance.getDiceColor(diceId);
	
	
};


GoDice.prototype.onRollStart = (diceId) => {
	console.log("Roll Start: ", diceId);

	// get rolling indicator
	const diceIndicatorEl = document.getElementById(diceId + "-die-status");

	// show rolling 
	diceIndicatorEl.textContent = "-";
};

GoDice.prototype.onStable = (diceId, value, xyzArray) => {
	console.log("Stable event: ", diceId, value);

	// Get roll value indicator and show stable value
	const diceIndicatorEl = document.getElementById(diceId + "-die-status");
	//diceIndicatorEl.textContent = "Stable: " + value;
	diceIndicatorEl.textContent = value;
	checkSummary();
};


GoDice.prototype.onMoveStable = (diceId, value, xyzArray) => {
	console.log("MoveStable: ", diceId, value);

	// Get tile indicator and show fake value
	const diceIndicatorEl = document.getElementById(diceId + "-die-status");
	//diceIndicatorEl.textContent = "Move Stable: " + value;
	diceIndicatorEl.textContent = value;
	checkSummary();
};

GoDice.prototype.onBatteryLevel = (diceId, batteryLevel) => {
	console.log("BetteryLevel: ", diceId, batteryLevel);

	// get dice battery indicator element
	//const batteryLevelEl = document.getElementById(diceId + "-battery-indicator");
	const diceIndicatorEl = document.getElementById(diceId + "-die-status");
	
	// convert 100 to 99 because CSS explode issues
	if (batteryLevel == 100) {
		batteryLevel = 99;
	}
	// put battery level value into battery indicator html element
	diceIndicatorEl.textContent = batteryLevel;
};

GoDice.prototype.onDiceColor = (diceId, color) => {
	console.log("DiceColor: ", diceId, color);

	// get dice color indicator element
	const diceIndicatorEl = document.getElementById(diceId + "-die-status");
	//const diceColorEl = document.getElementById(diceId + "-color-indicator");
	
	var dieColor = "";
	switch (color) {
		case 0: dieColor = "Black"; 
			break;
		case 1: dieColor = "Red"; 
			break;
		case 2: dieColor = "Green";
			break;
		case 3: dieColor = "Blue";
			break;
		case 4: dieColor = "Yellow";
			break;
		case 5: dieColor = "Orange";
			break;
		default: dieColor = "blank";
	}
	
	diceIndicatorEl.className = `${dieColor}-die-color die-color`;
	//diceColorEl.className = `${dieColor}-die-color`;
	
	// put dice color value into battery indicator html element
	//diceColorEl.textContent = dieColor;
	diceIndicatorEl.textContent = "X";
};
