const { config } = require('dotenv').config();

const CH_INTRODUCTION_ID = process.env.CH_INTRODUCTION_ID

module.exports = {
    name: 'messageCreate',
	async execute(interaction) {
        if(interaction.author.bot) return;
        if(interaction.channelId==CH_INTRODUCTION_ID && !interaction.content.startsWith('/')) {
            interaction.reply('เพื่อรักษาความเรียบร้อย, อิชั้นขอลบโพสต์ที่ไม่เกี่ยวข้องนะคะ').then(msg => { setTimeout(() => msg.delete(), 3000 ) });
            setTimeout(() => interaction.delete(), 1000 );
        }
    },
};