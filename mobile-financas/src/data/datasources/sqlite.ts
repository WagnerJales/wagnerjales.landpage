import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('financas.db');

export const initDb = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS lancamentos (
      id TEXT PRIMARY KEY NOT NULL,
      serieId TEXT,
      recorrente INTEGER,
      parcelaAtual INTEGER,
      parcelaTotal INTEGER,
      mesRef TEXT NOT NULL,
      descricao TEXT NOT NULL,
      dataVencimento TEXT NOT NULL,
      dataPagamento TEXT,
      valor REAL NOT NULL,
      tipo TEXT NOT NULL,
      prioridade TEXT NOT NULL,
      fonte TEXT NOT NULL,
      modo TEXT NOT NULL,
      natureza TEXT NOT NULL,
      observacoes TEXT,
      tags TEXT
    );
    CREATE TABLE IF NOT EXISTS settings_list (
      key TEXT PRIMARY KEY NOT NULL,
      valuesJson TEXT NOT NULL
    );
  `);
};
