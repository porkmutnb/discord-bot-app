const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require('discord.js');
const Discord = require("discord.js")
const { config } = require('dotenv').config();

const CH_SINGER = process.env.CH_SINGER;
const OWNER_ID = process.env.OWNER_ID;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('playlists')
		.setDescription('Playlist for Me'),
	async execute(interaction, client) {
        console.log('interaction', interaction);
        console.log('=>', interaction.member.voice.channel);
        await interaction.deferReply().catch(err => {})
        let isOwner = interaction.member.roles.cache.has(OWNER_ID);
        if(isOwner) {
            let voiceChannel = interaction.member.voice.channel
            if (!voiceChannel) {
                await interaction.followUp({content: "เข้าไปจองห้อง Voice ไว้เลย, เดี๋ยว Stang ตามเข้าไป!"})
                setTimeout(() => interaction.deleteReply(), 3000);
            }else {
                const queue = client.distube.getQueue(interaction);
                if(!queue) {
                    const songList = [
                        { name: 'Beleiver', link: 'https://www.youtube.com/watch?v=6mZagYSymB4' },
                        { name: 'MakeNoise', link: 'https://www.youtube.com/watch?v=Zjww83YiHmc' },
                        { name: 'KinouYoriMottoSuki', link: 'https://www.youtube.com/watch?v=wO7kV905DnA' },
                        { name: 'Jiwaru', link: 'https://www.youtube.com/watch?v=TXFZtepXlzk' },
                        { name: 'Pioneer', link: 'https://www.youtube.com/watch?v=WC70UB-2TFw' },
                        { name: 'KensukeYoko', link: 'https://www.youtube.com/watch?v=Ml4TQ_I1tWs' },
                        { name: 'ShoujotachiYo', link: 'https://www.youtube.com/watch?v=qGfB0t3yxbk' },
                        { name: 'FirstRabbit', link: 'https://www.youtube.com/watch?v=f36vneobEUc' },
                        { name: '2565', link: 'https://www.youtube.com/watch?v=oUK5ouVr7nA' },
                        { name: 'ดีอะ', link: 'https://www.youtube.com/watch?v=I64YL2424eU' },
                        { name: 'SayonaraCrawl', link: 'https://www.youtube.com/watch?v=FppYrZtcAO0' },
                        { name: 'KoisuruFortuneCookie', link: 'https://www.youtube.com/watch?v=mfqJyKm20Z4' }
                    ];
                    songList.forEach(async element => {
                        let url = element.link;
                        await client.distube.play(interaction.member.voice.channel, url);
                        const tracks = await client.player.search(url, {
                            requestedBy: interaction.user
                        }).then(x => x.tracks[0]);
                        // if(tracks) { 
                        //     const embed = new EmbedBuilder()
                        //         .addFields({name: "Title", value: `${tracks.title}`, inline: true})
                        //         .addFields({name: "Author", value: `${tracks.author}`, inline: true})
                        //         .addFields({name: "Time", value: `${tracks.duration}`, inline: true})
                        //         .addFields({name: "Views", value: `${tracks.views}`, inline: true})
                        //         .addFields({name: "Thumbnail", value: "[Click]("+tracks.thumbnail+")", inline: true})
                        //         .addFields({name: "Video", value: "[Click]("+tracks.url+")", inline: true})
                        //         .setColor("#C995C1")
                        //         .setImage(`${tracks.thumbnail}`);
                        //     await interaction.followUp({embeds: [embed]});
                        //     setTimeout(() => interaction.deleteReply(), 10000);
                        // }
                    });
                    await interaction.followUp(`Success ${interaction.user}.`);
                    setTimeout(() => interaction.deleteReply(), 3000);
                }else {
                    await interaction.followUp(`ตอนนี้ Stang ยังไม่สะดวก, โปรดลองใหม่ภายหลัง! ${interaction.user}.`);
                    setTimeout(() => interaction.deleteReply(), 3000);
                }
            }
        }else {
            await interaction.followUp(`ฐานันดร ไม่มากพอที่จะใช้คำสั่งนี้! ${interaction.user}.`);
            setTimeout(() => interaction.deleteReply(), 3000);
        }
    },
};