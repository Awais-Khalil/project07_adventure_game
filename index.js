#! /usr/bin/env node
import * as readline from "readline";
// Define the game map
const map = {
    start: {
        description: "You are in a small room with a single door to the east.",
        exits: {
            east: "room1",
        },
    },
    room1: {
        description: "You are in a long hallway with doors to the north and south.",
        exits: {
            north: "room2",
            south: "start",
        },
    },
    room2: {
        description: "You are in a large room with a treasure chest in the center.",
        exits: {
            south: "room1",
            west: "room3",
        },
    },
    room3: {
        description: "You are in a dark room with a mysterious figure standing in the corner.",
        exits: {
            east: "room2",
            west: "end",
        },
    },
    end: {
        description: "Congratulations, you have reached the end of the game!",
        exits: {},
    },
};
// Define a function to display the current room and possible exits
function displayRoom(game) {
    const room = map[game.player.currentRoom];
    console.log(room.description);
    console.log("Exits:", Object.keys(room.exits).join(", "));
}
// Define a function to process player input
function processInput(game, input) {
    const room = map[game.player.currentRoom];
    const inputParts = input.toLowerCase().split(" ");
    const command = inputParts[0];
    const argument = inputParts[1];
    if (command === "go") {
        if (argument in room.exits) {
            game.player.currentRoom = room.exits[argument];
            displayRoom(game);
        }
        else {
            console.log("You can't go that way.");
        }
    }
    else if (command === "take") {
        if (argument === "treasure" && game.player.currentRoom === "room2") {
            console.log("You have taken the treasure!");
            game.player.inventory.push("treasure");
        }
        else {
            console.log("There's nothing to take here.");
        }
    }
    else if (command === "inventory") {
        console.log("Inventory:", game.player.inventory.join(", "));
    }
    else {
        console.log("I don't understand.");
    }
}
// Define the main game loop
// Create an interface for reading user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Define the main game loop
async function main() {
    const game = {
        player: {
            currentRoom: "start",
            inventory: [],
        },
        gameOver: false,
    };
    console.log("Welcome to the text adventure game!");
    while (!game.gameOver) {
        displayRoom(game);
        // Wait for user input
        const input = await new Promise(resolve => rl.question("What do you want to do?", resolve));
        if (input === null) {
            console.log("Goodbye!");
            game.gameOver = true;
        }
        else {
            processInput(game, input);
        }
    }
    // Close the readline interface
    rl.close();
}
main();
// Start
