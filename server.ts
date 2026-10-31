import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Banco de dados em memória contendo 100 palavras por categoria (divididas em fácil, médio e difícil) mais a categoria Placas
const db: Record<string, Record<string, { disponiveis: string[], usadas: string[] }>> = {
    futebol: {
        facil: {
            disponiveis: [
                "Gol", "Bola", "Juiz", "Apito", "Chuteira", "Cartão", "Zagueiro", "Goleiro", "Escanteio", "Impedimento", 
                "Trave", "Gramado", "Cruzamento", "Pênalti", "Falta", "Técnico", "Torcida", "Estádio", "Camisa", "Bandeirinha", 
                "Rede", "Goleada", "Banco", "Capitão", "Luvas", "Atacante", "Lateral", "Tabela", "Drible", "Artilheiro",
                "Troféu", "Placar"
            ],
            usadas: []
        },
        medio: {
            disponiveis: [
                "Calcanhar", "Volante", "Carrinho", "Prancheta", "Voleio", "Chapéu", "Caneta", "Mata-mata", "Bicicleta", "Titular", 
                "Reserva", "Vantagem", "Trivela", "Marcação", "Desarme", "Cabeceio", "Ponte", "Enfiada", "Lançamento", "Bico", 
                "Gatilho", "Linha de fundo", "Meia-atacante", "Lateral-direito", "Lateral-esquerdo", "Zagueiro central", "Primeiro volante", "Segundo volante", "Armador", "Ponta direita", 
                "Ponta esquerda", "Falso nove", "Centroavante"
            ],
            usadas: []
        },
        dificil: {
            disponiveis: [
                "Elástico", "Rabona", "Triangulação", "Falso Nove", "Cobertura", "Transição", "Pressão Alta", "Bloco Baixo", "VAR", "Meia-armador", 
                "Ala", "Linha de impedimento", "Esquema tático", "Marcação sob pressão", "Desmarcação", "Cobertura defensiva", "Superioridade numérica", "Transição defensiva", "Transição ofensiva", "Pressão pós-perda", 
                "Jogo posicional", "Saída de bola", "Construção de jogadas", "Sobrecarga", "Inversão de corredor", "Compactação", "Amplitude", "Profundidade", "Bloco intermediário", "Balanço defensivo", 
                "Flutuação", "Marcação mista", "Periodização"
            ],
            usadas: []
        }
    },
    objeto: {
        facil: {
            disponiveis: [
                "Garrafa", "Cadeira", "Mesa", "Celular", "Caneta", "Colher", "Prato", "Chave", "Relógio", "Lápis", 
                "Caderno", "Óculos", "Porta", "Janela", "Travesseiro", "Cobertor", "Toalha", "Escova", "Sabonete", "Tesoura", 
                "Abajur", "Garfo", "Faca", "Copo", "Balde", "Vassoura", "Rodo", "Lixeira", "Colchão", "Tapete",
                "Espelho", "Cortina"
            ],
            usadas: []
        },
        medio: {
            disponiveis: [
                "Micro-ondas", "Liquidificador", "Ventilador", "Almofada", "Tapete", "Espelho", "Cortina", "Cabide", "Martelo", "Chave de fenda", 
                "Lanterna", "Mochila", "Estojo", "Batedeira", "Frigideira", "Torradeira", "Ferro de passar", "Secador", "Escada", "Coador", 
                "Cafeteira", "Panela de pressão", "Chaleira elétrica", "Escorredor", "Saleiro", "Moedor", "Descascador", "Cortador", "Peneira", "Cesto", 
                "Varal", "Luminária", "Extensão"
            ],
            usadas: []
        },
        dificil: {
            disponiveis: [
                "Paquímetro", "Estetoscópio", "Bússola", "Termohigrômetro", "Esfigmomanômetro", "Mandril", "Multímetro", "Refratômetro", "Nível a laser", "Goniômetro", 
                "Turíbulo", "Amperímetro", "Sarrafo", "Desempenadeira", "Alicate", "Serra tico-tico", "Tupia", "Morsa", "Chave de grifo", "Saca-pinos", 
                "Micrômetro", "Manômetro", "Barômetro", "Anemômetro", "Luxímetro", "Decibelímetro", "Osciloscópio", "Capacímetro", "Pirômetro", "Durômetro", 
                "Viscosímetro", "Espectrofotômetro", "Autoclave"
            ],
            usadas: []
        }
    },
    figura: {
        facil: {
            disponiveis: [
                "Pelé", "Neymar", "Ivete Sangalo", "Silvio Santos", "Xuxa", "Anitta", "Faustão", "Luan Santana", "Whindersson Nunes", "Rodrigo Faro", 
                "Caetano Veloso", "Roberto Carlos", "Chitãozinho", "Zezé di Camargo", "Marília Mendonça", "Gusttavo Lima", "Eliana", "Celso Portiolli", "Galvão Bueno", "Ana Maria Braga", 
                "Rodrigo Hilbert", "Sabrina Sato", "Luciano Huck", "Fátima Bernardes", "William Bonner", "Ratinho", "Datena", "Marcos Mion", "Tatá Werneck", "Fábio Porchat", 
                "Sandy", "Alok"
            ],
            usadas: []
        },
        medio: {
            disponiveis: [
                "Fernanda Montenegro", "Wagner Moura", "Lázaro Ramos", "Taís Araújo", "Selton Mello", "Paulo Gustavo", "Claudia Raia", "Tony Ramos", "Glória Pires", "Marcos Palmeira", 
                "Adriana Esteves", "Murilo Benício", "Cauã Reymond", "Grazi Massafera", "Juliana Paes", "Rodrigo Lombardi", "Alexandre Nero", "Giovanna Antonelli", "Chay Suede", "Bruna Marquezine", 
                "Marina Ruy Barbosa", "Alinne Moraes", "Sergio Guizé", "Isis Valverde", "Dira Paes", "Miguel Falabella", "Marieta Severo", "Marco Nanini", "Jô Soares", "Renato Aragão", 
                "Chico Anysio", "Djavan"
            ],
            usadas: []
        },
        dificil: {
            disponiveis: [
                "Oscar Niemeyer", "Carlos Drummond de Andrade", "Machado de Assis", "Tarsila do Amaral", "Candido Portinari", "Cecília Meireles", "Vinicius de Moraes", "Tom Jobim", "Heitor Villa-Lobos", "Chico Buarque", 
                "Gilberto Gil", "Rita Lee", "Jorge Amado", "Clarice Lispector", "Monteiro Lobato", "Lima Barreto", "Graciliano Ramos", "Manuel Bandeira", "Mário de Andrade", "Castro Alves", 
                "Euclides da Cunha", "Augusto dos Anjos", "Oswald de Andrade", "Anita Malfatti", "Gilberto Freyre", "Nelson Rodrigues", "Ariano Suassuna", "Guimarães Rosa", "Rubem Fonseca", "Paulo Freire", 
                "Milton Santos", "Burle Marx"
            ],
            usadas: []
        }
    },
    placas: {
        facil: {
            disponiveis: ["Pare", "Proibido estacionar", "Velocidade máxima", "Mão única", "Semáforo", "Cuidado", "Escola", "Rotatória", "Curva", "Pedestre"],
            usadas: []
        },
        medio: {
            disponiveis: ["Placa tectônica", "Placa de carro", "Placa-mãe", "Placa solar", "Placa de trânsito", "Placa de homenagem", "Placa de vídeo", "Placa de Petri", "Placa de sinalização", "Placa de metal"],
            usadas: []
        },
        dificil: {
            disponiveis: ["Placa euroasiática", "Placa de Nazca", "Placa do Pacífico", "Placa da Indonésia", "Placa tectônica de Cocos", "Placa norte-americana", "Placa sul-americana", "Placa arábica", "Placa de Scotia", "Placa filipina"],
            usadas: []
        }
    }
};

