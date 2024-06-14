 const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
 const dotenv = require('dotenv');
 const fs = require("node:fs")
 const path = require("node:path")


 //#################################################################//
 //configura o dotenv
dotenv.config();
const {TOKEN} = process.env
//#################################################################//

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds
  ] 
});

client.commands = new Collection()

//#################################################################//
// Defina o caminho para o diretório de comandos
const commandsPath = path.join(__dirname, "commands")
//#################################################################//

//#################################################################//
// Verifique se o caminho é um diretório
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))
//#################################################################//

for(const file of commandFiles){
  const filePath = path.join(commandsPath, file)
  const command = require (filePath)
  if ("data" in command && "execute" in command){
    client.commands.set(command.data.name, command)
  }else{
    console.log(`Esse comando em ${filePath} esta com "data" ou "execute ausentes"`)
  }
}


 // console.log(client.commands)

/*
 client.on('ready', (e) => {
  console.log(`${e.user.tag} esta online!`)
} ) 
*/
//#################################################################//
//Imprime no console quando o bot estiver online e funcional
client.once(Events.ClientReady, readyClient => {
	console.log(`Pronto! Login realizado como ${readyClient.user.tag}`);
}); 
//#################################################################//
client.login(TOKEN) 
//#################################################################//
// Listener de interacoes com bot
client.on(Events.InteractionCreate, async interaction => {

  if(interaction.isStringSelectMenu()){
    const selected = interaction.values[0]
    if (selected == "javascript"){
      await interaction.reply("Documentação do JavaScript: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide")
    } else if (selected == "python"){
      await interaction.reply("Documentação do Python: https://www.python.org/doc/")
    } else if (selected == "csharp"){
      await interaction.reply("Documentação do C#: https://learn.microsoft.com/pt-br/dotnet/csharp/tour-of-csharp/")
    }else if (selected == "discordjs"){
      await interaction.reply("Documentação do DiscordJS: https://discordjs.guide/")
    }
  }

  if (!interaction.isChatInputCommand()) return
      const command = interaction.client.commands.get(interaction.commandName)
      if(!command){
        console.error("comando nao encontrado")
        return
      }
      try{
        await command.execute(interaction)
      } catch{
        console.error(error)
        await interaction.reply("Houve um erro ao executar esse comando")
      }
})
//#################################################################//


