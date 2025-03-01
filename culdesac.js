let possibleActions = ["think()", "move()", "items()"];
let currentItems = [];
let timesExamined = 0;
let spacesMoved = 0;
let frozen = false;
let turn = 0;
const maxTurns = 10;

function speak(message) {
	const style = "font-style: italic; font-family: monospace; font-size: 1.4em;";
	console.log(`%c\n\n${message}\n\n`, style);
}

function listProgress() {
	const progressBar =
		turn <= maxTurns
			? "█".repeat(turn) + "░".repeat(maxTurns - turn)
			: "█".repeat(maxTurns);
	console.log(`Time until nightfall: ${progressBar} ☽`);
}

function listItems() {
	if (currentItems.length < 1) return;
	console.log(`Items: ${[...currentItems].join(", ")}`);
}

function addPossibleAction(newAction) {
	possibleActions = [...possibleActions, newAction];
}

function removePossibleAction(removedAction) {
	possibleActions = possibleActions.filter(
		(action) => !action.includes(removedAction),
	);
}

function addItem(newItem) {
	currentItems = [...currentItems, newItem];
}

function refreshUI() {
	console.clear();
	listProgress();
	listItems();
}

function advanceTurn(message) {
	turn++;
	refreshUI();

	speak(message);

	if (turn >= maxTurns) {
		speak("Night falls, and everything goes dark.");
		possibleActions = [];
		addPossibleAction("restart()");
	}

	listActions();
}

function listActions() {
	const actionStyles = "color: #AAA;";
	console.log(`%c➤ ${[...possibleActions].join("\n➤ ")}`, actionStyles);
}

function think() {
	if (!possibleActions.includes("think()")) return;

	if (frozen) {
		advanceTurn("Fear. Fear. Fear.");
		return;
	}

	if (timesExamined === 0) {
		timesExamined++;
		advanceTurn(
			"You don't remember how you got here. It's a typical American suburb — beige homes and lifeless lawns. There's no one around. No noise, not even the dull roar of cars in the distance. It's getting late, and you feel hungry.",
		);
	} else if (timesExamined === 1) {
		timesExamined++;
		addPossibleAction("knock()");
		advanceTurn(
			"You look around for any other sign of life, anyone who might be able to help you. The lights in most of the homes are off. Should you knock on someone's door?",
		);
	} else if (timesExamined === 2) {
		timesExamined++;
		advanceTurn(
			"There was... something... you were in the middle of doing. Something important. Before you came here. What was it? Every time you feel ready to grasp it, it slips away.",
		);
	} else {
		timesExamined++;
		removePossibleAction("knock()");
		removePossibleAction("think()");
		advanceTurn(
			"You worry that if you stay here thinking any longer, something awful will happen. You feel a strong desire to move, and to move quickly.",
		);
	}
}

function move() {
	if (!possibleActions.includes("move()")) return;

	if (spacesMoved === 0) {
		spacesMoved++;
		advanceTurn(
			"You begin to walk down the street, away from the cul-de-sac, toward the only direction that could contain an exit. Ahead of you is a long, straight road, flanked on either side by identical houses.",
		);
	} else if (spacesMoved === 1) {
		spacesMoved++;
		advanceTurn(
			"You continue to walk down the road as the light grows dark. It's difficult to explain, but you feel like you've been here before.",
		);
	} else if (spacesMoved === 2) {
		spacesMoved++;
		advanceTurn(
			"You continue to walk down the street. At the same moment you notice the light getting dim, you hear a faint *click*. All the street lights flip on at once.",
		);
	} else if (spacesMoved === 3) {
		spacesMoved++;
		advanceTurn(
			"The darkness settles closer. You begin to walk faster. First a jog, then a sprint.",
		);
	} else if (spacesMoved === 4) {
		spacesMoved++;
		advanceTurn("You sprint toward a destination unknown.");
	} else if (spacesMoved === 5) {
		spacesMoved++;
		frozen = true;
		removePossibleAction("knock()");
		advanceTurn(
			"You are stopped in your tracks. Every muscle frozen in place. You want to make a noise. You want to run. You cannot.",
		);
	} else {
		advanceTurn("You are frozen in place.");
	}
}

function knock() {
	if (!possibleActions.includes("knock()")) return;

	removePossibleAction("knock()");
	advanceTurn(
		"You approach a nearby house. Curtrains are drawn, backlit by dim, flickering lights — a television? Ascending a small set of steps, you pause before the front door, then knock. You sense an unseen shifting, but no one answers. You return to the main road.",
	);
}

function items() {
	if (!possibleActions.includes("items()")) return;

	if (currentItems.length === 0) {
		addItem("dead phone");
		addItem("loose change");
		advanceTurn(
			"You check your pockets. You find a phone with a cracked screen and a dead battery. Some loose change. No wallet.",
		);
	} else if (
		currentItems.length > 0 &&
		!currentItems.includes("onyx figurine")
	) {
		addItem("onyx figurine");
		advanceTurn(
			"Checking your pockets a second time, you find an item you had missed: a tiny figurine made of a dark black stone. It's heavy for its size. Was this here before?",
		);
	} else {
		removePossibleAction("items()");
		advanceTurn("Nothing new has appeared in your pockets.");
	}
}

function start() {
	refreshUI();
	speak(
		"You find yourself standing in the center of a cul-de-sac. The sun tempts the horizon. The air is unmoving.",
	);
	listActions();
}

function restart() {
	possibleActions = ["think()", "move()", "items()"];
	currentItems = [];
	timesExamined = 0;
	spacesMoved = 0;
	turn = 0;
	start();
}

start();
