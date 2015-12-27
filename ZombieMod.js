/*
 * This script holds the code for turning dirty
 * talk in mad libs.
 */

//Global Variable
var logout_time = 0,  //Records login time of me, so i dont blast notice for bad connection.
    broadcasterName = cb['settings'].name,
    heart = ":heart7",
    is_sticky,
    is_baby,
    is_swear,
    modEnum = 
    {
    easy: 'easy',  
    avg: 'average', 
    tough: 'tough'
    },

    modLvl,
/*
 * Arrays used for mad libs
 * @type Array
 */ 
    
    swear = ['dang', 'meanie', 'stuff'],  //Replaces swear words
    
    //Video Game words
    vgNouns = ['analog control', 'easter egg', 'game genie', 
                'game shark', '64', 'sega genesis', 'RPG', 
                'FPS', 'spawn point', 'sandbox', 'LAN party', 
                'K/D ratio', 'extra life', 'achievement', 'buff',
                'cutscene', 'mana pool', 'season pass'], //nouns for mad libs
    vgVerbs = ['double jump', 'cheat', 'hack', 'respawn', 
                'button smash', 'autosave', 'rage quit', 
                'cooldown', 'farm', 'lag', 'speed run'],   //Verbs for mad libs
    vgAdjectives = ['1337', 'noob', 'pwned', 'exclusive', 'F2P', 'nerfed', 'twink'],

    //Anime words
    animeNouns = ['kitsune', 'tessaiga'],
    animeVerbs = [],
    animeAdjectives = ['baka'],
    
    //Place holder arrays to allow the swapping of themes
    nounArray = [],
    verbArray = [],
    adjArray = [];

function init()
{   
    //Initializes the moderators level with a switch statement and fake enum
    switch(cb['settings'].moderator_level)
    {
        case 'Laid Back':
            modLvl = modEnum.easy;
            break;
        
        case 'Average':
            modLvl = modEnum.avg;
            break;
            
        case 'Body Guard':
            modLvl = modEnum.tough;
            break;
            
        default:
            modLvl = modEnum.avg;
            break;
    };
    
    //Initializes if broadcaster wants to block stick keys
    if(cb['settings'].is_sticky == 'Yes')
    {
        is_sticky = true;
    }
    else
    {
        is_sticky = false;
    };
    
    //Initializes if broadcaster wants to block sticky keys
    if(cb['settings'].is_baby == 'Yes')
    {
        is_baby = true;
    }
    else
    {
        is_baby = false;
    };
    
    //Initializes if broadcaster wants to block swear words
    if(cb['settings'].is_swear == 'Yes')
    {
        is_swear = true;
    }
    else
    {
        is_swear = false;
    };
    
    //This will be a conditional that will set there for mad libs from settings
    nounArray = vgNouns;
    verbArray = vgVerbs;
    adjArray = vgAdjectives;
};

