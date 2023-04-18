import express, {
    Request,
    Response
} from 'express';
import {
    create
} from 'venom-bot';
import {
    WAMessage
} from '@adiwajshing/baileys';

const app = express();
const port = process.env.PORT || 3000;

// Configurações do WhatsApp
const sessionName = 'mySession';
const wppConfig = {
    session: {
        // Se utilizar um servidor local, pode ser deixado o valor `false`
        useChrome: true,
        // Se utilizar um servidor local, é necessário definir o executável do Chrome
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        headless: true,
        // Caso queira manter a sessão aberta, deixe `true`
        restartOnCrash: false,
        // Arquivo para salvar a sessão (pode ser utilizado para restaurar a sessão depois)
        sessionDataPath: `${sessionName}.json`,
    },
    options: {
        // Timeout para as requisições do WhatsApp (em segundos)
        timeoutMs: 30000,
        // Tamanho máximo do buffer (em bytes)
        puppeteerOptions: {
            args: ['--disable-extensions-except=/path/to/extension/', '--load-extension=/path/to/extension/'],
        },
    },
};

// Cria o cliente do WhatsApp
const client = new Client({
    session: wppConfig.session,
    puppeteerOptions: wppConfig.options.puppeteerOptions,
});

// Inicializa o cliente do WhatsApp
client
    .initialize()
    .then(() => {
        console.log('Cliente do WhatsApp iniciado com sucesso!');
    })
    .catch((error) => {
        console.error('Erro ao iniciar o cliente do WhatsApp:', error);
    });

// Rota para enviar mensagens
app.post('/message', async (req: Request, res: Response) => {
    try {
        const {
            number,
            message
        } = req.body;
        // Verifica se o número de telefone é válido
        const isNumberValid = await client.checkNumberStatus(number);
        if (isNumberValid.status !== 200) {
            res.status(400).send('Número de telefone inválido');
            return;
        }
        // Envia a mensagem
        await client.sendMessage(number, message);
        res.send('Mensagem enviada com sucesso');
    } catch (error) {
        console.error('Erro ao enviar a mensagem:', error);
        res.status(500).send('Ocorreu um erro ao enviar a mensagem');
    }
});

// Rota para receber mensagens
app.post('/webhook', async (req: Request, res: Response) => {
    try {
        const {
            body
        } = req;
        // Converte a mensagem do WhatsApp para o formato do WAMessage
        const waMessage = new WAMessage(body);
        // Obtém a mensagem do WhatsApp como texto
        const message = waMessage.message ? conversation;
        // Obtém o número de telefone do remetente
        const senderNumber = waMessage.key.remoteJid;
        // Responde à mensagem com uma mensagem de exemplo
        await client.sendMessage(senderNumber, `Você enviou a mensagem: "${message}"`);
        res.send('Mensagem recebida e respondida com sucesso');
    } catch (error) {
        console.error('Erro ao receber a mensagem:', error);
        res.status(500).send('Ocorreu um erro ao receber a mensagem');
    }
});

// Rota para verificar o status da conexão com o WhatsApp
app.get('/status', async (req: Request, res: Response) => {
    try {
        const isConnected = await client.isConnected();
        const status = isConnected ? 'Conectado' : 'Desconectado';
        res.send(`Status da conexão: ${status}`);
    } catch (error) {
        console.error('Erro ao verificar o status da conexão:', error);
        res.status(500).send('Ocorreu um erro ao verificar o status da conexão');
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});