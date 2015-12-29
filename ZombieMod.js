/*
 * This script holds the code for turning dirty
 * talk in mad libs.
 */

//Global Variable
var logout_time = 0,  //Records login time of me, so i dont blast notice for bad connection.
    broadcasterName = 'Kitty',
    heart = ":heart7",
    is_sticky,
    is_baby,
    is_swear,
    mad_lib,
    is_tipnote,
    modEnum = 
    {
    off: 'off',
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
                'cutscene', 'mana pool', 'season pass', 'atari'], //nouns for mad libs
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
    adjArray = [],
    
    //The word used to replace all words
    insertedWord = '..meow..',
    
    //The font used for font blocker
    replaceFont = 'Bookman Old Style';

function init()
{   
    //Initializes the moderators level with a switch statement and fake enum
    switch(cb['settings'].moderator_level)
    {
        case 'Off':
            modLvl = modEnum.off;
            break;
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
    
    //Initializes if broadcaster wants to use mad libs
    if(cb['settings'].mad_lib == 'Yes')
    {
        mad_lib = true;
    }
    else
    {
        mad_lib = false;
    };
    
    //Initializes if broadcaster wants to block tipnotes
    if(cb['settings'].is_tipnote == 'Yes')
    {
        is_tipnote = true;
    }
    else
    {
        is_tipnote = false;
    };
    //This will be a conditional that will set there for mad libs from settings
    nounArray = vgNouns;
    verbArray = vgVerbs;
    adjArray = vgAdjectives;
    
    cb.sendNotice('Good morning Kitty! I hope you have a wonderful day! Mwuah!\n\
                        Type /beefup if you want to increase level of filtering. \n\
                       Type /beefdown if you want to lower level of filtering.\n\
                        Type /kitty if you want to turn off mad libs.\n\
                        Type /zombie if you want to turn on mad libs.',
                    cb.room_slug ,'','#00b33c','bold');
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
        };
    };
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

//This function is call when the tip event happens
cb.onTip(function (tip) 
{
    if(is_tipnote)
    {
        //Check for sticky keys if broadcaster wants to
        if(is_sticky)
        {
            var sticky = tip["message"].search(/(.)\1{3,}/i, 'Sorry, I face smashed my keyboard..');
            if(sticky > -1)
            {
                tip["message"] = 'Sorry, I face smashed my keyboard...';
            };
        };

        //Block baby names if broadcaster wants to
        if(is_baby)
        {
            var greeting = tip["message"].search(/(hey|hi|hello)/i);  //Looks for a greeting to tell if its a nickname
            tip["message"] = tip["message"].replace(/(cutie|cuttie|bb|baby|bab|sweet(?=(t|y|i|e|ie))|sweat(?=(t|y|i|e|ie)))t?(e|ie|y)?/gi, broadcasterName); //Baby
            if(greeting > -1)
            {
                tip["message"] = tip["message"].replace(/(sex|gurl|girl)y?(\\w+)?/gi, broadcasterName);  //Replace sexy if there is a greeting
            }
        }

        //Check for sticky keys if broadcaster wants to
        if(is_swear)
        {
            tip["message"] = tip["message"].replace(/(fuck|fuk)/gi, insertedWord); //Fuck
            tip["message"] = tip["message"].replace(/bitch/gi, insertedWord); //Bitch
            tip["message"] = tip["message"].replace(/shit/gi, insertedWord); //Shit
        };
    };
});

/*
 * This is the event called when a user sends a message
 */