// Cópia de backup para conseguir resetar o banco depois
const dbOriginal = JSON.parse(JSON.stringify(db));

// Função para sortear uma palavra respeitando a regra de não repetição
function sortearDaCategoria(categoria: string) {
    const niveis = ['facil', 'medio', 'dificil'];
    const niveisValidos = niveis.filter(n => db[categoria][n].disponiveis.length > 0);

    if (niveisValidos.length === 0) {
        return { palavra: "Acabaram as palavras!", nivel: "FIM" };
    }

    const nivelEscolhido = niveisValidos[Math.floor(Math.random() * niveisValidos.length)];
    const listaDisp = db[categoria][nivelEscolhido].disponiveis;

    const index = Math.floor(Math.random() * listaDisp.length);
    const palavraSorteada = listaDisp.splice(index, 1)[0];

    db[categoria][nivelEscolhido].usadas.push(palavraSorteada);

    return { palavra: palavraSorteada, nivel: nivelEscolhido.toUpperCase() };
}

// Endpoint principal para pegar as palavras da rodada (incluindo placas se quiser)
app.get('/api/sortear', (req: Request, res: Response) => {
    const futebol = sortearDaCategoria('futebol');
    const objeto = sortearDaCategoria('objeto');
    const figura = sortearDaCategoria('figura');

    res.json({ futebol, objeto, figura });
});

// Endpoint para resetar as palavras e colocá-las de volta nas disponíveis
app.post('/api/resetar', (req: Request, res: Response) => {
    // Restaura o db original
    Object.keys(dbOriginal).forEach(cat => {
        db[cat] = JSON.parse(JSON.stringify(dbOriginal[cat]));
    });
    res.json({ mensagem: "Banco de palavras resetado com sucesso! Todas voltaram." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});