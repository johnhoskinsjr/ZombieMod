var logout_time = 0,broadcasterName = cb['settings'].name,
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

    modLvl,swear = ['dang', 'meanie', 'stuff'],vgNouns = ['analog control', 'easter egg', 'game genie', 
                'game shark', '64', 'sega genesis', 'RPG', 
                'FPS', 'spawn point', 'sandbox', 'LAN party', 
                'K/D ratio', 'extra life', 'achievement', 'buff',
                'cutscene', 'mana pool', 'season pass'],
    vgVerbs = ['double jump', 'cheat', 'hack', 'respawn', 
                'button smash', 'autosave', 'rage quit', 
                'cooldown', 'farm', 'lag', 'speed run'],
    vgAdjectives = ['1337', 'noob', 'pwned', 'exclusive', 'F2P', 'nerfed', 'twink'],animeNouns = ['kitsune', 'tessaiga'],
    animeVerbs = [],
    animeAdjectives = ['baka'],nounArray = [],
    verbArray = [],
    adjArray = [];

function init()
{switch(cb['settings'].moderator_level)
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
    };if(cb['settings'].is_sticky == 'Yes')
    {
        is_sticky = true;
    }
    else
    {
        is_sticky = false;
    };if(cb['settings'].is_baby == 'Yes')
    {
        is_baby = true;
    }
    else
    {
        is_baby = false;
    };if(cb['settings'].is_swear == 'Yes')
    {
        is_swear = true;
    }
    else
    {
        is_swear = false;
    };nounArray = vgNouns;
    verbArray = vgVerbs;
    adjArray = vgAdjectives;
};init();cb.onEnter(function(user) 
{if(user = "cajunzombie")
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
});cb.onLeave(function(user) 
{
    if(user = "cajunzombie")
    {
        logout_time = 1;
    }
});cb.onMessage(function (msg) 
{if(msg['user'] == cb.room_slug)
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
    };if(msg['is_mod'] == true || msg['user'] == cb.room_slug)
    {
      return msg;  
    };if(msg['f'] != 'Bookman Old Style')
    {
        msg['f'] = 'Bookman Old Style';
    };if(is_sticky)
    {
        var sticky = msg['m'].search(/(.)\1{3,}/i, 'Sorry, I face smashed my keyboard..');
        if(sticky > -1)
        {
            msg['m'] = 'Sorry, I face smashed my keyboard...';
            return msg;
        };
    };if(is_baby)
    {
        var greeting = msg['m'].search(/(hey|hi|hello)/i);  //Looks for a greeting to tell if its a nickname
        msg['m'] = msg['m'].replace(/(cutie|cuttie|bb|baby|bab|sweet(?=(t|y|i|e|ie))|sweat(?=(t|y|i|e|ie)))t?(e|ie|y)?/gi, broadcasterName); //Baby
        if(greeting > -1)
        {
            msg['m'] = msg['m'].replace(/(sex)y?/i, broadcasterName);  //Replace sexy if there is a greeting
        }
    }if(is_swear)
    {
        msg['m'] = msg['m'].replace(/(fuck|fuk)/gi, swear[0]); //Fuck
        msg['m'] = msg['m'].replace(/bitch/gi, swear[1]); //Bitch
        msg['m'] = msg['m'].replace(/shit/gi, swear[2]); //Shit
    };switch(modLvl)
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
    }return msg;
});cb.settings_choices = [
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
];function easyMod(msg)
{
    madLib(msg, '\\b(pus*\\w+|clit|cunt)(\\w+)?', nounArray,true,'\\b(wet)(\\w+)?',adjArray);
    madLib(msg, '\\b(dick|cock)(\\w+)?', nounArray,true,'\\b(hard)(\\w+)?',adjArray);}function averageMod(msg)
{
    easyMod(msg);
    madLib(msg, '\\b(com|cum)(m)?', verbArray);
    madLib(msg, '\\b(daddy)(\\w+)?', nounArray);
    madLib(msg, '\\b(suck)(k)?', verbArray);
    madLib(msg, '\\b(lick|lic|lik)(k)?', verbArray);}function toughMod(msg)
{
    averageMod(msg);
    madLib(msg, '\\b(tit)t?(s|ies|ie)?(\\w+)?', nounArray,true,'\\b(big|fat|huge)(\\w+)?',adjArray);
    madLib(msg, '\\b(ass)(hol)?(\\w+)?', nounArray);}function madLib(msg,expression,wordArray,is_optional,optional,optionalArray)
{if (typeof(is_optional)==='undefined') is_optional = false;
    if (typeof(optional)==='undefined') optional = '';var indexRegex = new RegExp(expression, "gi");var replaceRegex = new RegExp(expression, "i");
    if(is_optional)
    {var optionalRegex = new RegExp(optional, "i"); 
    }var indexCount = msg['m'].match(indexRegex);if (indexCount !== null)
    {var numberAppearences = indexCount.length;for(i=0;i<numberAppearences;i++)
        {var noun = Math.floor(Math.random()*wordArray.length);msg['m'] = msg['m'].replace(replaceRegex, wordArray[noun]);if(is_optional)
            {var adj = Math.floor(Math.random()*optionalArray.length);
                msg['m'] = msg['m'].replace(optionalRegex, optionalArray[adj]); //Pussy
            };
        };
    };
};