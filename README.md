# Ambiente (Windows)
Erro app.ps1 não pode ser carregado
Execute esse comando como administrador no seu powershell:

```Set-ExecutionPolicy Unrestricted```

E depois tente executar o comando anterior novamente

Erro npm ERR! code EPERM ao tentar executar um comando
Execute o comando fora do VSCode com o seu Powershell em modo Administrador

Erro ENOENT quando executa o comando npm start no Frontend
Tente adicionar o seguinte na variável de ambiente Path:

```C:\Windows\System32 ```

# BACKEND
Erro nas migrações
Provavelmente é algum erro de digitação na hora de criar as migrations.

1 - Execute o comando:

```
npx knex migrate:rollback --all
```
2 - Delete o arquivo db.sqlite (caso o arquivo não esteja aparecendo, reinicie o VSCODE)

3 - Rode o comando

```npx knex migrate:list```

4 - Rode o comando

```npx knex migrate:latest```

Erro ao utilizar o Postman ou o Insomnia
Você pode utilizar o https://postwoman.io/.

Para isso, você precisa sempre lembrar de usar 127.0.0.1 no lugar de localhost e adicionar o CORS no seu backend (se você não adicionar ocorrer o erro Error: Network Error. Check console for details):

1 - Adicione o CORS executando o seguinte comando no terminal:

```npm install cors```

2 - No seu arquivo index.js, adicione o seguinte no início do arquivo:

```const cors = require("cors");```

3 - Logo após o seu const app = express(); adicione o seguinte:
```app.use(cors());```


# Interface Web
Erro URL contains XSS injection attempt
Verifique se no submit do seu formulário você digitou e.preventDefault() corretamente.

Caso o erro ainda persista, tente ir até o seu navegar e limpar tudo que existe depois do http://localhost:3000/ tirando tudo que existir depois do /.

Se mesmo assim o erro continuar, verifique se no seu form você passou o atributo ```onSubmit={handleRegister}```.