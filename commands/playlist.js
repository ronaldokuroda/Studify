const {SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("playlist")
        .setDescription("Ouça a melhor playlist de estudo."),

    async execute(interaction){

        await interaction.reply("https://open.spotify.com/playlist/77s4Vi0bhfgHj0z4amZMFw?si=f70daae1024e4c74")
    }
}