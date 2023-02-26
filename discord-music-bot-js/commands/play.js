const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Join and Singer for everyone on call')
        .addStringOption(option =>
            option.setName('link')
                .setDescription('link song Youtube or Spotify')
                .setRequired(true)),
	async execute(interaction, bot) {
        let voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            const embed = new EmbedBuilder()
                            .setColor("#C995C1")
                            .setTitle(`หนูรับทราบค่ะ`)
                            .setDescription(`เข้าไปจองห้อง Voice ไว้เลย, เดี๋ยวหนูตามเข้าไป!`)
                            .setTimestamp()
                            .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
            await interaction.followUp({embeds: [embed]});
            setTimeout(() => interaction.deleteReply(), 3000);
        }else {
            let link = interaction.options.getString('link');
            let isBotAvailable = true;
            await interaction.member.guild.channels.cache.filter(async ch => {
                if(ch.type===2) {
                    await ch.members.forEach(m => {
                        if(m.user.bot && m.user.id==process.env.CLIENT_ID) {
                            isBotAvailable = false
                        }
                    })
                }
            })
            if(link.includes('https://www.youtube.com') || link.includes('https://open.spotify.com/')) {
                if(isBotAvailable) {
                    bot.distube.voices.join(voiceChannel);   
                }
                let queue = bot.distube.getQueue(interaction);
                await bot.distube.play(interaction.member.voice.channel, link);
                try {
                    const tracks = await bot.player.search(link, {
                        requestedBy: interaction.user
                    }).then(x => x.tracks[0]);
                    const embed = new EmbedBuilder()
                                    .setColor("#C995C1")
                                    .addFields({name: "Title", value: `${tracks.title}`, inline: true})
                                    .addFields({name: "Author", value: `${tracks.author}`, inline: true})
                                    .addFields({name: "Time", value: `${tracks.duration}`, inline: true})
                                    .addFields({name: "Views", value: `${tracks.views}`, inline: true})
                                    .addFields({name: "Thumbnail", value: "[Click]("+tracks.thumbnail+")", inline: true})
                                    .addFields({name: "Video", value: "[Click]("+tracks.link+")", inline: true})
                                    .setImage(`${tracks.thumbnail}`)
                                    .setTimestamp()
                                    .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
                    await interaction.followUp({embeds: [embed]});
                    setTimeout(() => interaction.deleteReply(), 10000);
                } catch (error) {
                    queue = bot.distube.getQueue(interaction);
                    const embed = new EmbedBuilder()
                                        .setColor("#C995C1")
                                        .addFields({name: "Title", value: `${queue.songs[0].name}`, inline: true})
                                        .addFields({name: "Author", value: `${queue.songs[0].uploader.name}`, inline: true})
                                        .addFields({name: "Time", value: `${queue.songs[0].formattedDuration}`, inline: true})
                                        .addFields({name: "Views", value: `${queue.songs[0].views}`, inline: true})
                                        .addFields({name: "Thumbnail", value: "[Click]("+queue.songs[0].thumbnail+")", inline: true})
                                        .addFields({name: "Video", value: "[Click]("+queue.songs[0].link+")", inline: true})
                                        .setImage(`${queue.songs[0].thumbnail}`)
                                        .setTimestamp()
                                        .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
                    await interaction.followUp({embeds: [embed]});
                    setTimeout(() => interaction.deleteReply(), 10000);
                }
            }else {
                const embed = new EmbedBuilder()
                            .setColor("#C995C1")
                            .setTitle(`หนูรับทราบค่ะ`)
                            .setDescription(`ใส่เพลงที่มีบน Youtube หรือ Spotify! ${interaction.user}.`)
                            .setTimestamp()
                            .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
                await interaction.followUp({embeds: [embed]});
                setTimeout(() => interaction.deleteReply(), 3000);
            }
        }
    },
};