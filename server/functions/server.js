"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const express_1 = __importStar(require("express"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const api = (0, express_1.Router)();
api.get('/hello', (req, res) => {
    res.json({ message: 'Hello from the API!' });
});
api.post('/createGame', (req, res) => {
    // Implement game creation logic
    res.json({ gameId: 'game-' + Math.random().toString(36).substr(2, 9) });
});
api.post('/joinGame', (req, res) => {
    // Implement game joining logic
    res.json({ message: 'Joined game successfully' });
});
api.post('/submitDecks', (req, res) => {
    // Implement deck submission logic
    res.json({ message: 'Decks submitted successfully' });
});
api.post('/banDeck', (req, res) => {
    // Implement deck banning logic
    res.json({ message: 'Deck banned successfully' });
});
const app = (0, express_1.default)();
app.use('/api/', api);
exports.handler = (0, serverless_http_1.default)(app);