//Initialze all settings variables
init();

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
            if(cb.room_slug == 'thekittykatbar')
            {
                cb.chatNotice('Good Morning delightful Kitty Kat!!! \n\
                            \n\
                            It\'s your favorite zombie ;) Mwuah!'
                            ,cb.room_slug ,'','#00b33c','bold');
            }
            else
            {
                cb.chatNotice('Hi beautiful ' + broadcasterName + '. I\'m CajunZombie. \n\
                               I am the creator of Zombie Mad Libs. \n\
                                Let me know if you have any questions. ' + heart,
                                cb.room_slug ,'','#00b33c','bold');
            };
        };
    };
    
    if(user = cb.room_slug)
    {
        cb.sendNotice('Type /beefup if you want to increase level of filtering. \n\
                       Type /beefdown if you want to lower level of filtering.',
                    cb.room_slug ,'','#00b33c','bold');
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
cb.onMessage(function (msg) 
{
    //this is the script that lets broadcaster adjust moderator level
    if(msg['user'] == cb.room_slug)
    {
        if(msg['m'] == '/beefup')
        {
            switch(modLvl)
            {
                case modEnum.easy:
                    modLvl = modEnum.avg;
                    cb.sendNotice('Zombie Mod was beefed up to average!',cb.room_slug,'#00b33c','#ffffff','bold');
                    break;
                case modEnum.avg:
                    modLvl = modEnum.tough;
                    cb.sendNotice('Zombie Mod was beefed up to body guard!',cb.room_slug,'#00b33c','#ffffff','bold');
                    break;
                case modEnum.tough:
                    cb.sendNotice('Can\'t beef up anymore. \n\
                                    If you want more words added, contact CajunZombie',cb.room_slug,'#00b33c','#ffffff','bold');
            }
            msg['X-Spam'] = true;
            msg['m'] = 'Let\'s place nice boys!';
            return msg;
        };
        
        if(msg['m'] == '/beefdown')
        {
            switch(modLvl)
            {
                case modEnum.easy:
                    modLvl = modEnum.avg;
                    cb.sendNotice('This is the lowest setting.',cb.room_slug,'','#00b33c','bold');
                    break;
                case modEnum.avg:
                    modLvl = modEnum.easy;
                    cb.sendNotice('Zombie Mod was beefed down to easy!',cb.room_slug,'','#00b33c','bold');
                    break;
                case modEnum.tough:
                    modLvl = modEnum.avg;
                    cb.sendNotice('Zombie Mod was beefed down to average!',cb.room_slug,'','#00b33c','bold');
            }
            msg['X-Spam'] = true;
            msg['m'] = 'Let\'s have some fun. ;)';
            return msg;
        };
    };
    //If message was sent by broadcaster or moderator, just post message
    if(msg['is_mod'] == true || msg['user'] == cb.room_slug)
    {
      return msg;  
    };
    //If user is using a special font, set their font to Arial
    if(msg['f'] != 'Bookman Old Style')
    {
        msg['f'] = 'Bookman Old Style';
    };
    
    //Check for sticky keys if broadcaster wants to
    if(is_sticky)
    {
        var sticky = msg['m'].search(/(.)\1{3,}/i, 'Sorry, I face smashed my keyboard..');
        if(sticky > -1)
        {
            msg['m'] = 'Sorry, I face smashed my keyboard...';
            return msg;
        };
    };
    
    //Block baby names if broadcaster wants to
    if(is_baby)
    {
        var greeting = msg['m'].search(/(hey|hi|hello)/i);  //Looks for a greeting to tell if its a nickname
        msg['m'] = msg['m'].replace(/(cutie|cuttie|bb|baby|bab|sweet(?=(t|y|i|e|ie))|sweat(?=(t|y|i|e|ie)))t?(e|ie|y)?/gi, broadcasterName); //Baby
        if(greeting > -1)
        {
            msg['m'] = msg['m'].replace(/(sex)y?/i, broadcasterName);  //Replace sexy if there is a greeting
        }
    }
    
    //Check for sticky keys if broadcaster wants to
    if(is_swear)
    {
        msg['m'] = msg['m'].replace(/(fuck|fuk)/gi, swear[0]); //Fuck
        msg['m'] = msg['m'].replace(/bitch/gi, swear[1]); //Bitch
        msg['m'] = msg['m'].replace(/shit/gi, swear[2]); //Shit
    };
    
    //Switch statement that determines what to filter based off mod settings
    switch(modLvl)
    {
        case modEnum.easy:
            easyMod(msg);
            break;
            
        case modEnum.avg:
            averageMod(msg);
            break;
            
        case modEnum.tough:
            toughMod(msg);
            break;
    }
    
    //Return message object
    return msg;
});

/*
 * Setting for the ZombieMod1.0
 * The broadcaster will need to fill out settings
 * for bot.
 */
cb.settings_choices = [
    {name: 'name', type: 'str', 
        minLength: 1, maxLength: 255, label:'Your Nickname'},
    {name:'moderator_level', type:'choice',
        choice1:'Laid Back',
        choice2:'Average',
        choice3:'Body Guard', defaultValue:'Average'},
    {name:'is_sticky', type:'choice',
        choice1:'Yes',
        choice2:'No', defaultValue: 'Yes', label:'Block Sticky Keys'},
    {name:'is_baby', type:'choice',
        choice1:'Yes',
        choice2:'No', defaultValue: 'Yes', label:'Block Baby Names'},
    {name:'is_swear', type:'choice',
        choice1:'Yes',
        choice2:'No', defaultValue: 'Yes', label:'Block Swear Words'}
];

//This function handles filtering on easy mode
function easyMod(msg)
{
    madLib(msg, '\\b(pus*\\w+|clit|cunt)(\\w+)?', nounArray,true,'\\b(wet)(\\w+)?',adjArray);
    madLib(msg, '\\b(dick|cock)(\\w+)?', nounArray,true,'\\b(hard)(\\w+)?',adjArray);
    /*
    var indexCount = msg['m'].match(/(pus*\w+|clit|cunt)/gi);
    var numberAppearences = indexCount.length;
    for(i=0;i<numberAppearences;i++)
    {
        var noun = Math.floor(Math.random()*nounArray.length);
        msg['m'] = msg['m'].replace(/(pus*\w+|clit|cunt)/i, nounArray[noun]); //Pussy
    }
    indexCount = msg['m'].match(/(dick|cock)/gi);
    numberAppearences = indexCount.length;
    for
    noun = Math.floor(Math.random()*nounArray.length);
    msg['m'] = msg['m'].replace(/(dick|cock)/i, nounArray[noun]); //Dick
    */
}

//This function handles filtering on average mode
function averageMod(msg)
{
    easyMod(msg);
    madLib(msg, '\\b(com|cum)(m)?', verbArray);
    madLib(msg, '\\b(daddy)(\\w+)?', nounArray);
    madLib(msg, '\\b(suck)(k)?', verbArray);
    madLib(msg, '\\b(lick|lic|lik)(k)?', verbArray);
    /*
    msg['m'] = msg['m'].replace(/(com|cum)e?/gi, verbArray[0]); //Cum
    msg['m'] = msg['m'].replace(/daddy/gi, nounArray[3]); //daddy
    msg['m'] = msg['m'].replace(/(lick|lic|lik)/gi, adjArray[3]); //lick
    */
}

//This function handles filtering on body guard mode
function toughMod(msg)
{
    averageMod(msg);
    madLib(msg, '\\b(tit)t?(s|ies|ie)?(\\w+)?', nounArray,true,'\\b(big|fat|huge)(\\w+)?',adjArray);
    madLib(msg, '\\b(ass)(hol)?(\\w+)?', nounArray);
    /*
    msg['m'] = msg['m'].replace(/\b(tit)t?(s|ies|ie)?/gi, nounArray[2]); //Tits
    msg['m'] = msg['m'].replace(/\b(ass)(hol)?e?/gi, nounArray[2]); //Ass
    */
}

/*
*Fucntion to replace each value in message and replace with a new random word.
*Takes multiple params.
* msg = the message user is passing
* expression = the regex expression being matched
* wordArray = the array that mad lib word will be pulled from 
* is_optional = bool do you want to use optional
* optional = the additional regex you want to check if first regex is a match
* optionalArray = the array to pull words from for optional regex
*/
function madLib(msg,expression,wordArray,is_optional,optional,optionalArray)
{
    //Sets default values
    if (typeof(is_optional)==='undefined') is_optional = false;
    if (typeof(optional)==='undefined') optional = '';
    //Sets regex for the index to make an array out of all possible outcomes
    var indexRegex = new RegExp(expression, "gi");
    //Sets the regex to the replace because replace regex only replace first match
    var replaceRegex = new RegExp(expression, "i");
    if(is_optional)
    {
       //Sets the regex to the replace because replace regex only replace first match
        var optionalRegex = new RegExp(optional, "i"); 
    }
    //Puts all regex matches into an array for counting
    var indexCount = msg['m'].match(indexRegex);
    //Checks to make sure a match was found
    if (indexCount !== null)
    {
        //If match was found assign array length to variable for looping
        var numberAppearences = indexCount.length;
        //For loop for replacing all instance of regex with random words
        for(i=0;i<numberAppearences;i++)
        {
            //Assigns a new random variable for array index
            var noun = Math.floor(Math.random()*wordArray.length);
            
            //Replaces first instance of regex match
            msg['m'] = msg['m'].replace(replaceRegex, wordArray[noun]); //Pussy
           
            //Look for optional word
            if(is_optional)
            {
                //Assigns a new random variable for array index
                var adj = Math.floor(Math.random()*optionalArray.length);
                msg['m'] = msg['m'].replace(optionalRegex, optionalArray[adj]); //Pussy
            };
        };
    };
};