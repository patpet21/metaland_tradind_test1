const { MongoClient } = require('mongodb');
const logger = require('../utils/logger');

class Database {
    constructor() {
        this.client = null;
        this.db = null;
    }

    async connect() {
        try {
            this.client = await MongoClient.connect(process.env.MONGODB_URI);
            this.db = this.client.db('metaland_trading');
            logger.info('✅ Database connesso con successo');
            return this.db;
        } catch (error) {
            logger.error('❌ Errore connessione database:', error);
            throw error;
        }
    }

    async getCollection(name) {
        if (!this.db) await this.connect();
        return this.db.collection(name);
    }
}

module.exports = new Database();