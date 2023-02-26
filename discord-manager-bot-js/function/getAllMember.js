require('dotenv').config();

module.exports.getAllMembers = async (interaction, client) => {
    try {
        // console.log('client', client);
        // console.log('interaction', interaction);
        let user = 0, verify = 0, bot = 0;
        var members;
        if(interaction==null) {
            members = await client.guild.members.fetch();
        }else {
            members = await interaction.member.guild.members.fetch();
        }
        await members.map(async (member) => {
            if(!member.user.bot /*&& member._roles.length==0*/) {
                user++;
            }
            if(!member.user.bot && member._roles.length>0) {
                verify++;
            }
            if(member.user.bot) {
                bot++;
            }
        })
        console.log(`user:${user}, verify:${verify}, bot:${bot}`);
        
        if(interaction==null) {
            client.guild.channels.cache.find(c => c.type === 2 && c.name.includes(process.env.CH_TOTALUSERS)).setName(`${process.env.CH_TOTALUSERS} ${user}`)
            client.guild.channels.cache.find(c => c.type === 2 && c.name.includes(process.env.CH_TOTALMEMBERS)).setName(`${process.env.CH_TOTALMEMBERS} ${verify}`)
            client.guild.channels.cache.find(c => c.type === 2 && c.name.includes(process.env.CH_TOTALBOT)).setName(`${process.env.CH_TOTALBOT} ${bot}`)
        }else {
            interaction.member.guild.channels.cache.find(c => c.type === 2 && c.name.includes(process.env.CH_TOTALUSERS)).setName(`${process.env.CH_TOTALUSERS} ${user}`)
            interaction.member.guild.channels.cache.find(c => c.type === 2 && c.name.includes(process.env.CH_TOTALMEMBERS)).setName(`${process.env.CH_TOTALMEMBERS} ${verify}`)
            interaction.member.guild.channels.cache.find(c => c.type === 2 && c.name.includes(process.env.CH_TOTALBOT)).setName(`${process.env.CH_TOTALBOT} ${bot}`)
        }
    } catch (error) {
        console.error('Error getAllMembers:', error);
    }
    
}