cb.onMessage(function (msg) 
{
    //this is the script that lets broadcaster adjust moderator level
    if(msg['user'] == cb.room_slug)
    {
        //The command to increase the moderator level
        if(msg['m'] == '/beefup')
        {
            switch(modLvl)
            {
                 case modEnum.off:
                    modLvl = modEnum.easy;
                    cb.sendNotice('You\'re on the easiest setting kitty!',cb.room_slug,'','#00b33c','bold');
                    break;
                case modEnum.easy:
                    modLvl = modEnum.avg;
                    cb.sendNotice('This is a more average setting kitty.',cb.room_slug,'','#00b33c','bold');
                    break;
                case modEnum.avg:
                    modLvl = modEnum.tough;
                    cb.sendNotice('No need to worry kitty, zombie is here to protect you. =)',cb.room_slug,'','#00b33c','bold');
                    break;
                case modEnum.tough:
                    cb.sendNotice('No need to worry kitty, zombie is here to protect you. =)',cb.room_slug,'','#00b33c','bold');
            }
            msg['X-Spam'] = true;
            msg['m'] = 'Let\'s place nice boys!';
            return msg;
        };
        
        //The comand to reduce the moderator level
        if(msg['m'] == '/beefdown')
        {
            switch(modLvl)
            {
                case modEnum.off:
                    cb.sendNotice('Be careful kitty, you don\'t want zombie\'s help. :(',cb.room_slug,'','#00b33c','bold');
                    break;
                case modEnum.easy:
                    modLvl = modEnum.avg;
                    cb.sendNotice('Be careful kitty, you don\'t want zombie\'s help. :(',cb.room_slug,'','#00b33c','00b33c');
                    break;
                case modEnum.avg:
                    modLvl = modEnum.easy;
                    cb.sendNotice('You\'re on the easiest setting kitty!',cb.room_slug,'','#00b33c','bold');
                    break;
                case modEnum.tough:
                    modLvl = modEnum.avg;
                    cb.sendNotice('This is a more average setting kitty.',cb.room_slug,'','#00b33c','bold');
            }
            msg['X-Spam'] = true;
            msg['m'] = 'Let\'s have some fun. ;)';
            return msg;
        };
        
        //The comand to turn off mad libs
        if(msg['m'] == '/kitty')
        {
            mad_lib = false;
            msg['X-Spam'] = true;
            msg['m'] = 'No more mad libs';
            cb.sendNotice('No more mad libs kitty, I promise :(',cb.room_slug,'','#00b33c','bold');
            return msg;
        }
        
        //The comand to turn on mad libs
        if(msg['m'] == '/zombie')
        {
            mad_lib = true;
            msg['X-Spam'] = true;
            msg['m'] = 'Mad libs are turned on';
            cb.sendNotice('It\'s time to get silly! =) Mwuah!',cb.room_slug,'','#00b33c','bold');
            return msg;
        }
    };
    /*
    //If message was sent by broadcaster or moderator, just post message
    if(msg['is_mod'] == true || msg['user'] == cb.room_slug)
    {
      return msg;  
    };
    */
    //If user is using a special font, set their font to Arial
    if(msg['f'] != replaceFont)
    {
        msg['f'] = replaceFont;
    };
    
    //Check for sticky keys if broadcaster wants to
    if(is_sticky)
    {
        //Third if broadcaster want to block sticky keys
        var sticky = msg['m'].search(/(.)\1{3,}/i);
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
            msg['m'] = msg['m'].replace(/(sex|gurl|girl)y?(\\w+)?/gi, broadcasterName);  //Replace sexy if there is a greeting
        }
    }
    
    //Check for sticky keys if broadcaster wants to
    if(is_swear)
    {
        msg['m'] = msg['m'].replace(/(fuck|fuk)/gi, insertedWord); //Fuck
        msg['m'] = msg['m'].replace(/bitch/gi, insertedWord); //Bitch
        msg['m'] = msg['m'].replace(/shit/gi, insertedWord); //Shit
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

//This function is called when the tip event happens
cb.onTip(function (tip) 
{
    if(is_tipnote)
    {
        //Block swear words from tipnote if broadcaster wants
        blockSwearWords(tip, true);
        //Block baby names from tipnote
        blockBabyNames(tip, true);
        //Block sticky keys from tipnote
        var sticky = tip['message'].search(/(.)\1{3,}/i, 'Sorry, I face smashed my keyboard..');
            if(sticky > -1)
            {
                tip['message'] = 'Sorry, I face smashed my keyboard...';
            }; 
    };
});

/*
 * Setting for the ZombieMod1.0
 * The broadcaster will need to fill out settings
 * for bot.
 */
cb.settings_choices = [
    {name:'mad_lib', type:'choice',
        choice1:'Yes',
        choice2:'No', defaultValue: 'Yes', label:'Mad Lib'},
    {name:'moderator_level', type:'choice',
        choice1:'Off',
        choice2:'Laid Back',
        choice3:'Average',
        choice4:'Body Guard', defaultValue:'Average'},
    {name:'is_sticky', type:'choice',
        choice1:'Yes',
        choice2:'No', defaultValue: 'Yes', label:'Block Sticky Keys'},
    {name:'is_baby', type:'choice',
        choice1:'Yes',
        choice2:'No', defaultValue: 'Yes', label:'Block Baby Names'},
    {name:'is_swear', type:'choice',
        choice1:'Yes',
        choice2:'No', defaultValue: 'Yes', label:'Block Swear Words'},
    {name:'is_tipnote', type:'choice',
        choice1:'Yes',
        choice2:'No', defaultValue: 'No', label:'Filter Tipnotes'}
];

//This function handles filtering on easy mode
function easyMod(msg)
{
    //Check if broadcaster wants to use mad libs
    if(mad_lib)
    {
        madLib(msg, '\\b(pus*\\w+|clit|cunt|klit|kunt)(\\w+)?', nounArray,true,'\\b(wet)(\\w+)?',adjArray);
        madLib(msg, '\\b(di|co)(c)?(k)?(\\w+)?', nounArray,true,'\\b(hard)(\\w+)?',adjArray);
        madLib(msg, '\\b(sq)(u)?(i)(u)?(rt)', verbArray);
        madLib(msg, '\\b(fart)(\\w+)?', verbArray);
    }
    else
    {
        insertWord(msg, '\\b(pus*\\w+|clit|cunt|klit|kunt)(\\w+)?',true,'\\b(wet)(\\w+)?');
        insertWord(msg, '\\b(di|co)(c)?(k)?(\\w+)?',true,'\\b(hard)(\\w+)?');
        insertWord(msg, '\\b(sq)(u)?(i)(u)?(rt)');
        insertWord(msg, '\\b(fart)(\\w+)?');
    }
}

//This function handles filtering on average mode
function averageMod(msg)
{
    if(mad_lib)
    {
        easyMod(msg);
        madLib(msg, '\\b(com|cum|kum|kom)(m)?(e)?', verbArray);
        madLib(msg, '\\b(dad)(d)?(y)?(\\w+)?', nounArray);
        madLib(msg, '\\b(su)(k)?(c)?(k)?', verbArray);
        madLib(msg, '\\b(lic|lik)(k)?', verbArray);
    }
    else
    {
        easyMod(msg);
        insertWord(msg, '\\b(com|cum|kum|kom)(m)?(e)?');
        insertWord(msg, '\\b(dad)(d)?(y)?(\\w+)?');
        insertWord(msg, '\\b(su)(k)?(c)?(k)?');
        insertWord(msg, '\\b(lic|lik)(k)?');
    }
}

//This function handles filtering on body guard mode
function toughMod(msg)
{
    if(mad_lib)
    {
        averageMod(msg);
        madLib(msg, '\\b(tit)t?(s|ies|ie)?(\\w+)?', nounArray,true,'\\b(big|fat|huge)(\\w+)?',adjArray);
        madLib(msg, '\\b(ass)(hol)?(\\w+)?', nounArray);
    }
    else
    {
        averageMod(msg);
        insertWord(msg, '\\b(tit)t?(s|ies|ie)?(\\w+)?',true,'\\b(big|fat|huge)(\\w+)?');
        insertWord(msg, '\\b(ass)(hol)?(\\w+)?');
    }
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
function madLib(msg,expression,wordArray,is_optional,optional_regex,optionalArray)
{
    //Sets default values
    if (typeof(is_optional)==='undefined') is_optional = false;
    if (typeof(optional_regex)==='undefined') optional_regex = '';
    //Sets regex for the index to make an array out of all possible outcomes
    var indexRegex = new RegExp(expression, "gi");
    //Sets the regex to the replace because replace regex only replace first match
    var replaceRegex = new RegExp(expression, "i");
    if(is_optional)
    {
       //Sets the regex to the replace because replace regex only replace first match
        var optionalRegex = new RegExp(optional_regex, "i"); 
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

function insertWord(msg, expression, is_optional, optional_regex)
{
   //Sets default values
    if (typeof(is_optional)==='undefined') is_optional = false;
    if (typeof(optional_regex)==='undefined') optional_regex = '';
    //Sets regex for the index to make an array out of all possible outcomes
    var indexRegex = new RegExp(expression, "gi");
    //Sets the regex to the replace because replace regex only replace first match
    var replaceRegex = new RegExp(expression, "i");
    if(is_optional)
    {
       //Sets the regex to the replace because replace regex only replace first match
        var optionalRegex = new RegExp(optional_regex, "i"); 
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
            //Replaces first instance of regex match
            msg['m'] = msg['m'].replace(replaceRegex, insertedWord);
           
            //Look for optional word
            if(is_optional)
            {
                //Assigns a new random variable for array index
                msg['m'] = msg['m'].replace(optionalRegex, insertedWord);
            };
        };
    };
};