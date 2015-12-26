/*
 * This script holds the code for turning dirty
 * talk in mad libs.
 */

//Global Variable
var logout_time = 0;  //Records login time of me, so i dont blast notice for bad connection.
/*
 * Arrays used for mad libs
 * @type Array
 */
var nouns = ['moonstone', 'triforce', 'demon blade']; //nouns for mad libs
var swear = ['dang', 'meanie', 'stuff'];  //Replaces swear words
var verbs = ['lick'];   //Verbs for mad libs

/*
 * This is the event called everytime a user enters the chat room.
 */
cb.onEnter(function(user) 
{
    //If I log into a chat room send a special message to the broadcaster!
    if(user = "cajunzombie")
    {
        if(logout_time == 0)
        {
            cb.chatNotice('Good Morning delightful Kitty Kat!!! \n\
                            \n\
                            It\'s your favorite zombie ;) Mwuah!'
                            ,cb.room_slug ,'#00b33c','#ffffff','bold');
        };
    }
});

/*
 * This is the event called when a user logs out
 */
cb.onLeave(function(user) 
{
    if(user = "cajunzombie")
    {
        logout_time = 1;
    }
});


/*
 * This is the event called when a user sends a message
 */
cb.onMessage(function (msg) {
    
    //If message was sent by broadcaster or moderator, just post message
    //if(msg['is_mod'] == true || msg['user'] == cb.room_slug)
    //{
      //return msg;  
    //};
    
    //If user is using a special font, set their font to Arial
    if(msg['f'] != 'Bookman Old Style')
    {
        msg['f'] = 'Bookman Old Style';
    };
    
    //Check for sticky keys
    var is_sticky = msg['m'].search(/(.)\1{3,}/i, 'Sorry, I face smashed my keyboard..');
    if(is_sticky > -1)
    {
        msg['m'] = 'Sorry, I face smashed my keyboard...';
        return msg;
    };
    
    //Replace any verion of pussy to kitty
    msg['m'] = msg['m'].replace(/(pus*\w+|clit|cunt)/gi, nouns[0]); //Pussy
    msg['m'] = msg['m'].replace(/(dick|cock)/gi, nouns[1]); //Dick
    msg['m'] = msg['m'].replace(/(tit)t?(s|ies|ie)?/gi, nouns[2]); //Tits
    msg['m'] = msg['m'].replace(/(com|cum)e?/gi, verbs[0]); //Cum
    msg['m'] = msg['m'].replace(/(fuck|fuk)/gi, swear[0]); //Fuck
    msg['m'] = msg['m'].replace(/bitch/gi, swear[1]); //Bitch
    msg['m'] = msg['m'].replace(/shit/gi, swear[2]); //Shit
    msg['m'] = msg['m'].replace(/(cutie|cuttie|bb|baby|bab|sweet(?=(t|y|i|e|ie))|sweat(?=(t|y|i|e|ie)))t?(e|ie|y)?/gi, 'Kitty'); //Baby
    
    //Return message object
    return msg;
});