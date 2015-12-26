/*
 * This script will contain all code for the wheel of fortune bot
 * on chaturbate.
 */

//Global Variables

var phrase;  //Holds the phase that the broadcaster inputs for game.

/*
 * These 2 arrays will hold the users name and score.
 * The users name and the corresponding score will have the
 * same array index. When setting score, username will be 
 * searched first, and array index will be used on score.
 * When game is over the score will be search for largest 
 * number, and array index will be used to pull username.
 */
var username;
var score;

/*
 * The point system
 */
var constanantPoints = 20;
var vowelPoints = 10;
var phrasePoints = 100;

/*
 * Tip amount needed
 */
var letterAmount;
var phraseAmount;